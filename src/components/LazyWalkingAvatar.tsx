"use client";

import dynamic from "next/dynamic";

const WalkingAvatar = dynamic(() => import("@/components/WalkingAvatar"), {
  ssr: false,
});

export default function LazyWalkingAvatar() {
  return <WalkingAvatar />;
}
