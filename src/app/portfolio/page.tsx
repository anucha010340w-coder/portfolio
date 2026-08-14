import type { Metadata } from "next";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";
import ContactCTA from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "ผลงาน",
  description: `ผลงานตัวอย่างของ ${siteConfig.name} — เว็บแอพ เว็บธุรกิจ แอพมือถือ ระบบ POS และระบบตามสั่ง`,
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <section className="bg-grid relative">
        <div className="bg-glow absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4 py-20">
          <h1 className="text-4xl font-bold md:text-5xl">ผลงาน</h1>
          <p className="mt-4 text-lg text-muted">
            ตัวอย่างโปรเจกต์ที่ผมทำจริง ครอบคลุมหลายประเภทงาน
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <article key={p.slug} id={p.slug} className="card card-hover overflow-hidden p-0">
              <div className="relative h-48">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
                  {p.category}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-bold">{p.title}</h2>
              <p className="mt-2 text-muted">{p.description}</p>

              <h3 className="mt-5 text-sm font-semibold text-accent">จุดเด่นของงาน</h3>
              <ul className="mt-2 space-y-2">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-muted">
                    <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded bg-background px-2 py-1 text-xs text-muted">
                    {t}
                  </span>
                ))}
              </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
