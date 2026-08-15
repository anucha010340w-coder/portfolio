"use client";

import { useEffect, useRef } from "react";

// Hologram green/cyan palette
const PALETTE = [
  "#32f08c", "#3ee1a3", "#60f2bd", "#a0fde7",
  "#22d3ee", "#67e8f9", "#06b6d4", "#10b981",
  "#34d399", "#6ee7b7", "#a7f3d0", "#2dd4bf",
  "#5eead4", "#99f6e4", "#ccfbf1", "#0891b2",
];

const PIXEL_SIZE = 4;
const GAP = 1;
const STEP = 4; // sample every 4px
const MOUSE_RADIUS = 80;
const REPULSION_FORCE = 30;
const SPRING = 0.06;
const FRICTION = 0.82;

// SVG robot face — drawn as an image then sampled like PixelLogo samples text
const ROBOT_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="480" viewBox="0 0 400 480">
  <rect x="80" y="60" width="240" height="300" rx="30" fill="#32f08c"/>
  <rect x="80" y="60" width="240" height="300" rx="30" fill="none" stroke="#22d3ee" stroke-width="4"/>
  <rect x="120" y="130" width="70" height="50" rx="10" fill="#0b0f14"/>
  <rect x="210" y="130" width="70" height="50" rx="10" fill="#0b0f14"/>
  <circle cx="155" cy="155" r="12" fill="#60f2bd"/>
  <circle cx="245" cy="155" r="12" fill="#60f2bd"/>
  <rect x="140" y="220" width="120" height="12" rx="6" fill="#0b0f14"/>
  <rect x="150" y="250" width="20" height="40" rx="4" fill="#0b0f14"/>
  <rect x="180" y="250" width="20" height="40" rx="4" fill="#0b0f14"/>
  <rect x="210" y="250" width="20" height="40" rx="4" fill="#0b0f14"/>
  <rect x="240" y="250" width="20" height="40" rx="4" fill="#0b0f14"/>
  <rect x="180" y="20" width="40" height="40" rx="8" fill="#32f08c"/>
  <circle cx="200" cy="20" r="10" fill="#a0fde7"/>
  <rect x="50" y="150" width="30" height="80" rx="10" fill="#22d3ee"/>
  <rect x="320" y="150" width="30" height="80" rx="10" fill="#22d3ee"/>
  <rect x="120" y="380" width="160" height="20" rx="6" fill="#32f08c"/>
  <rect x="100" y="400" width="200" height="40" rx="10" fill="#22d3ee"/>
</svg>
`)}`;

type Pixel = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  color: string;
  delay: number;
  startX: number;
  startY: number;
};

export default function HologramDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = ctx;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = ROBOT_SVG;

    img.onload = () => {
      // 1. Render image to offscreen canvas and sample pixels — exactly like PixelLogo
      const off = document.createElement("canvas");
      const octx = off.getContext("2d");
      if (!octx) return;

      const imgW = 400;
      const imgH = 480;
      off.width = imgW;
      off.height = imgH;
      octx.drawImage(img, 0, 0, imgW, imgH);

      const imgData = octx.getImageData(0, 0, imgW, imgH).data;
      const pixels: Pixel[] = [];
      let colorIdx = 0;

      for (let y = 0; y < imgH; y += STEP) {
        for (let x = 0; x < imgW; x += STEP) {
          const i = (y * imgW + x) * 4;
          const alpha = imgData[i + 3];
          if (alpha > 128) {
            const r = imgData[i];
            const g = imgData[i + 1];
            const b = imgData[i + 2];
            // Use original color if bright, otherwise use palette
            const brightness = (r + g + b) / 3;
            const color = brightness > 50
              ? `rgb(${r},${g},${b})`
              : PALETTE[colorIdx % PALETTE.length];
            colorIdx++;

            const px = x * (PIXEL_SIZE + GAP);
            const py = y * (PIXEL_SIZE + GAP);
            const angle = Math.random() * Math.PI * 2;
            const dist = 30 + Math.random() * 60;

            pixels.push({
              x: px + Math.cos(angle) * dist,
              y: py + Math.sin(angle) * dist,
              baseX: px,
              baseY: py,
              vx: 0,
              vy: 0,
              color,
              delay: (x / imgW) * 0.5 + Math.random() * 0.2,
              startX: Math.cos(angle) * dist,
              startY: Math.sin(angle) * dist,
            });
          }
        }
      }

      const w = imgW * (PIXEL_SIZE + GAP);
      const h = imgH * (PIXEL_SIZE + GAP);

      canvas.width = w * 2;
      canvas.height = h * 2;
      canvas.style.width = `${w}px`;
      canvas.style.maxWidth = "100%";
      canvas.style.height = "auto";
      c.scale(2, 2);

      // 2. Animation — assemble phase then hold with mouse interaction
      const DURATION = 2000;
      const startTime = performance.now();

      function draw(now: number) {
        const elapsed = now - startTime;
        c.clearRect(0, 0, w, h);

        const assembleProgress = Math.min(1, elapsed / DURATION);
        const mouse = mouseRef.current;

        for (const px of pixels) {
          // Assembly animation (like PixelLogo)
          let p = Math.max(0, Math.min(1, (assembleProgress - px.delay) / 0.4));
          p = 1 - Math.pow(1 - p, 3);

          if (p <= 0) continue;

          // Target position
          let tx = px.baseX + px.startX * (1 - p);
          let ty = px.baseY + px.startY * (1 - p);

          // Mouse repulsion (only when mostly assembled)
          if (p > 0.5) {
            const dx = mouse.x - px.x;
            const dy = mouse.y - px.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MOUSE_RADIUS && dist > 0) {
              const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
              const angle = Math.atan2(dy, dx);
              tx -= Math.cos(angle) * force * REPULSION_FORCE;
              ty -= Math.sin(angle) * force * REPULSION_FORCE;
            }

            // Spring physics — pull back to target
            px.vx += (tx - px.x) * SPRING;
            px.vy += (ty - px.y) * SPRING;
            px.vx *= FRICTION;
            px.vy *= FRICTION;
            px.x += px.vx;
            px.y += px.vy;
          } else {
            px.x = tx;
            px.y = ty;
          }

          const size = PIXEL_SIZE * p;

          // Hologram pulse
          const pulse = 0.7 + Math.sin(now * 0.003 + px.baseX * 0.02) * 0.3;

          c.globalAlpha = p * pulse;
          c.fillStyle = px.color;
          c.fillRect(px.x, px.y, size, size);
        }

        c.globalAlpha = 1;
        requestAnimationFrame(draw);
      }

      requestAnimationFrame(draw);
    };

    // Mouse tracking
    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const scaleX = (canvas!.width / 2) / rect.width;
      const scaleY = (canvas!.height / 2) / rect.height;
      mouseRef.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    }

    function onMouseLeave() {
      mouseRef.current = { x: -999, y: -999 };
    }

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    return () => {
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-label="AI Robot Hologram"
      role="img"
      style={{
        display: "block",
        imageRendering: "pixelated",
        maxWidth: "100%",
        height: "auto",
        margin: "0 auto",
      }}
    />
  );
}
