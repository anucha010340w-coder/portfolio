"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const AntigravityParticles = dynamic(() => import("@/components/AntigravityParticles"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-black" />,
});

const EVENTS = ["pointerdown", "touchstart", "scroll", "mousemove", "keydown"] as const;

export default function LazyParticles() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let done = false;
    const start = () => {
      if (done) return;
      done = true;
      EVENTS.forEach((e) => window.removeEventListener(e, start));
      setShow(true);
    };

    EVENTS.forEach((e) =>
      window.addEventListener(e, start, { once: true, passive: true })
    );

    const timeout = setTimeout(start, 1000);

    return () => {
      EVENTS.forEach((e) => window.removeEventListener(e, start));
      clearTimeout(timeout);
    };
  }, []);

  if (!show) return <div className="h-full w-full bg-black" />;
  return <AntigravityParticles />;
}
