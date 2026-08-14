import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "บทความ",
  description: `บทความและความรู้จาก ${siteConfig.name} เกี่ยวกับการทำเว็บ ซอฟต์แวร์ SEO และธุรกิจดิจิทัล`,
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="bg-grid relative">
        <div className="bg-glow absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4 py-20">
          <h1 className="text-4xl font-bold md:text-5xl">บทความ</h1>
          <p className="mt-4 text-lg text-muted">
            ความรู้และคำแนะนำจากประสบการณ์จริง เกี่ยวกับเว็บ ซอฟต์แวร์ SEO และธุรกิจดิจิทัล
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
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
          ))}
        </div>
      </section>
    </>
  );
}
