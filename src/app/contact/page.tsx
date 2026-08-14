import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Mail, MessageCircle, Share2, Code, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

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
      icon: "MessageCircle",
      label: "LINE",
      value: siteConfig.lineId,
      href: `https://line.me/ti/p/~${siteConfig.lineId}`,
      note: "แสกน QR หรือเพิ่มเพื่อนด้วย ID",
    },
    {
      icon: "Share2",
      label: "Facebook",
      value: "Facebook Profile",
      href: siteConfig.facebook,
      note: "ทัก inbox ได้ตลอด",
    },
    {
      icon: "Code",
      label: "GitHub",
      value: "anucha212224w-coder",
      href: siteConfig.github,
      note: "ดูโค้ดและผลงานตัวอย่าง",
    },
  ];

  return (
    <>
      <section className="bg-grid relative">
        <div className="bg-glow absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4 py-20">
          <h1 className="text-4xl font-bold md:text-5xl">ติดต่อผม</h1>
          <p className="mt-4 text-lg text-muted">
            มีไอเดียหรือโปรเจกต์ในใจ? ทักมาคุยก่อนเลย ปรึกษาฟรี ไม่มีค่าใช้จ่าย
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Channels */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">ช่องทางติดต่อ</h2>
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="card card-hover flex items-center gap-4 p-5"
              >
                <span className="text-accent">
                  {(() => {
                    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                      Phone, Mail, MessageCircle, Share2, Code,
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
            ))}
          </div>

          {/* LINE QR placeholder */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">แสกน LINE QR</h2>
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
          </div>
        </div>

        {/* Quick form (mailto) */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold">ส่งคำถามด่วน</h2>
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
        </div>
      </section>
    </>
  );
}
