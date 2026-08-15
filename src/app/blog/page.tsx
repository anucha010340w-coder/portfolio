import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import Reveal from "@/components/Reveal";
import TypeReveal from "@/components/TypeReveal";
import { BreadcrumbSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "บทความ",
  description: `บทความและความรู้จาก ${siteConfig.name} เกี่ยวกับการทำเว็บ ซอฟต์แวร์ SEO และธุรกิจดิจิทัล`,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: `บทความ | ${siteConfig.name}`,
    description: `บทความและความรู้จาก ${siteConfig.name} เกี่ยวกับการทำเว็บ ซอฟต์แวร์ SEO และธุรกิจดิจิทัล`,
    url: `${siteConfig.url}/blog`,
  },
  twitter: {
    card: "summary_large_image",
    title: `บทความ | ${siteConfig.name}`,
    description: `บทความและความรู้จาก ${siteConfig.name} เกี่ยวกับการทำเว็บ ซอฟต์แวร์ SEO และธุรกิจดิจิทัล`,
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <BreadcrumbSchema items={[{ name: "หน้าแรก", path: "/" }, { name: "บทความ", path: "/blog" }]} />
      <section className="relative overflow-hidden">
        <div className="bg-hologram absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4 py-28">
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl"><TypeReveal text="บทความ" /></h1>
          <p className="mt-4 text-xl text-muted">
            <TypeReveal text="ความรู้และคำแนะนำจากประสบการณ์จริง เกี่ยวกับเว็บ ซอฟต์แวร์ SEO และธุรกิจดิจิทัล" speed={30} />
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 100}>
            <Link
              href={`/blog/${post.slug}`}
              className="card card-hover flex flex-col p-6"
            >
              <span className="text-xs text-accent">{post.category}</span>
              <h2 className="mt-2 line-clamp-3 text-lg font-semibold">{post.title}</h2>
              <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">{post.description}</p>
              <div className="mt-4 flex flex-wrap gap-1">
                {post.tags.slice(0, 3).map((t) => (
                  <span key={t} className="rounded bg-background px-2 py-0.5 text-xs text-muted">
                    #{t}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3 text-xs text-muted">
                <time>
                  {new Date(post.date).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
            </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
