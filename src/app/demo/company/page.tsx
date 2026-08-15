"use client";

import { useState } from "react";
import {
  Building2, Phone, Mail, MapPin, ArrowRight, CheckCircle,
  TrendingUp, Users, Award, Clock, Menu, X, Star,
} from "lucide-react";

const services = [
  { icon: TrendingUp, title: "ที่ปรึกษาธุรกิจ", desc: "วางแผนกลยุทธ์และให้คำปรึกษาโดยผู้เชี่ยวชาญที่มีประสบการณ์" },
  { icon: Award, title: "วิเคราะห์ข้อมูล", desc: "วิเคราะห์และรายงานเชิงลึกเพื่อตัดสินใจอย่างมั่นใจ" },
  { icon: CheckCircle, title: "ดำเนินงาน", desc: "ลงมือทำและดูแลตลอดจนจบ พร้อมรายงานผลทุกขั้นตอน" },
];

const stats = [
  { value: "500+", label: "ลูกค้า", icon: Users },
  { value: "15", label: "ปีประสบการณ์", icon: Award },
  { value: "98%", label: "ลูกค้าพอใจ", icon: CheckCircle },
  { value: "24/7", label: "ดูแลตลอด", icon: Clock },
];

const team = [
  { name: "คุณสมชาย", role: "CEO & Founder", initials: "สม" },
  { name: "คุณมาลี", role: "COO", initials: "มล" },
  { name: "คุณวิภา", role: "CTO", initials: "วภ" },
  { name: "คุณกิตติ", role: "Head of Sales", initials: "กต" },
];

const testimonials = [
  { name: "บริษัท ABC จำกัด", text: "บริการดีเยี่ยม ทีมงานเป็นมืออาชีพ ได้ผลลัพธ์เกินคาด", rating: 5 },
  { name: "ห้างหุ้นส่วน XYZ", text: "วางแผนรอบคอบ ดำเนินงานรวดเร็ว ประทับใจมาก", rating: 5 },
  { name: "บริษัท QRS", text: "แนะนำได้เลย มีคำปรึกษาที่ใช้ได้จริง", rating: 4 },
];

export default function CompanyPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formSent, setFormSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const scrollTo = (section: string) => {
    setActiveSection(section);
    setMenuOpen(false);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setFormSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-[53px] z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">AW Company</h1>
              <p className="text-xs text-slate-500">บริษัทที่ปรึกษาธุรกิจ</p>
            </div>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            {[
              { id: "home", label: "หน้าแรก" },
              { id: "about", label: "เกี่ยวกับ" },
              { id: "services", label: "บริการ" },
              { id: "team", label: "ทีมงาน" },
              { id: "contact", label: "ติดต่อ" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={"text-sm font-medium transition-colors " + (activeSection === item.id ? "text-slate-900" : "text-slate-600 hover:text-slate-900") + ""}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTo("contact")}
            className="hidden rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white md:block hover:bg-slate-800"
          >
            ติดต่อเรา
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-slate-600 md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-slate-200 md:hidden">
            {[
              { id: "home", label: "หน้าแรก" },
              { id: "about", label: "เกี่ยวกับ" },
              { id: "services", label: "บริการ" },
              { id: "team", label: "ทีมงาน" },
              { id: "contact", label: "ติดต่อ" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full px-4 py-3 text-left text-sm text-slate-600 hover:bg-slate-50"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden bg-slate-50 py-20 scroll-mt-[106px] md:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="inline-flex items-center rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700">
                15 ปีประสบการณ์
              </span>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">
                เพื่อนคู่คิด<br />
                <span className="text-slate-500">
                  ธุรกิจของคุณ
                </span>
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                เราให้บริการครบวงจร ตั้งแต่วางแผน วิเคราะห์ จนถึงดำเนินงาน
                พร้อมทีมงานมืออาชีพที่พร้อมดูแลคุณตลอด 24 ชั่วโมง
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => scrollTo("services")}
                  className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-slate-800"
                >
                  ดูบริการ
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400"
                >
                  ติดต่อเรา
                </button>
              </div>
            </div>
            <div className="mt-8 md:mt-0">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-lg md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold text-slate-800">รายงานประจำเดือน</h3>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">+12%</span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "รายได้รวม", value: "฿12.5M", pct: 85 },
                    { label: "ลูกค้าใหม่", value: "348", pct: 65 },
                    { label: "โครงการสำเร็จ", value: "92%", pct: 92 },
                    { label: "ความพอใจ", value: "4.9/5", pct: 98 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">{item.label}</span>
                        <span className="font-semibold text-slate-800">{item.value}</span>
                      </div>
                      <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-slate-900 transition-all duration-1000"
                          style={{ width: item.pct + "%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                    <Icon className="h-6 w-6 text-slate-700" />
                  </div>
                  <div className="text-3xl font-bold text-slate-800">{s.value}</div>
                  <div className="text-sm text-slate-500">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 scroll-mt-[106px]">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-800">เกี่ยวกับเรา</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            บริษัทของเราก่อตั้งขึ้นเมื่อปี 2553 ด้วยความมุ่งมั่นที่จะเป็นพันธมิตรทางธุรกิจ
            ที่ลูกค้าไว้วางใจ เรามีทีมงานมืออาชีพกว่า 50 คน พร้อมให้บริการที่ปรึกษา
            วิเคราะห์ข้อมูล และดำเนินงานครบวงจร
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { title: "วิสัยทัศน์", desc: "เป็นผู้นำด้านการให้บริการที่ปรึกษาธุรกิจในประเทศไทย" },
              { title: "พันธกิจ", desc: "มอบ solutions ที่ใช้ได้จริง สร้างผลลัพธ์ที่วัดได้" },
              { title: "ค่านิยม", desc: "ซื่อสัตย์ มืออาชีพ สร้างสรรค์ และใส่ใจลูกค้า" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-6 text-left">
                <h3 className="font-bold text-slate-800">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-slate-50 py-20 scroll-mt-[106px]">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800">บริการของเรา</h2>
            <p className="mt-2 text-slate-600">ครบวงจร ตั้งแต่วางแผนจนถึงดำเนินงาน</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:shadow-lg"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100">
                    <Icon className="h-7 w-7 text-slate-700" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="mt-4 flex items-center gap-1 text-sm font-semibold text-slate-900 group-hover:gap-2 transition-all"
                  >
                    เรียนรู้เพิ่มเติม <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 scroll-mt-[106px]">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800">ทีมงาน</h2>
            <p className="mt-2 text-slate-600">มืออาชีพที่พร้อมดูแลคุณ</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 text-xl font-bold text-white">
                  {member.initials}
                </div>
                <h3 className="font-bold text-slate-800">{member.name}</h3>
                <p className="text-sm text-slate-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800">รีวิวจากลูกค้า</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="mb-3 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={i < t.rating ? "h-4 w-4 text-amber-400" : "h-4 w-4 text-slate-200"}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-600">&ldquo;{t.text}&rdquo;</p>
                <p className="mt-4 font-semibold text-slate-800">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 scroll-mt-[106px]">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800">ติดต่อเรา</h2>
            <p className="mt-2 text-slate-600">พร้อมให้คำปรึกษาฟรี โทรหรืออีเมลได้เลย</p>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                  <Phone className="h-5 w-5 text-slate-700" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">โทรศัพท์</p>
                  <p className="font-semibold text-slate-800">02-123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                  <Mail className="h-5 w-5 text-slate-700" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">อีเมล</p>
                  <p className="font-semibold text-slate-800">contact@awcompany.co.th</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                  <MapPin className="h-5 w-5 text-slate-700" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">ที่อยู่</p>
                  <p className="font-semibold text-slate-800">กรุงเทพมหานคร ปทุมวัน 10330</p>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6">
              {formSent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="mb-3 h-16 w-16 text-green-500" />
                  <h3 className="text-lg font-bold text-slate-800">ส่งข้อความสำเร็จ!</h3>
                  <p className="mt-1 text-sm text-slate-500">เราจะติดต่อกลับโดยเร็วที่สุด</p>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium text-slate-700">ชื่อ-นามสกุล</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                      placeholder="ชื่อของคุณ"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium text-slate-700">อีเมล</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium text-slate-700">ข้อความ</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                      placeholder="แนะนำสิ่งที่คุณต้องการ..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-slate-900 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] hover:bg-slate-800"
                  >
                    ส่งข้อความ
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-900 py-8 text-center text-sm text-slate-400">
        <p>AW Company — บริษัทที่ปรึกษาธุรกิจ · โทร. 02-123-4567</p>
        <p className="mt-1 text-xs text-slate-500">Demo สำหรับทดลอง ข้อมูลไม่ถูกบันทึกจริง</p>
      </footer>
    </div>
  );
}
