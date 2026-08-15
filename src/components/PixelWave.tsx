"use client";

import { useEffect, useRef } from "react";

const PALETTE = [
  "#0ea5e9", "#0284c7", "#0066ff", "#3b82f6",
  "#2563eb", "#4f46e5", "#4338ca",
  "#6366f1", "#818cf8", "#a5b4fc", "#8b5cf6",
  "#7c3aed", "#38bdf8", "#7dd3fc", "#60a5fa",
];

const DOT_SIZE = 3;
const SPACING = 40; // wider spacing = sparse
const MOUSE_RADIUS = 100;
const SPRING = 0.06;
const FRICTION = 0.88;

type Dot = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  color: string;
  twinkleSpeed: number;
  twinklePhase: number;
  edgeBias: number; // 0 = anywhere, 1 = near edges
};

export default function PixelWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = ctx;

    let w = 0;
    let h = 0;
    let dots: Dot[] = [];

    function setup() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;

      canvas!.width = w * 2;
      canvas!.height = h * 2;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      c.setTransform(2, 0, 0, 2, 0, 0);

      dots = [];
      let colorIdx = 0;

      for (let y = 0; y < h; y += SPACING) {
        for (let x = 0; x < w; x += SPACING) {
          // Calculate distance from center — bias toward edges
          const cx = w / 2;
          const cy = h / 2;
          const distFromCenter = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          const maxDist = Math.sqrt(cx * cx + cy * cy);
          const edgeBias = distFromCenter / maxDist; // 0 center, 1 edge

          // Only keep ~40% of dots, weighted toward edges
          const keepProb = 0.15 + edgeBias * 0.45;
          if (Math.random() > keepProb) continue;

          const color = PALETTE[colorIdx % PALETTE.length];
          colorIdx++;

          dots.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
            color,
            twinkleSpeed: 0.5 + Math.random() * 2,
            twinklePhase: Math.random() * Math.PI * 2,
            edgeBias,
          });
        }
      }
    }

    setup();

    function draw(now: number) {
      c.clearRect(0, 0, w, h);
      const t = now * 0.001;
      const mouse = mouseRef.current;

      for (const d of dots) {
        // Twinkle — dot appears and disappears
        const twinkle = Math.sin(t * d.twinkleSpeed + d.twinklePhase);
        const visible = twinkle > 0.3; // only show when twinkle is high enough

        if (!visible) {
          // Still update position for mouse interaction even if not visible
          d.vx *= FRICTION;
          d.vy *= FRICTION;
          d.x += d.vx;
          d.y += d.vy;
          d.x += (d.baseX - d.x) * SPRING;
          d.y += (d.baseY - d.y) * SPRING;
          continue;
        }

        // Gentle floating motion
        const floatX = Math.sin(t * 0.8 + d.twinklePhase) * 5;
        const floatY = Math.cos(t * 0.6 + d.twinklePhase * 1.3) * 5;
        const tx = d.baseX + floatX;
        const ty = d.baseY + floatY;

        // Mouse interaction — jitter/dance
        const dx = mouse.x - d.x;
        const dy = mouse.y - d.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          const angle = Math.atan2(dy, dx);
          // Push away + random jitter for "dancing" effect
          d.vx -= Math.cos(angle) * force * 3;
          d.vy -= Math.sin(angle) * force * 3;
          d.vx += (Math.random() - 0.5) * force * 2;
          d.vy += (Math.random() - 0.5) * force * 2;
        }

        // Spring back
        d.vx += (tx - d.x) * SPRING;
        d.vy += (ty - d.y) * SPRING;
        d.vx *= FRICTION;
        d.vy *= FRICTION;
        d.x += d.vx;
        d.y += d.vy;

        // Alpha based on twinkle
        const alpha = (twinkle - 0.3) / 0.7; // 0 to 1

        c.globalAlpha = alpha * 0.7;
        c.fillStyle = d.color;
        c.fillRect(d.x, d.y, DOT_SIZE, DOT_SIZE);

        // Bright core for high twinkle
        if (twinkle > 0.8) {
          c.globalAlpha = (twinkle - 0.8) * 5 * 0.5;
          c.fillRect(d.x - 1, d.y - 1, DOT_SIZE + 2, DOT_SIZE + 2);
        }
      }

      c.globalAlpha = 1;
      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    function onMouseLeave() {
      mouseRef.current = { x: -999, y: -999 };
    }

    function onResize() {
      setup();
    }

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    return () => {
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        imageRendering: "pixelated",
      }}
    />
  );
}
