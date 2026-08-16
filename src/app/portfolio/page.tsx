import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, MousePointerClick } from "lucide-react";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";
import ContactCTA from "@/components/ContactCTA";
import Reveal from "@/components/Reveal";
import TypeReveal from "@/components/TypeReveal";
import { BreadcrumbSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "ผลงาน",
  description: `ผลงานตัวอย่างของ ${siteConfig.name} — เว็บแอพ เว็บธุรกิจ แอพมือถือ ระบบ POS และระบบตามสั่ง`,
  alternates: { canonical: "/portfolio" },
  openGraph: {
    type: "website",
    title: `ผลงาน | ${siteConfig.name}`,
    description: `ผลงานตัวอย่างของ ${siteConfig.name} — เว็บแอพ เว็บธุรกิจ แอพมือถือ ระบบ POS และระบบตามสั่ง`,
    url: `${siteConfig.url}/portfolio`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `ผลงาน | ${siteConfig.name}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `ผลงาน | ${siteConfig.name}`,
    description: `ผลงานตัวอย่างของ ${siteConfig.name} — เว็บแอพ เว็บธุรกิจ แอพมือถือ ระบบ POS และระบบตามสั่ง`,
    images: ["/opengraph-image"],
  },
};

export default function PortfolioPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "หน้าแรก", path: "/" }, { name: "ผลงาน", path: "/portfolio" }]} />
      <section className="relative overflow-hidden">
        <div className="bg-hologram absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4 py-28">
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl"><TypeReveal text="ผลงาน" /></h1>
          <p className="mt-4 text-xl text-muted">
            <TypeReveal text="ตัวอย่างโปรเจกต์ที่ผมทำจริง ครอบคลุมหลายประเภทงาน" speed={30} />
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
            <article id={p.slug} className="card card-hover overflow-hidden p-0">
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
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <Reveal>
        <Link
          href="/demo"
          className="card card-hover flex flex-col items-center justify-between gap-4 p-6 md:flex-row"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <MousePointerClick className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-bold">ทดลองใช้งานระบบตัวอย่าง</h2>
              <p className="mt-0.5 text-sm text-muted">
                ลองกดเล่น POS, ร้านค้าออนไลน์, ระบบจองคิว — เห็นภาพจริงก่อนจ้างทำ
              </p>
            </div>
          </div>
          <span className="btn-primary text-sm">ไปทดลองใช้งาน</span>
        </Link>
        </Reveal>
      </section>

      <ContactCTA />
    </>
  );
}
