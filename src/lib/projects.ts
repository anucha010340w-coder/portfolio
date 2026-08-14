export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  highlights: string[];
  image: string;
};

export const projects: Project[] = [
  {
    slug: "pos-restaurant",
    title: "ระบบ POS ร้านอาหาร",
    category: "POS System",
    description:
      "ระบบจุดขายสำหรับร้านอาหาร รองรับการสั่งจากโต๊ะ ครัว และบาร์ พิมพ์ใบเสร็จและใบสั่งอาหารแยกส่วน พร้อมรายงานยอดขายรายวัน",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Hardware"],
    highlights: [
      "รองรับหลายโต๊ะและแยกครัว/บาร์",
      "พิมพ์ใบเสร็จและใบสั่งอัตโนมัติ",
      "รายงานยอดขาย กำไร สต็อกวัตถุดิบ",
    ],
    image: "/projects/pos-restaurant.svg",
  },
  {
    slug: "ecommerce-website",
    title: "เว็บขายของออนไลน์",
    category: "E-Commerce",
    description:
      "เว็บไซต์ขายสินค้าออนไลน์ พร้อมระบบตะกร้า ชำระเงิน จัดการสินค้าและสต็อก และติดตามคำสั่งซื้อ รองรับการเติบโตของร้านค้า",
    tags: ["Next.js", "Stripe", "Tailwind", "CMS"],
    highlights: [
      "ระบบตะกร้าและชำระเงินออนไลน์",
      "จัดการสินค้า หมวดหมู่ สต็อก",
      "ติดตามคำสั่งซื้อและสถานะการจัดส่ง",
    ],
    image: "/projects/ecommerce-website.svg",
  },
  {
    slug: "booking-system",
    title: "ระบบจองคิวออนไลน์",
    category: "Custom System",
    description:
      "ระบบจองคิวออนไลน์สำหรับคลินิกและร้านบริการ ลูกค้าจองเองผ่านเว็บ พนักงานจัดการคิวและแจ้งเตือนอัตโนมัติผ่าน LINE",
    tags: ["Next.js", "LINE API", "PostgreSQL"],
    highlights: [
      "จองคิวเองผ่านเว็บ 24 ชม.",
      "แจ้งเตือนผ่าน LINE Notify",
      "จัดการคิวและเลื่อนนัดได้",
    ],
    image: "/projects/booking-system.svg",
  },
  {
    slug: "company-website",
    title: "เว็บไซต์บริษัท",
    category: "Business Website",
    description:
      "เว็บไซต์นำเสนอบริษัท ดีไซน์สวย โหลดเร็ว ติดอันดับ Google พร้อมระบบจัดการเนื้อหาที่แก้ไขเองได้โดยไม่ต้องเขียนโค้ด",
    tags: ["Next.js", "SEO", "CMS", "Tailwind"],
    highlights: [
      "ติดอันดับ Google ด้วย SEO ครบทุกด้าน",
      "แก้ไขเนื้อหาเองผ่าน CMS",
      "โหลดเร็ว ได้คะแนน Lighthouse สูง",
    ],
    image: "/projects/company-website.svg",
  },
  {
    slug: "mobile-delivery",
    title: "แอพจัดส่งสินค้า",
    category: "Mobile App",
    description:
      "แอพมือถือสำหรับพนักงานจัดส่ง รับงาน นำทาง อัปเดตสถานะ และเก็บหลักฐานการส่ง ทำงานได้ทั้ง iOS และ Android",
    tags: ["React Native", "Maps", "Push Notification"],
    highlights: [
      "รับงานและนำทางในแอพเดียว",
      "อัปเดตสถานะและเก็บรูปหลักฐาน",
      "แจ้งเตือนเมื่อมีงานใหม่",
    ],
    image: "/projects/mobile-delivery.svg",
  },
  {
    slug: "inventory-system",
    title: "ระบบจัดการคลังสินค้า",
    category: "Custom System",
    description:
      "ระบบจัดการคลังสินค้าและสต็อก ตรวจนับสินค้าด้วยบาร์โค้ด รับเข้า-ส่งออก พร้อมรายงานสต็อกและการเคลื่อนไหวสินค้า",
    tags: ["Next.js", "Barcode", "PostgreSQL"],
    highlights: [
      "ตรวจนับสินค้าด้วยบาร์โค้ด",
      "รับเข้า-ส่งออกพร้อมใบเสร็จ",
      "รายงานสต็อกและสินค้าใกล้หมด",
    ],
    image: "/projects/inventory-system.svg",
  },
];
