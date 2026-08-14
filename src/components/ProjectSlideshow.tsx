"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
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
      className="relative overflow-hidden rounded-2xl border border-border"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div className="relative h-[400px] md:h-[460px]">
        {projects.map((p, i) => (
          <div
            key={p.slug}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? "auto" : "none" }}
          >
            <div className="grid h-full md:grid-cols-2">
              {/* Image */}
              <div className="relative h-48 md:h-full">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent md:bg-linear-to-r" />
              </div>
              {/* Content */}
              <div className="flex flex-col justify-center p-6 md:p-10">
                <span className="inline-flex w-fit items-center rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
                  {p.category}
                </span>
                <h3 className="mt-3 text-xl font-bold md:text-2xl">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.slice(0, 4).map((t) => (
                    <span key={t} className="rounded bg-background px-2 py-0.5 text-xs text-muted">
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/portfolio#${p.slug}`}
                  className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all"
                >
                  ดูรายละเอียด <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-card/80 p-2 backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-card/80 p-2 backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-8 bg-accent" : "w-2 bg-border hover:bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
