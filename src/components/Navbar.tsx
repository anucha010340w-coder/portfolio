"use client";

import Link from "next/link";
import { useState } from "react";
import PixelLogo from "@/components/PixelLogo";

const navItems = [
  { href: "/", label: "หน้าแรก" },
  { href: "/about", label: "เกี่ยวกับ" },
  { href: "/services", label: "บริการ" },
  { href: "/portfolio", label: "ผลงาน" },
  { href: "/demo", label: "ทดลองใช้งาน" },
  { href: "/blog", label: "บทความ" },
  { href: "/contact", label: "ติดต่อ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5">
        <Link href="/" className="flex shrink-0 items-center">
          <PixelLogo />
        </Link>

        {/* Desktop */}
        <ul className="hidden flex-nowrap items-center gap-0.5 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-full px-2.5 py-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" className="btn-primary ml-2 px-4 py-2 text-sm">
              จ้างงาน
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-border p-2 md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="border-t border-border bg-card px-4 py-2 md:hidden">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-muted hover:bg-background hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
