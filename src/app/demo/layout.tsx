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
          className="fixed top-6 left-4 z-[70] flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-white shadow-lg transition-all hover:scale-105 hover:bg-accent"
          aria-label="กลับหน้าเลือก Demo"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm font-medium">กลับ</span>
        </Link>
      )}
      {children}
    </div>
  );
}
