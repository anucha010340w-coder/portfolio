import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/portfolio`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/demo`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/demo/pos`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/demo/ecommerce`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/demo/booking`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/demo/company`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/demo/inventory`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/demo/delivery`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];

  const postPages: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...postPages];
}
