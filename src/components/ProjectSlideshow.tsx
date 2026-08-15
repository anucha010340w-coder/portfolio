"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Check } from "lucide-react";
import type { Project } from "@/lib/projects";

export default function ProjectSlideshow({ projects }: { projects: Project[] }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % projects.length);
  }, [projects.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + projects.length) % projects.length);
  }, [projects.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-black/5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div className="relative aspect-[16/10] w-full">
        {projects.map((p, i) => (
          <div
            key={p.slug}
            className="absolute inset-0 transition-all duration-700 ease-out"
            style={{
              opacity: i === current ? 1 : 0,
              transform: i === current ? "translateX(0)" : "translateX(40px)",
              pointerEvents: i === current ? "auto" : "none",
            }}
          >
            {/* Full-bleed image */}
            <div className="absolute inset-0">
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
                priority={i === 0}
              />
              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            </div>

            {/* Content overlay - bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10">
              <div className="max-w-xl">
                <span className="inline-flex w-fit items-center rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                  {p.category}
                </span>
                <h3 className="mt-3 text-xl font-bold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] md:text-3xl">{p.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] md:text-base">{p.description}</p>

                {/* Highlights - desktop only */}
                <ul className="mt-4 hidden gap-2 md:flex md:flex-col">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                      <Check className="h-4 w-4 shrink-0 text-green-400" />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-2 md:mt-4">
                  {p.tags.slice(0, 4).map((t) => (
                    <span key={t} className="rounded-full border border-white/20 bg-black/50 px-2.5 py-0.5 text-xs text-white backdrop-blur-sm">
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/portfolio#${p.slug}`}
                  className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-foreground transition-all hover:gap-3 hover:bg-white/90 md:mt-5 md:px-5 md:text-sm"
                >
                  ดูรายละเอียด <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Arrows - inside slides div for correct positioning */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full border border-white/20 bg-black/30 p-2 text-white backdrop-blur-md transition-all hover:bg-black/50 hover:scale-110"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full border border-white/20 bg-black/30 p-2 text-white backdrop-blur-md transition-all hover:bg-black/50 hover:scale-110"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Thumbnail navigation */}
      <div className="flex gap-2 border-t border-border bg-card p-3">
        {projects.map((p, i) => (
          <button
            key={p.slug}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`group relative h-14 flex-1 overflow-hidden rounded-lg border transition-all ${
              i === current
                ? "border-accent ring-2 ring-accent/20"
                : "border-border opacity-50 hover:opacity-100"
            }`}
          >
            <Image
              src={p.image}
              alt={p.title}
              fill
              className="object-cover"
              sizes="200px"
            />
            <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/20" />
            <span className="absolute bottom-1 left-2 right-2 truncate text-left text-[10px] font-medium text-white">
              {p.title}
            </span>
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-20 h-0.5 bg-border">
        <div
          className="h-full bg-gradient-to-r from-accent to-accent-2 transition-all duration-700 ease-out"
          style={{ width: `${((current + 1) / projects.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
