"use client";

import { useEffect, useRef, useState } from "react";

export default function TypeReveal({
  text,
  className = "",
  speed = 40,
  startDelay = 200,
}: {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            setStarted(true);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    const startTimer = setTimeout(() => {
      const tick = () => {
        if (i <= text.length) {
          setDisplayed(text.slice(0, i));
          i++;
          timer = setTimeout(tick, speed);
        }
      };
      tick();
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer);
    };
  }, [started, text, speed, startDelay]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="type-cursor-inline" />
      )}
    </span>
  );
}
