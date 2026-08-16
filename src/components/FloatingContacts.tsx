"use client";

import { Phone, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { FacebookIcon, LineIcon } from "@/components/BrandIcons";

const contacts = [
  { icon: Phone, href: `tel:${siteConfig.phone}`, label: "โทร", color: "bg-green-600" },
  { icon: Mail, href: `mailto:${siteConfig.email}`, label: "อีเมล", color: "bg-blue-600" },
  { icon: LineIcon, href: `https://line.me/ti/p/~${siteConfig.lineId}`, label: "LINE", color: "bg-[#06C755]" },
  { icon: FacebookIcon, href: siteConfig.facebook, label: "Facebook", color: "bg-[#1877F2]" },
  { icon: FacebookIcon, href: siteConfig.facebookPage, label: "Facebook Page", color: "bg-[#1877F2]" },
];

export default function FloatingContacts() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {contacts.map((c) => {
        const Icon = c.icon;
        return (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            aria-label={c.label}
            className={`flex h-11 w-11 items-center justify-center rounded-full ${c.color} text-white shadow-lg transition-all hover:scale-110`}
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}
