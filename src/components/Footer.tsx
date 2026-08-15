import Link from "next/link";
import { Phone, Mail, Code } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { FacebookIcon, LineIcon, GitHubIcon } from "@/components/BrandIcons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-gradient text-xl font-bold">AW Dev</p>
          <p className="mt-1 text-sm text-muted">{siteConfig.tagline}</p>
          <p className="mt-4 max-w-md text-sm text-muted">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <p className="mb-3 font-semibold">เมนู</p>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/" className="hover:text-foreground">หน้าแรก</Link></li>
            <li><Link href="/about" className="hover:text-foreground">เกี่ยวกับ</Link></li>
            <li><Link href="/services" className="hover:text-foreground">บริการ</Link></li>
            <li><Link href="/portfolio" className="hover:text-foreground">ผลงาน</Link></li>
            <li><Link href="/demo" className="hover:text-foreground">ทดลองใช้งาน</Link></li>
            <li><Link href="/blog" className="hover:text-foreground">บทความ</Link></li>
            <li><Link href="/contact" className="hover:text-foreground">ติดต่อ</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-3 font-semibold">ติดต่อ</p>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 hover:text-foreground">
                <Phone className="h-4 w-4 text-accent" /> {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-foreground">
                <Mail className="h-4 w-4 text-accent" /> {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={`https://line.me/ti/p/~${siteConfig.lineId}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground">
                <LineIcon className="h-4 w-4 text-accent" /> LINE: {siteConfig.lineId}
              </a>
            </li>
            <li>
              <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground">
                <FacebookIcon className="h-4 w-4 text-accent" /> Facebook
              </a>
            </li>
            <li>
              <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground">
                <GitHubIcon className="h-4 w-4 text-accent" /> GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-4 py-6 text-center text-xs text-muted">
        © {year} AW Dev. สงวนลิขสิทธิ์.
      </div>
    </footer>
  );
}
