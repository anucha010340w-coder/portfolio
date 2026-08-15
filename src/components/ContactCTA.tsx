"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import TypeReveal from "@/components/TypeReveal";

export default function ContactCTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <Reveal>
        <div className="card bg-glow relative overflow-hidden p-10 text-center md:p-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            <TypeReveal text="พร้อมเริ่มโปรเจกต์แล้วหรือยัง?" />
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            <TypeReveal text="บอกไอเดียหรือความต้องการมาเลย ผมจะวางแผนและเสนอทางออกที่คุ้มค่าที่สุดให้ ปรึกษาฟรี ไม่มีค่าใช้จ่าย" speed={25} />
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary">
              ติดต่อจ้างงาน
            </Link>
            <Link href="/portfolio" className="btn-ghost">
              ดูผลงานก่อน
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
