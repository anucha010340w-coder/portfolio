import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ไม่พบหน้าที่คุณตามหา",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-hologram absolute inset-0" />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center px-4 py-32 text-center">
        <p className="font-mono text-6xl text-gradient">404</p>
        <h1 className="mt-4 text-2xl font-bold">ไม่พบหน้าที่คุณตามหา</h1>
        <p className="mt-3 text-muted">
          หน้านี้อาจถูกย้าย ลบ หรือไม่เคยมีอยู่ ลองกลับหน้าแรก หรือดูบทความน่าสนใจแทน
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/" className="btn-primary">กลับหน้าแรก</Link>
          <Link href="/blog" className="btn-ghost">ดูบทความ</Link>
        </div>
      </div>
    </section>
  );
}
