"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const galleryImages = [
  {
    src: "/gallery/ChatGPT Image 13 ส.ค. 2569 22_24_33.webp",
    title: "รับทำเว็บไซต์ธุรกิจ",
    desc: "โปรโมชันเว็บไซต์ธุรกิจ เริ่มต้น 5,000 บาท ครอบคลุมโรงแรม โรงเรียน โรงงาน ร้านค้า รวมถึง SEO Friendly และแก้งานให้ตามต้องการ",
  },
  {
    src: "/gallery/ChatGPT Image 29 เม.ย. 2569 00_55_07.webp",
    title: "ระบบ POS ร้านอาหาร",
    desc: "POS System สำหรับร้านอาหาร ขายเร็ว คิดไว รองรับทุกอุปกรณ์ เชื่อมต่อเครื่องพิมพ์ใบเสร็จ จัดการออเดอร์ รายงานยอดขาย และสต็อกสินค้า",
  },
  {
    src: "/gallery/photo_6307357373844099601_y.webp",
    title: "POS · WMS · ERP Developer",
    desc: "ระบบเชื่อมวงครบวงจร ครอบคลุมทุกธุรกิจ ไม่ว่าจะเป็นร้านค้า คลังสินค้า หรือออฟฟิศ ด้วย Cloud Solution, Responsive Design, Secure & Reliable",
  },
  {
    src: "/gallery/photo_6307357373844099602_w.webp",
    title: "ERP SYSTEM",
    desc: "เชื่อมต่อทุกแผนก ข้อมูลครบ จบในระบบเดียว ช่วยลดต้นทุน เพิ่มประสิทธิภาพองค์กร ทำงานง่าย ลดข้อผิดพลาด และวิเคราะห์แผนงานได้ถึงตัว",
  },
  {
    src: "/gallery/photo_6307357373844099603_w.webp",
    title: "POS · WMS · ERP ครบวงจร",
    desc: "พัฒนาระบบให้ธุรกิจคุณ ครบจบในทีเดียว รองรับทุกแพลตฟอร์ม ไม่ว่าจะเป็นเดสก์ทอป แท็บเล็ต หรือมือถือ พร้อมอัปเดต Real-time",
  },
  {
    src: "/gallery/photo_6307357373844099605_w.webp",
    title: "ระบบหน้าร้าน POS",
    desc: "POS System หน้าร้านใช้งานง่าย ขายคล่อง รองรับหลายช่องทางการชำระเงิน เช็คสต็อกได้แบบเรียลไทม์ รายงานยอดขายครบถ้วน พร้อมโปรโมชันและส่วนลด",
  },
  {
    src: "/gallery/photo_6307357373844099606_w.webp",
    title: "ระบบคลังสินค้า WMS",
    desc: "WMS System จัดการคลังสินค้าง่ายขึ้น แม่นยำขึ้น รับเข้า จัดเก็บ เบิกจ่าย จัดส่ง รองรับ Barcode / QR Code ทำงานครบ จบในระบบเดียว",
  },
  {
    src: "/gallery/photo_6307357373844099607_w.webp",
    title: "POS · WMS · ERP พัฒนาให้ธุรกิจคุณ",
    desc: "พัฒนาระบบเต็มรูปแบบ ครอบคลุมร้านอาหาร คลังสินค้า และออฟฟิศ/องค์กร ด้วย UX ที่ใช้งานง่าย ปลอดภัย และรองรับการใช้งานทั้ง Cloud และ On-Premise",
  },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const next = useCallback(() => {
    setLightbox((v) => (v === null ? v : (v + 1) % galleryImages.length));
  }, []);

  const prev = useCallback(() => {
    setLightbox((v) => (v === null ? v : (v - 1 + galleryImages.length) % galleryImages.length));
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, next, prev]);

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        {galleryImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i)}
            className="card group overflow-hidden p-0 text-left transition-all hover:border-accent"
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
            </div>
            <div className="p-4">
              <p className="font-semibold text-foreground">{img.title}</p>
              <p className="mt-1 line-clamp-2 text-sm text-muted">{img.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full border border-border bg-card/80 p-2 backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
            onClick={() => setLightbox(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <button
            aria-label="Previous"
            className="absolute left-4 rounded-full border border-border bg-card/80 p-2 backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="relative max-h-[80vh] max-w-2xl px-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].title}
              width={1200}
              height={1200}
              className="max-h-[80vh] w-auto rounded-xl object-contain"
            />
            <div className="mx-auto mt-3 max-w-md rounded-lg border border-border bg-card/90 p-3 text-center backdrop-blur-md">
              <p className="font-semibold text-foreground">{galleryImages[lightbox].title}</p>
              <p className="mt-1 text-sm text-muted">{galleryImages[lightbox].desc}</p>
            </div>
          </div>
          <button
            aria-label="Next"
            className="absolute right-4 rounded-full border border-border bg-card/80 p-2 backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-muted">
            {lightbox + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </>
  );
}
