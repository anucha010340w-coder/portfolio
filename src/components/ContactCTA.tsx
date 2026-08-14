import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="card bg-glow relative overflow-hidden p-8 text-center md:p-12">
        <h2 className="text-2xl font-bold md:text-3xl">
          พร้อมเริ่มโปรเจกต์แล้วหรือยัง?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          บอกไอเดียหรือความต้องการมาเลย ผมจะวางแผนและเสนอทางออกที่คุ้มค่าที่สุดให้ ปรึกษาฟรี ไม่มีค่าใช้จ่าย
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-primary">
            ติดต่อจ้างงาน
          </Link>
          <Link href="/portfolio" className="btn-ghost">
            ดูผลงานก่อน
          </Link>
        </div>
      </div>
    </section>
  );
}
