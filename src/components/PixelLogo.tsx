"use client";

import { useEffect, useRef } from "react";

const TEXT = "AW DEV";
const FONT_SIZE = 18;
const FONT_FAMILY = "monospace";
const PIXEL_SIZE = 3;
const GAP = 1;
const STEP = 1; // sample every 1px for high detail

// Ocean Blue + Orange palette — cool blues, cyans, indigos, violets + warm orange/amber
const PALETTE = [
  "#0ea5e9", "#0284c7", "#0066ff", "#3b82f6",
  "#2563eb", "#1d4ed8", "#4f46e5", "#4338ca",
  "#6366f1", "#818cf8", "#a5b4fc", "#8b5cf6",
  "#7c3aed", "#6d28d9", "#5b21b6", "#9333ea",
  "#a78bfa", "#c4b5fd", "#38bdf8", "#7dd3fc",
  "#bae6fd", "#60a5fa", "#3b82f6", "#2563eb",
  "#1e40af", "#1e3a8a", "#3730a3", "#312e81",
  "#4f46e5", "#6366f1", "#818cf8", "#a5b4fc",
  "#f97316", "#fb923c", "#f59e0b", "#fbbf24",
  "#ea580c", "#fdba74", "#fed7aa", "#ffedd5",
];

type Pixel = {
  x: number;
  y: number;
  color: string;
  delay: number;
  startX: number;
  startY: number;
};

export default function PixelLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = ctx; // non-null for closures

    // 1. Render text to an offscreen canvas to sample pixels
    const off = document.createElement("canvas");
    const octx = off.getContext("2d");
    if (!octx) return;

    octx.font = `bold ${FONT_SIZE}px ${FONT_FAMILY}`;
    const metrics = octx.measureText(TEXT);
    const textW = Math.ceil(metrics.width);
    const textH = FONT_SIZE;

    off.width = textW;
    off.height = textH;
    octx.font = `bold ${FONT_SIZE}px ${FONT_FAMILY}`;
    octx.fillStyle = "#fff";
    octx.textBaseline = "top";
    octx.fillText(TEXT, 0, 0);

    // 2. Sample pixels
    const imgData = octx.getImageData(0, 0, textW, textH).data;
    const pixels: Pixel[] = [];
    let colorIdx = 0;

    for (let y = 0; y < textH; y += STEP) {
      for (let x = 0; x < textW; x += STEP) {
        const i = (y * textW + x) * 4;
        const alpha = imgData[i + 3];
        if (alpha > 128) {
          const color = PALETTE[colorIdx % PALETTE.length];
          colorIdx++;
          // Random scatter start position
          const angle = Math.random() * Math.PI * 2;
          const dist = 20 + Math.random() * 30;
          pixels.push({
            x: x * (PIXEL_SIZE + GAP),
            y: y * (PIXEL_SIZE + GAP),
            color,
            delay: (x / textW) * 0.6 + Math.random() * 0.15,
            startX: Math.cos(angle) * dist,
            startY: Math.sin(angle) * dist,
          });
        }
      }
    }

    pixelsRef.current = pixels;
    const w = textW * (PIXEL_SIZE + GAP);
    const h = textH * (PIXEL_SIZE + GAP);
    sizeRef.current = { w, h };

    canvas.width = w * 2; // 2x for retina
    canvas.height = h * 2;
    canvas.style.width = `${w}px`;
    canvas.style.maxWidth = "100%";
    canvas.style.height = "auto";
    c.scale(2, 2);

    // 3. Animation loop
    const DURATION = 2000; // assemble in 2s
    const HOLD = 1500; // hold 1.5s
    const DISASSEMBLE = 1200; // disassemble in 1.2s
    const GAP_TIME = 400;
    const CYCLE = DURATION + HOLD + DISASSEMBLE + GAP_TIME;
    const startTime = performance.now();

    function draw(now: number) {
      const elapsed = (now - startTime) % CYCLE;
      c.clearRect(0, 0, w, h);

      let phase: "assemble" | "hold" | "disassemble" | "gap";
      let progress = 0;

      if (elapsed < DURATION) {
        phase = "assemble";
        progress = elapsed / DURATION;
      } else if (elapsed < DURATION + HOLD) {
        phase = "hold";
        progress = 1;
      } else if (elapsed < DURATION + HOLD + DISASSEMBLE) {
        phase = "disassemble";
        progress = 1 - (elapsed - DURATION - HOLD) / DISASSEMBLE;
      } else {
        phase = "gap";
        progress = 0;
      }

      for (const px of pixels) {
        let p: number;
        if (phase === "assemble") {
          p = Math.max(0, Math.min(1, (progress - px.delay) / 0.4));
          // ease out bounce
          p = 1 - Math.pow(1 - p, 3);
        } else if (phase === "hold") {
          p = 1;
        } else if (phase === "disassemble") {
          const dp = Math.max(0, Math.min(1, (progress - (1 - px.delay)) / 0.3));
          p = 1 - dp;
          p = Math.pow(p, 2);
        } else {
          p = 0;
        }

        if (p <= 0) continue;

        const cx = px.x + px.startX * (1 - p);
        const cy = px.y + px.startY * (1 - p);
        const size = PIXEL_SIZE * p;

        c.globalAlpha = p;
        c.fillStyle = px.color;
        c.fillRect(cx, cy, size, size);
      }

      c.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const { w, h } = sizeRef.current;

  return (
    <canvas
      ref={canvasRef}
      aria-label="AW Dev"
      role="img"
      style={{
        display: "block",
        imageRendering: "pixelated",
        maxWidth: "100%",
        height: "auto",
      }}
    />
  );
}
