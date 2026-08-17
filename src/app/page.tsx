import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { services } from "@/lib/services";
import { projects } from "@/lib/projects";
import { getAllPosts } from "@/lib/posts";
import { serviceIconMap } from "@/lib/serviceIcons";
import LazyParticles from "@/components/LazyParticles";
import ContactCTA from "@/components/ContactCTA";
import Reveal from "@/components/Reveal";
import TypeReveal from "@/components/TypeReveal";

const Terminal = dynamic(() => import("@/components/Terminal"), {
  loading: () => <div className="h-64 rounded-lg bg-black" />,
});
const ProjectSlideshow = dynamic(() => import("@/components/ProjectSlideshow"), {
  loading: () => <div className="h-64 animate-pulse rounded-lg bg-card/40" />,
});
const Gallery = dynamic(() => import("@/components/Gallery"), {
  loading: () => <div className="h-64 animate-pulse rounded-lg bg-card/40" />,
});

export const metadata: Metadata = {
  title: `รับทำเว็บไซต์ แอพ ระบบ POS | ${siteConfig.name} — AW Dev`,
  description: `รับทำเว็บไซต์ เว็บแอพ แอพมือถือ ระบบ POS ระบบตามสั่ง โดย ${siteConfig.name} — Full-Stack Developer ใช้ Next.js React TypeScript โหลดเร็ว ติดอันดับ Google ส่งงานเร็ว ราคาคุยได้ ปรึกษาฟรี ทัก LINE ได้เลย`,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: `รับทำเว็บไซต์ แอพ ระบบ POS | ${siteConfig.name} — AW Dev`,
    description: `รับทำเว็บไซต์ เว็บแอพ แอพมือถือ ระบบ POS ระบบตามสั่ง โดย ${siteConfig.name} — ส่งงานเร็ว ราคาคุยได้ ปรึกษาฟรี`,
    url: siteConfig.url,
    siteName: "AW Dev",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AW Dev — รับทำเว็บไซต์ แอพ ระบบ POS ระบบตามสั่ง",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `รับทำเว็บไซต์ แอพ ระบบ POS | ${siteConfig.name} — AW Dev`,
    description: `รับทำเว็บไซต์ เว็บแอพ แอพมือถือ ระบบ POS ระบบตามสั่ง โดย ${siteConfig.name} — ส่งงานเร็ว ราคาคุยได้`,
    images: ["/opengraph-image"],
  },
};

export default function Home() {
  const featuredPosts = getAllPosts().slice(0, 3);
  const featuredServices = services.slice(0, 4);
  const slideshowProjects = projects.slice(0, 5);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Cyber/hologram background — full width */}
        <div className="absolute inset-0 z-0 bg-black">
          <LazyParticles />
        </div>
        <div className="pointer-events-none relative z-10 mx-auto max-w-6xl px-4 py-20 md:py-40">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="text-white">
              <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-7xl md:leading-[1.1]">
                แปลไอเดีย
                <br />
                ให้เป็น<span className="text-gradient-animated">ผลิตภัณฑ์</span>
              </h1>
              <p className="animate-fade-up delay-200 mt-6 max-w-xl text-lg text-gray-300 sm:text-xl md:text-2xl">
                {siteConfig.role} ที่ออกแบบและสร้างระบบตั้งแต่เว็บไซต์
                แอพมือถือ จนถึงระบบธุรกิจเต็มรูปแบบ — ใช้งานได้จริง ส่งมอบตรงเวลา
              </p>
              <div className="animate-fade-up delay-300 mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary pointer-events-auto bg-cyan-500 text-white shadow-lg shadow-cyan-500/30 hover:bg-cyan-400">
                  เริ่มโปรเจกต์
                </Link>
                <Link href="/portfolio" className="btn-ghost btn-ghost-hero pointer-events-auto">
                  ดูผลงาน
                </Link>
              </div>
            </div>

            {/* Terminal */}
            <div className="animate-fade-in delay-500 hidden md:block">
              <div className="animate-float">
                <Terminal />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats + Tech */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <Reveal>
        <div className="rounded-xl border border-border bg-card/40 font-mono text-sm">
            <div className="flex items-center gap-2 border-b border-border bg-card/60 px-4 py-2.5">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
              <span className="h-3 w-3 rounded-full bg-green-400/70" />
              <span className="ml-2 text-xs text-muted">developer-profile.ts</span>
            </div>

            {/* Stats as code comments */}
            <div className="grid gap-0 border-b border-border md:grid-cols-2">
              <div className="border-b border-border p-5 md:border-r md:border-b-0">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-muted">{"// "}ปีประสบการณ์</span>
                  <span className="text-lg font-bold text-accent">5+</span>
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-4">
                  <span className="text-muted">{"// "}โปรเจกต์ส่งมอบ</span>
                  <span className="text-lg font-bold text-accent">30+</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-muted">{"// "}ลูกค้ากลับมาจ้างซ้ำ</span>
                  <span className="text-lg font-bold text-accent">100%</span>
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-4">
                  <span className="text-muted">{"// "}เวลาตอบกลับเฉลี่ย</span>
                  <span className="text-lg font-bold text-accent">{"< 2 ชม."}</span>
                </div>
              </div>
            </div>

            {/* Tech stack as dependencies */}
            <div className="p-5">
              <div className="mb-3 text-muted">
                <span className="text-green-400">const</span>{" "}
                <span className="text-blue-400">stack</span>{" "}
                <span className="text-muted">= {"{"}</span>
              </div>
              <div className="grid gap-4 pl-6 md:grid-cols-3">
                {[
                  { cat: "frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Flutter"] },
                  { cat: "backend", items: ["Node.js", "NestJS", "Express", "Prisma", "PostgreSQL", "MongoDB", "Redis"] },
                  { cat: "devops", items: ["Docker", "Linux", "Nginx"] },
                ].map((group) => (
                  <div key={group.cat}>
                    <div className="mb-2 text-xs text-muted">
                      <span className="text-blue-400">{group.cat}</span>
                      <span className="text-muted">: [</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pl-3">
                      {group.items.map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-border bg-background/40 px-2 py-1 text-xs text-foreground transition-all hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-1 text-xs text-muted">]</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-muted">
                <span className="text-muted">{"}"}</span>
                <span className="animate-pulse text-accent">_</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <Reveal>
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"><TypeReveal text="บริการของผม" /></h2>
            <p className="mt-3 text-base text-muted sm:text-lg"><TypeReveal text="ครอบคลุมงานพัฒนาซอฟต์แวร์ทุกประเภท" speed={30} /></p>
          </div>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((s, i) => (
            <Reveal key={s.slug} delay={i * 100}>
              <Link
                href={`/services#${s.slug}`}
                className="card card-hover group block p-6"
              >
                <div className="text-accent transition-transform group-hover:scale-110">
                  {(() => {
                    const Icon = serviceIconMap[s.icon] ?? serviceIconMap.Globe;
                    return <Icon className="h-8 w-8" />;
                  })()}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.short}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-8 text-center">
            <Link href="/services" className="btn-ghost">
              ดูบริการทั้งหมด
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Project Slideshow */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <Reveal>
            <div className="mb-8 md:mb-12">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"><TypeReveal text="ผลงานตัวอย่าง" /></h2>
              <p className="mt-3 text-base text-muted sm:text-lg"><TypeReveal text="ตัวอย่างโปรเจกต์ที่ผมทำจริง" speed={30} /></p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <ProjectSlideshow projects={slideshowProjects} />
          </Reveal>
          <Reveal>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/portfolio" className="btn-ghost">
                ดูผลงานทั้งหมด
              </Link>
              <Link href="/demo" className="btn-primary">
                ทดลองใช้งานระบบ
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <Reveal>
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"><TypeReveal text="ตัวอย่างงานออกแบบ" /></h2>
            <p className="mt-3 text-base text-muted sm:text-lg"><TypeReveal text="แบนเนอร์ สื่อโฆษณา และงานออกแบบต่างๆ" speed={30} /></p>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <Gallery />
        </Reveal>
      </section>

      {/* Blog preview */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <Reveal>
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"><TypeReveal text="บทความล่าสุด" /></h2>
            <p className="mt-3 text-base text-muted sm:text-lg"><TypeReveal text="ความรู้และคำแนะนำจากประสบการณ์จริง" speed={30} /></p>
          </div>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {featuredPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 100}>
              <Link
                href={`/blog/${post.slug}`}
                className="card card-hover flex h-full flex-col p-6"
              >
                <span className="text-xs text-accent">{post.category}</span>
                <h3 className="mt-2 line-clamp-2 text-lg font-semibold">{post.title}</h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">{post.description}</p>
                <div className="mt-4 flex items-center gap-3 text-xs text-muted">
                  <time>{new Date(post.date).toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" })}</time>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-8 text-center">
            <Link href="/blog" className="btn-ghost">
              อ่านบทความทั้งหมด
            </Link>
          </div>
        </Reveal>
      </section>

      {/* SEO Content */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <Reveal>
          <h2 className="text-2xl font-bold">รับทำเว็บไซต์ แอพ และระบบ โดย {siteConfig.name}</h2>
          <p className="mt-4 text-muted">
            สวัสดีครับ ผม {siteConfig.name} หรือ AW Dev — Full-Stack Developer รับทำเว็บไซต์
            เว็บแอพ แอพมือถือ ระบบ POS ระบบตามสั่ง และระบบธุรกิจทุกประเภท
            ใช้เทคโนโลยี Next.js React TypeScript ทันสมัย โหลดเร็ว ติดอันดับ Google ดี
            รับงานตั้งแต่เว็บ 1 หน้า (Landing Page) ไปจนถึงระบบเต็มรูปแบบ
            ส่งงานเร็ว ราคาคุยได้ ปรึกษาฟรี ทัก LINE ได้เลย
          </p>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-4 text-sm text-muted">
            บริการครอบคลุม: รับทำเว็บไซต์ธุรกิจ รับทำเว็บบริษัท รับทำเว็บขายของ
            รับทำเว็บแอพ รับทำแอพมือถือ iOS Android รับทำระบบ POS ร้านอาหาร
            รับทำระบบจองคิว รับทำระบบคลังสินค้า รับทำระบบ CRM รับทำระบบ ERP
            รับทำระบบตามสั่ง รับเขียนโปรแกรม และที่ปรึกษา IT
          </p>
        </Reveal>
      </section>

      <ContactCTA />
    </>
  );
}
