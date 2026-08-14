import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import ContactCTA from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "เกี่ยวกับผม",
  description: `รู้จัก ${siteConfig.name} (${siteConfig.nameEn}) — ${siteConfig.role} ผู้รับทำเว็บ แอพ และระบบตามสั่ง`,
  alternates: { canonical: "/about" },
};

const skills = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue"] },
  { group: "Backend", items: ["Node.js", "Express", "NestJS", "PostgreSQL", "MongoDB", "Prisma"] },
  { group: "Mobile", items: ["React Native", "Flutter", "PWA"] },
  { group: "DevOps & Tools", items: ["Docker", "Vercel", "GitHub Actions", "Linux", "Nginx"] },
  { group: "อื่นๆ", items: ["SEO", "POS Hardware", "LINE API", "Payment Gateway", "CMS"] },
];

const timeline = [
  {
    year: "2562 (2019)",
    title: "เริ่มต้นเป็น Developer",
    desc: "เริ่มเขียนโปรแกรมจริงจัง ทำเว็บและระบบเล็กๆ ให้ผู้รู้จัก",
  },
  {
    year: "2564 (2021)",
    title: "รับงาน freelance เต็มตัว",
    desc: "รับทำเว็บไซต์ธุรกิจ เว็บแอพ และระบบ POS ให้ร้านค้าและบริษัท",
  },
  {
    year: "2566 (2023)",
    title: "ขยายไปแอพมือถือ",
    desc: "เริ่มทำแอพมือถือด้วย React Native ให้ลูกค้าที่ต้องการแอปคู่กับเว็บ",
  },
  {
    year: "2568 (2025)",
    title: "มุ่งเน้นระบบและ SEO",
    desc: "เน้นคุณภาพระบบและทำ SEO ให้เว็บลูกค้าติดอันดับ Google ได้จริง",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-grid relative">
        <div className="bg-glow absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4 py-20">
          <h1 className="text-4xl font-bold md:text-5xl">
            สวัสดีครับ ผม <span className="text-gradient">{siteConfig.name}</span>
          </h1>
          <p className="mt-4 text-lg text-muted">
            {siteConfig.role} จากประเทศไทย รับทำเว็บ แอพ และระบบตามสั่งมากว่า 5 ปี
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="prose-thai">
          <h2>เกี่ยวกับผม</h2>
          <p>
            ผมชื่อ <strong>{siteConfig.name}</strong> หรือภาษาอังกฤษว่า <strong>{siteConfig.nameEn}</strong>
            เป็น Full-Stack Developer รับทำเว็บแอพ เว็บไซต์ธุรกิจ แอพมือถือ ระบบ POS
            และระบบตามสั่ง มาตลอดกว่า 5 ปี ผมเชื่อว่าซอฟต์แวร์ที่ดีต้อง <em>ใช้งานได้จริง แก้ปัญหาธุรกิจได้จริง</em>
            ไม่ใช่แค่สวยในสายตา
          </p>
          <p>
            ผมทำงานกับลูกค้าตั้งแต่ร้านค้าเล็กๆ ที่ต้องการเว็บนำเสนอ ไปจนถึงบริษัทที่ต้องการระบบจัดการซับซ้อน
            ทุกงานผมเริ่มจากการฟัง วิเคราะห์ปัญหา แล้วเสนอทางออกที่คุ้มค่าที่สุด ไม่ใช่ขายของ
          </p>

          <h2>หลักการทำงานของผม</h2>
          <ul>
            <li><strong>ตรงปัญหา:</strong> ทำสิ่งที่จำเป็นจริง ไม่ทำฟีเจอร์ที่ไม่จำเป็นเพื่อเพิ่มงบ</li>
            <li><strong>ใช้งานได้จริง:</strong> เน้นความเสถียรและประสบการณ์ผู้ใช้ ไม่ใช่แค่หน้าตา</li>
            <li><strong>ดูแลระยะยาว:</strong> ส่งมอบแล้วยังอยู่กับลูกค้า ปรับปรุงและแก้ปัญหาต่อได้</li>
            <li><strong>สื่อสารตรงไปตรงมา:</strong> บอกได้ทั้งข้อดีและข้อจำกัด ไม่พูดเกินจริง</li>
          </ul>
        </div>
      </section>

      {/* Skills */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h2 className="text-2xl font-bold">ทักษะและเทคโนโลยี</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {skills.map((s) => (
              <div key={s.group} className="card p-5">
                <h3 className="font-semibold text-accent">{s.group}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.items.map((i) => (
                    <span key={i} className="rounded-full border border-border bg-background px-3 py-1 text-sm">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-2xl font-bold">เส้นทางของผม</h2>
        <div className="mt-8 space-y-6">
          {timeline.map((t) => (
            <div key={t.year} className="card flex flex-col gap-2 p-5 md:flex-row md:items-start md:gap-6">
              <div className="w-full md:w-40 shrink-0 font-mono text-sm text-accent">{t.year}</div>
              <div>
                <h3 className="font-semibold">{t.title}</h3>
                <p className="mt-1 text-sm text-muted">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
