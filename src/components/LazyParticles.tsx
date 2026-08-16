"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const AntigravityParticles = dynamic(() => import("@/components/AntigravityParticles"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-black" />,
});

export default function LazyParticles() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const start = () => setShow(true);
    if ("requestIdleCallback" in window) {
      (window as Window).requestIdleCallback(start, { timeout: 3000 });
    } else {
      setTimeout(start, 1500);
    }
  }, []);

  if (!show) return <div className="h-full w-full bg-black" />;
  return <AntigravityParticles />;
}
