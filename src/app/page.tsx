import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { services } from "@/lib/services";
import { projects } from "@/lib/projects";
import { getAllPosts } from "@/lib/posts";
import { serviceIconMap } from "@/lib/serviceIcons";
import AntigravityParticles from "@/components/AntigravityParticles";
import ContactCTA from "@/components/ContactCTA";
import ProjectSlideshow from "@/components/ProjectSlideshow";
import Reveal from "@/components/Reveal";
import TypeReveal from "@/components/TypeReveal";
import Terminal from "@/components/Terminal";
import Gallery from "@/components/Gallery";

export const metadata: Metadata = {
  title: `AW Dev | ${siteConfig.role}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: `AW Dev | ${siteConfig.role}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "AW Dev",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `AW Dev | ${siteConfig.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `AW Dev | ${siteConfig.role}`,
    description: siteConfig.description,
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
          <AntigravityParticles />
        </div>
        <div className="pointer-events-none relative z-10 mx-auto max-w-6xl px-4 py-20 md:py-40">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="md:text-white">
              <h1 className="animate-fade-up mt-6 max-w-3xl text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl md:text-7xl md:leading-[1.1] md:text-white">
                แปลไอเดีย
                <br />
                ให้เป็น<span className="text-gradient-animated">ผลิตภัณฑ์</span>
              </h1>
              <p className="animate-fade-up delay-200 mt-6 max-w-xl text-lg text-muted sm:text-xl md:text-2xl md:text-gray-300">
                {siteConfig.role} ที่ออกแบบและสร้างระบบตั้งแต่เว็บไซต์
                แอพมือถือ จนถึงระบบธุรกิจเต็มรูปแบบ — ใช้งานได้จริง ส่งมอบตรงเวลา
              </p>
              <div className="animate-fade-up delay-300 mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary pointer-events-auto md:bg-cyan-500 md:text-white md:hover:bg-cyan-400 md:shadow-lg md:shadow-cyan-500/30">
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

      <ContactCTA />
    </>
  );
}
