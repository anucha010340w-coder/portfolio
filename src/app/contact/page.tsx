import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { FacebookIcon, LineIcon, GitHubIcon } from "@/components/BrandIcons";
import Reveal from "@/components/Reveal";
import TypeReveal from "@/components/TypeReveal";
import { BreadcrumbSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "ติดต่อ",
  description: `ติดต่อ ${siteConfig.name} — โทร อีเมล LINE Facebook และ GitHub ปรึกษาฟรี ไม่มีค่าใช้จ่าย`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const channels = [
    {
      icon: "Phone",
      label: "โทรศัพท์",
      value: siteConfig.phoneDisplay,
      href: `tel:${siteConfig.phone}`,
      note: "เวลาทำการ 9.00 - 21.00 น.",
    },
    {
      icon: "Mail",
      label: "อีเมล",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      note: "ตอบกลับภายใน 24 ชม.",
    },
    {
      icon: "LineIcon",
      label: "LINE",
      value: siteConfig.lineId,
      href: `https://line.me/ti/p/~${siteConfig.lineId}`,
      note: "แสกน QR หรือเพิ่มเพื่อนด้วย ID",
    },
    {
      icon: "FacebookIcon",
      label: "Facebook",
      value: "Facebook Profile",
      href: siteConfig.facebook,
      note: "ทัก inbox ได้ตลอด",
    },
    {
      icon: "GitHubIcon",
      label: "GitHub",
      value: "anucha212224w-coder",
      href: siteConfig.github,
      note: "ดูโค้ดและผลงานตัวอย่าง",
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={[{ name: "หน้าแรก", path: "/" }, { name: "ติดต่อ", path: "/contact" }]} />
      <section className="relative overflow-hidden">
        <div className="bg-hologram absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4 py-28">
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl"><TypeReveal text="ติดต่อผม" /></h1>
          <p className="mt-4 text-xl text-muted">
            <TypeReveal text="มีไอเดียหรือโปรเจกต์ในใจ? ทักมาคุยก่อนเลย ปรึกษาฟรี ไม่มีค่าใช้จ่าย" speed={30} />
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Channels */}
          <div className="space-y-4">
            <Reveal>
              <h2 className="text-2xl font-bold"><TypeReveal text="ช่องทางติดต่อ" /></h2>
            </Reveal>
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={i * 100}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="card card-hover flex items-center gap-4 p-5"
                >
                <span className="text-accent">
                  {(() => {
                    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                      Phone, Mail, LineIcon, FacebookIcon, GitHubIcon,
                    };
                    const Icon = iconMap[c.icon] ?? Mail;
                    return <Icon className="h-7 w-7" />;
                  })()}
                </span>
                <div className="flex-1">
                  <p className="text-sm text-muted">{c.label}</p>
                  <p className="font-semibold">{c.value}</p>
                  <p className="mt-0.5 text-xs text-muted">{c.note}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-accent" />
              </a>
              </Reveal>
            ))}
          </div>

          {/* LINE QR placeholder */}
          <div className="space-y-4">
            <Reveal>
              <h2 className="text-2xl font-bold"><TypeReveal text="แสกน LINE QR" /></h2>
            </Reveal>
            <Reveal delay={200}>
            <div className="card flex flex-col items-center justify-center p-8">
              <Image
                src="/line-qr.jpg"
                alt="LINE QR Code"
                width={256}
                height={256}
                className="rounded-xl"
                priority
              />
              <p className="mt-4 text-sm text-muted">
                LINE ID: <span className="font-mono text-foreground">{siteConfig.lineId}</span>
              </p>
              <a
                href={`https://line.me/ti/p/~${siteConfig.lineId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-4 text-sm"
              >
                เพิ่มเพื่อน LINE
              </a>
            </div>
            </Reveal>
          </div>
        </div>

        {/* Quick form (mailto) */}
        <div className="mt-12">
          <Reveal>
            <h2 className="text-2xl font-bold"><TypeReveal text="ส่งคำถามด่วน" /></h2>
          </Reveal>
          <Reveal delay={200}>
          <form
            className="card mt-6 grid gap-4 p-6 md:grid-cols-2"
            action={`mailto:${siteConfig.email}`}
            method="post"
            encType="text/plain"
          >
            <label className="md:col-span-1">
              <span className="text-sm text-muted">ชื่อ</span>
              <input
                name="name"
                required
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-accent"
                placeholder="ชื่อของคุณ"
              />
            </label>
            <label className="md:col-span-1">
              <span className="text-sm text-muted">ติดต่อกลับ (อีเมล/เบอร์/LINE)</span>
              <input
                name="contact"
                required
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-accent"
                placeholder="ติดต่อกลับได้ทางไหน"
              />
            </label>
            <label className="md:col-span-2">
              <span className="text-sm text-muted">รายละเอียดงาน</span>
              <textarea
                name="message"
                required
                rows={5}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-accent"
                placeholder="อยากทำเว็บ/แอพ/ระบบอะไร งบประมาณเท่าไหร่ ระยะเวลา เป้าหมาย..."
              />
            </label>
            <button type="submit" className="btn-primary md:col-span-2">
              ส่งคำถาม
            </button>
          </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
