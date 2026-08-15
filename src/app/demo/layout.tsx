"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isIndex = pathname === "/demo";

  return (
    <div className="min-h-screen bg-slate-100">
      {!isIndex && (
        <Link
          href="/demo"
          className="fixed bottom-6 left-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-all hover:scale-110 hover:bg-accent"
          aria-label="กลับหน้าเลือก Demo"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
      )}
      {children}
    </div>
  );
}
