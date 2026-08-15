"use client";

import dynamic from "next/dynamic";

const AntigravityParticles = dynamic(() => import("@/components/AntigravityParticles"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-black" />,
});

export default function LazyParticles() {
  return <AntigravityParticles />;
}
