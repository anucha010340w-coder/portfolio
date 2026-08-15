import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.role}`,
    short_name: "AW Dev",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#06070a",
    theme_color: "#06070a",
    lang: "th",
    icons: [
      {
        src: "/favicon_io/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/favicon_io/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon_io/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
