import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { services } from "@/lib/services";
import { projects } from "@/lib/projects";
import { getAllPosts } from "@/lib/posts";
import { serviceIconMap } from "@/lib/serviceIcons";
import ContactCTA from "@/components/ContactCTA";
import ProjectSlideshow from "@/components/ProjectSlideshow";
import Reveal from "@/components/Reveal";
import Terminal from "@/components/Terminal";
import Gallery from "@/components/Gallery";

const techMarquee = [
  "Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS",
  "PostgreSQL", "React Native", "Flutter", "Docker", "Prisma",
  "NestJS", "Express", "MongoDB", "Redis", "Linux", "Nginx",
];

export default function Home() {
  const featuredPosts = getAllPosts().slice(0, 3);
  const featuredServices = services.slice(0, 4);
  const slideshowProjects = projects.slice(0, 5);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-grid">
        <div className="bg-glow absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-32">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <div className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                เปิดรับงานใหม่
              </div>
              <h1 className="animate-fade-up delay-100 mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
                สวัสดีครับ ผม
                <br />
                <span className="text-gradient-animated">AW Dev</span>
                <br />
                <span className="text-xl md:text-3xl text-muted">{siteConfig.role}</span>
              </h1>
              <p className="animate-fade-up delay-200 mt-6 max-w-2xl text-lg text-muted">
                {siteConfig.tagline} ผมช่วยธุรกิจและบุคคลสร้างระบบที่ใช้งานได้จริง
                ตั้งแต่เว็บนำเสนอจนถึงระบบเต็มรูปแบบ
              </p>
              <div className="animate-fade-up delay-300 mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary animate-glow-pulse">
                  ปรึกษาฟรี
                </Link>
                <Link href="/portfolio" className="btn-ghost">
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

          {/* Quick stats */}
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { num: "5+", label: "ปีประสบการณ์" },
              { num: "30+", label: "โปรเจกต์ส่งมอบ" },
              { num: "100%", label: "ลูกค้ากลับมาใช้ซ้ำ" },
              { num: "24/7", label: "คอยตอบและดูแล" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`card card-hover animate-fade-up p-4 text-center delay-${(i + 1) * 100}`}
              >
                <p className="text-2xl font-bold text-gradient">{s.num}</p>
                <p className="mt-1 text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech marquee */}
      <div className="overflow-hidden border-y border-border bg-card/30 py-4">
        <div className="marquee-track gap-6">
          {[...techMarquee, ...techMarquee].map((tech, i) => (
            <span
              key={i}
              className="flex items-center gap-2 whitespace-nowrap text-sm font-mono text-muted"
            >
              <span className="text-accent">{"</>"}</span>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <Reveal>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">บริการของผม</h2>
            <p className="mt-2 text-muted">ครอบคลุมงานพัฒนาซอฟต์แวร์ทุกประเภท</p>
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
        <div className="mx-auto max-w-6xl px-4 py-20">
          <Reveal>
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold">ผลงานตัวอย่าง</h2>
              <p className="mt-2 text-muted">ตัวอย่างโปรเจกต์ที่ผมทำจริง</p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <ProjectSlideshow projects={slideshowProjects} />
          </Reveal>
          <Reveal>
            <div className="mt-8 text-center">
              <Link href="/portfolio" className="btn-ghost">
                ดูผลงานทั้งหมด
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <Reveal>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">ตัวอย่างงานออกแบบ</h2>
            <p className="mt-2 text-muted">แบนเนอร์ สื่อโฆษณา และงานออกแบบต่างๆ</p>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <Gallery />
        </Reveal>
      </section>

      {/* Blog preview */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <Reveal>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">บทความล่าสุด</h2>
            <p className="mt-2 text-muted">ความรู้และคำแนะนำจากประสบการณ์จริง</p>
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
