"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AntigravityParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const isTablet = window.matchMedia(
      "(min-width: 769px) and (max-width: 1200px)"
    ).matches;

    const countX = isMobile ? 50 : isTablet ? 85 : 100;
    const countY = isMobile ? 35 : isTablet ? 50 : 55;

    const DEFAULTS = {
      cursor: {
        radius: 0.065,
        strength: 3,
        dragFactor: 0.015,
      },
      halo: {
        outerOscFrequency: 2.6,
        outerOscAmplitude: 0.76,
        radiusBase: isMobile ? 1.2 : isTablet ? 1.6 : 2.4,
        radiusAmplitude: 0.5,
        shapeAmplitude: 0.75,
        rimWidth: isMobile ? 1.0 : isTablet ? 1.3 : 1.8,
        outerStartOffset: 0.4,
        outerEndOffset: 2.2,
        scaleX: isMobile ? 1.0 : isTablet ? 1.1 : 1.3,
        scaleY: 1,
        yBias: isMobile ? 1.5 : isTablet ? 1.0 : 0,
      },
      particles: {
        baseSize: isMobile ? 0.008 : isTablet ? 0.012 : 0.016,
        activeSize: isMobile ? 0.022 : isTablet ? 0.032 : 0.044,
        blobScaleX: 1,
        blobScaleY: 0.6,
        rotationSpeed: 0.1,
        rotationJitter: 0.2,
        cursorFollowStrength: 1,
        oscillationFactor: 1,
      },
    };

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let instancedMesh: THREE.InstancedMesh;
    let material: THREE.ShaderMaterial;
    let animationId: number;
    let isPaused = false;
    let startTime = performance.now();

    let targetMouseX: number | null = null;
    let targetMouseY: number | null = null;
    let isInteracting = false;
    const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    const canvas = document.createElement("canvas");
    canvas.style.display = "block";
    container.appendChild(canvas);

    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));

    scene = new THREE.Scene();

    const width = container.clientWidth;
    const height = container.clientHeight;

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const vertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uOuterOscFrequency;
      uniform float uOuterOscAmplitude;
      uniform float uHaloRadiusBase;
      uniform float uHaloRadiusAmplitude;
      uniform float uHaloShapeAmplitude;
      uniform float uHaloRimWidth;
      uniform float uHaloOuterStartOffset;
      uniform float uHaloOuterEndOffset;
      uniform float uHaloScaleX;
      uniform float uHaloScaleY;
      uniform float uParticleBaseSize;
      uniform float uParticleActiveSize;
      uniform float uBlobScaleX;
      uniform float uBlobScaleY;
      uniform float uParticleRotationSpeed;
      uniform float uParticleRotationJitter;
      uniform float uParticleOscillationFactor;

      varying vec2 vUv;
      varying float vSize;
      varying vec2 vPos;

      attribute vec3 aOffset;
      attribute float aRandom;

      #define PI 3.14159265359

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      void main() {
        vUv = uv;
        vec3 pos = aOffset;
        float driftSpeed = uTime * 0.15;

        float dx = sin(driftSpeed + pos.y * 0.5) + sin(driftSpeed * 0.5 + pos.y * 2.0);
        float dy = cos(driftSpeed + pos.x * 0.5) + cos(driftSpeed * 0.5 + pos.x * 2.0);
        pos.x += dx * 0.25;
        pos.y += dy * 0.25;

        vec2 relToMouse = pos.xy - uMouse;
        vec2 haloScale = max(vec2(uHaloScaleX, uHaloScaleY), vec2(0.0001));
        float distFromMouse = length(relToMouse / haloScale);
        vec2 safeRel = relToMouse + vec2(0.0001, 0.0);
        vec2 dirToMouse = normalize(safeRel);

        float shapeFactor = noise(dirToMouse * 2.0 + vec2(0.0, uTime * 0.1));

        float breathCycle = sin(uTime * 0.8);
        float baseRadius = uHaloRadiusBase + breathCycle * uHaloRadiusAmplitude;
        float currentRadius = baseRadius + (shapeFactor * uHaloShapeAmplitude);

        float rimInfluence = smoothstep(uHaloRimWidth, 0.0, abs(distFromMouse - currentRadius));
        float pushAmt = (breathCycle * 0.5 + 0.5) * 0.5;
        pos.xy += dirToMouse * pushAmt * rimInfluence;
        pos.z += rimInfluence * 0.3 * sin(uTime);

        float outerInfluence = smoothstep(baseRadius + uHaloOuterStartOffset, baseRadius + uHaloOuterEndOffset, distFromMouse);
        float outerOsc = sin(uTime * uOuterOscFrequency + pos.x * 0.6 + pos.y * 0.6);
        pos.xy += dirToMouse * outerOsc * uOuterOscAmplitude * outerInfluence;

        float baseSize = uParticleBaseSize + (sin(uTime + pos.x) * 0.003);
        float currentScale = baseSize + (rimInfluence * uParticleActiveSize);
        float stretch = rimInfluence * 0.02;

        vec3 transformed = position;
        transformed.x *= (currentScale + stretch) * uBlobScaleX;
        transformed.y *= currentScale * uBlobScaleY;

        vSize = rimInfluence;
        vPos = pos.xy;

        float dirLen = max(length(relToMouse), 0.0001);
        vec2 dir = relToMouse / dirLen;
        float oscPhase = aRandom * 6.28318530718;
        float osc = 0.5 + 0.5 * sin(uTime * (0.25 + uParticleOscillationFactor * 0.35) + oscPhase);
        float speedScale = mix(0.55, 1.35, osc) * (0.8 + uParticleOscillationFactor * 0.2);
        float jitterScale = mix(0.7, 1.45, osc) * (0.85 + uParticleOscillationFactor * 0.15);
        float jitter = sin(uTime * uParticleRotationSpeed * speedScale + pos.x * 0.35 + pos.y * 0.35) * (uParticleRotationJitter * jitterScale);
        vec2 perp = vec2(-dir.y, dir.x);
        vec2 jitteredDir = normalize(dir + perp * jitter);
        mat2 rot = mat2(jitteredDir.x, jitteredDir.y, -jitteredDir.y, jitteredDir.x);
        transformed.xy = rot * transformed.xy;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos + transformed, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;

      varying vec2 vUv;
      varying float vSize;
      varying vec2 vPos;

      void main() {
        vec2 center = vec2(0.5);
        vec2 pos = abs(vUv - center) * 2.0;

        float d = pow(pow(pos.x, 2.6) + pow(pos.y, 2.6), 1.0 / 2.6);
        float alpha = 1.0 - smoothstep(0.8, 1.0, d);

        if (alpha < 0.01) discard;

        // Cyber/hologram color palette
        vec3 baseColor = vec3(0.02, 0.04, 0.08);
        vec3 colorOne = vec3(0.0, 0.8, 1.0);       // cyan #00CCFF
        vec3 colorTwo = vec3(0.0, 1.0, 0.533);     // neon green #00FF88
        vec3 colorThree = vec3(0.533, 0.4, 1.0);   // hologram purple #8866FF
        vec3 colorFour = vec3(0.2, 0.533, 1.0);    // electric blue #3388FF
        vec3 colorFive = vec3(0.0, 1.0, 0.8);      // teal #00FFCC

        float t = uTime * 1.2;
        float p1 = sin(vPos.x * 0.8 + t);
        float p2 = sin(vPos.y * 0.8 + t * 0.8 + p1);
        float p3 = sin(vPos.x * 0.5 + vPos.y * 0.5 + t * 0.6);
        float p4 = sin(vPos.y * 0.3 + t * 0.4 + p1 * 0.5);

        vec3 activeColor = mix(colorOne, colorTwo, p1 * 0.5 + 0.5);
        activeColor = mix(activeColor, colorThree, p2 * 0.5 + 0.5);
        activeColor = mix(activeColor, colorFour, p3 * 0.3 + 0.3);
        activeColor = mix(activeColor, colorFive, p4 * 0.25 + 0.25);

        vec3 finalColor = mix(baseColor, activeColor, smoothstep(0.1, 0.8, vSize));
        float finalAlpha = alpha * mix(0.4, 0.95, vSize);

        // Hologram glow — boost brightness near rim
        finalColor += activeColor * vSize * 0.3;

        gl_FragColor = vec4(finalColor, finalAlpha);
      }
    `;

    material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uOuterOscFrequency: { value: DEFAULTS.halo.outerOscFrequency },
        uOuterOscAmplitude: { value: DEFAULTS.halo.outerOscAmplitude },
        uHaloRadiusBase: { value: DEFAULTS.halo.radiusBase },
        uHaloRadiusAmplitude: { value: DEFAULTS.halo.radiusAmplitude },
        uHaloShapeAmplitude: { value: DEFAULTS.halo.shapeAmplitude },
        uHaloRimWidth: { value: DEFAULTS.halo.rimWidth },
        uHaloOuterStartOffset: { value: DEFAULTS.halo.outerStartOffset },
        uHaloOuterEndOffset: { value: DEFAULTS.halo.outerEndOffset },
        uHaloScaleX: { value: DEFAULTS.halo.scaleX },
        uHaloScaleY: { value: DEFAULTS.halo.scaleY },
        uParticleBaseSize: { value: DEFAULTS.particles.baseSize },
        uParticleActiveSize: { value: DEFAULTS.particles.activeSize },
        uBlobScaleX: { value: DEFAULTS.particles.blobScaleX },
        uBlobScaleY: { value: DEFAULTS.particles.blobScaleY },
        uParticleRotationSpeed: { value: DEFAULTS.particles.rotationSpeed },
        uParticleRotationJitter: { value: DEFAULTS.particles.rotationJitter },
        uParticleOscillationFactor: { value: DEFAULTS.particles.oscillationFactor },
      },
      transparent: true,
      depthWrite: false,
    });

    const geometry = new THREE.PlaneGeometry(1, 1);

    const count = countX * countY;
    const offsets = new Float32Array(count * 3);
    const randoms = new Float32Array(count);

    const gridWidth = 60;
    const gridHeight = 22;
    const jitter = 0.25;

    const aspect = container.clientWidth / container.clientHeight;

    let i = 0;
    for (let y = 0; y < countY; y++) {
      for (let x = 0; x < countX; x++) {
        const u = x / (countX - 1);
        const v = y / (countY - 1);

        const aspectDivisor = isMobile ? 1.4 : isTablet ? 1.2 : 1.8;
        let px = (u - 0.5) * gridWidth * (aspect / aspectDivisor);
        let py = (v - 0.5) * gridHeight;

        px += (Math.random() - 0.5) * jitter;
        py += (Math.random() - 0.5) * jitter;

        offsets[i * 3] = px;
        offsets[i * 3 + 1] = py;
        offsets[i * 3 + 2] = 0;

        randoms[i] = Math.random();
        i++;
      }
    }

    geometry.setAttribute("aOffset", new THREE.InstancedBufferAttribute(offsets, 3));
    geometry.setAttribute("aRandom", new THREE.InstancedBufferAttribute(randoms, 1));

    instancedMesh = new THREE.InstancedMesh(geometry, material, count);
    scene.add(instancedMesh);

    let cachedViewport = { width: 0, height: 0 };

    function getViewportAtZ0() {
      if (cachedViewport.width === 0) {
        const vFov = (camera.fov * Math.PI) / 180;
        const viewportHeight = 2 * Math.tan(vFov / 2) * camera.position.z;
        const viewportWidth = viewportHeight * camera.aspect;
        cachedViewport = { width: viewportWidth, height: viewportHeight };
      }
      return cachedViewport;
    }

    function updateMouse(clientX: number, clientY: number) {
      const rect = renderer.domElement.getBoundingClientRect();
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((clientY - rect.top) / rect.height) * 2 + 1;

      const viewport = getViewportAtZ0();
      targetMouseX = (nx * viewport.width) / 2;
      targetMouseY = (ny * viewport.height) / 2;

      isInteracting = true;
    }

    function onMouseMove(event: MouseEvent) {
      updateMouse(event.clientX, event.clientY);
    }

    function onTouchMove(event: TouchEvent) {
      if (event.touches.length > 0) {
        updateMouse(event.touches[0].clientX, event.touches[0].clientY);
      }
    }

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    function onResize() {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        cachedViewport = { width: 0, height: 0 };
      }, 150);
    }

    function onVisibilityChange() {
      isPaused = document.hidden;
    }

    function render() {
      animationId = requestAnimationFrame(render);
      if (isPaused) return;

      const t = (performance.now() - startTime) / 1000;

      if (material) {
        material.uniforms.uTime.value = t;

        let tX = targetMouseX;
        let tY = targetMouseY;

        if (isInteracting || (hasCoarsePointer && !isInteracting)) {
          const viewport = getViewportAtZ0();
          const jitterRadius =
            Math.min(viewport.width, viewport.height) * DEFAULTS.cursor.radius;
          const jitterX = (Math.sin(t * 0.35) + Math.sin(t * 0.77 + 1.2)) * 0.5;
          const jitterY = (Math.cos(t * 0.31) + Math.sin(t * 0.63 + 2.4)) * 0.5;

          const bX =
            hasCoarsePointer && !isInteracting ? 0 : targetMouseX || 0;
          const bY =
            hasCoarsePointer && !isInteracting ? 0 : targetMouseY || 0;

          tX =
            (bX + jitterX * jitterRadius * DEFAULTS.cursor.strength) *
            DEFAULTS.particles.cursorFollowStrength;
          tY =
            (bY + jitterY * jitterRadius * DEFAULTS.cursor.strength) *
            DEFAULTS.particles.cursorFollowStrength;
        }

        const current = material.uniforms.uMouse.value;
        const dragFactor = DEFAULTS.cursor.dragFactor;
        const yBias = DEFAULTS.halo.yBias;

        if (tX !== null && tY !== null) {
          current.x += (tX - current.x) * dragFactor;
          current.y += (tY + yBias - current.y) * dragFactor;
        } else {
          current.x += (0 - current.x) * dragFactor * 0.5;
          current.y += (yBias - current.y) * dragFactor * 0.5;
        }

        // Camera parallax — whole field follows mouse subtly
        const parallaxStrength = 0.5;
        camera.position.x += ((current.x * parallaxStrength) - camera.position.x) * 0.03;
        camera.position.y += ((current.y * parallaxStrength) - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    }

    // Event listeners
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibilityChange);

    if (hasCoarsePointer) {
      container.addEventListener("touchmove", onTouchMove, { passive: true });
      container.addEventListener("touchstart", onTouchMove, { passive: true });
      container.addEventListener(
        "touchend",
        () => {
          isInteracting = false;
        },
        { passive: true }
      );
    } else {
      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("mouseleave", () => {
        isInteracting = false;
        targetMouseX = null;
        targetMouseY = null;
      });
      container.addEventListener("mouseenter", () => {
        isInteracting = true;
      });
    }

    // IntersectionObserver to pause when off-screen
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isPaused = !entry.isIntersecting || document.hidden;
        });
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(container);

    onResize();
    render();

    return () => {
      cancelAnimationFrame(animationId);
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("touchmove", onTouchMove);
      intersectionObserver.disconnect();
      renderer.dispose();
      material.dispose();
      geometry.dispose();
      instancedMesh.geometry.dispose();
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "auto",
      }}
    />
  );
}
