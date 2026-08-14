import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import ContactCTA from "@/components/ContactCTA";

type Props = PageProps<"/blog/[slug]">;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "ไม่พบบทความ" };

  const url = `${siteConfig.url}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      authors: [siteConfig.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    keywords: post.tags,
  };
}

export default async function BlogPostPage(props: Props) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16">
        <Link href="/blog" className="text-sm text-muted hover:text-foreground">
          ← กลับไปยังบทความทั้งหมด
        </Link>

        <header className="mt-6">
          <span className="text-xs text-accent">{post.category}</span>
          <h1 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">{post.title}</h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-muted">
            <span>{siteConfig.name}</span>
            <span>·</span>
            <time>
              {new Date(post.date).toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                #{t}
              </span>
            ))}
          </div>
        </header>

        <div
          className="prose-thai mt-10"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </article>

      {related.length > 0 && (
        <section className="border-t border-border">
          <div className="mx-auto max-w-3xl px-4 py-12">
            <h2 className="text-xl font-bold">บทความที่เกี่ยวข้อง</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="card card-hover p-5">
                  <span className="text-xs text-accent">{p.category}</span>
                  <h3 className="mt-2 line-clamp-2 font-semibold">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{p.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCTA />
    </>
  );
}
