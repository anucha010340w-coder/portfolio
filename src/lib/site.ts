// ข้อมูลหลักของเว็บไซต์ — เปลี่ยนค่าตรงนี้เพื่ออัปเดตทั้งเว็บ
export const siteConfig = {
  name: "อนุชา วังราช",
  nameEn: "Anucha Wangrat",
  role: "Full-Stack Developer",
  roleTh: "นักพัฒนาเว็บและซอฟต์แวร์",
  tagline: "สร้างเว็บแอพ เว็บธุรกิจ แอพมือถือ ระบบ POS และระบบตามสั่ง",
  description:
    "อนุชา วังราช — Full-Stack Developer รับทำเว็บแอพ เว็บไซต์ธุรกิจ แอพมือถือ ระบบ POS และระบบตามสั่ง พร้อมให้คำปรึกษาและดูแลหลังการขาย",
  // ใส่โดเมนจริงเมื่อพร้อม (ตอนนี้ใช้ placeholder)
  url: "https://anucha-dev.vercel.app",
  email: "anucha.wangrat@outlook.com",
  phone: "0612373304",
  phoneDisplay: "061-237-3304",
  lineId: "anucha1997w",
  facebook: "https://web.facebook.com/profile.php?id=61592582261777",
  github: "https://github.com/anucha212224w-coder",
  keywords: [
    "รับทำเว็บไซต์",
    "รับเขียนโปรแกรม",
    "Full-Stack Developer",
    "นักพัฒนาเว็บ",
    "ระบบ POS",
    "เว็บแอพ",
    "แอพมือถือ",
    "Anucha Wangrat",
    "อนุชา วังราช",
    "รับทำเว็บธุรกิจ",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
