"use client";

import { useState } from "react";
import {
  Calendar, Clock, User, Phone, CheckCircle2, ChevronLeft, ChevronRight,
  Bell, Scissors, Sparkles, Hand, Droplet, Star, CalendarDays,
  MessageCircle, Mail,
} from "lucide-react";

const services = [
  { id: "1", name: "ตัดผม", duration: 30, price: 200, icon: Scissors, desc: "ตัดผมสไตล์ที่คุณต้องการ โดยช่างผู้เชี่ยวชาญ" },
  { id: "2", name: "สระ + ตัดผม", duration: 45, price: 350, icon: Droplet, desc: "สระให้สะอาดสบายก่อนตัดผมให้สวยงาม" },
  { id: "3", name: "ย้อมผม", duration: 90, price: 800, icon: Sparkles, desc: "ย้อมผมสีที่ต้องการ ดูแลเส้นผมด้วยผลิตภัณฑ์ระดับพรีเมียม" },
  { id: "4", name: "ดัดผม", duration: 120, price: 1500, icon: Sparkles, desc: "ดัดผมให้มีลอนสวย ทนทาน ดูเป็นธรรมชาติ" },
  { id: "5", name: "ทำเล็บมือ", duration: 60, price: 500, icon: Hand, desc: "ทาเล็บสีสวย วาดลายตามต้องการ ดูแลเล็บให้แข็งแรง" },
  { id: "6", name: "สปาผ่อนคลาย", duration: 45, price: 600, icon: Sparkles, desc: "นวดผ่อนคลายคลายเครียย บำรุงผิวพรรณ" },
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30",
];

const unavailableSlots: Record<number, string[]> = {
  0: ["10:00", "14:00"],
  1: ["09:00", "11:30", "15:00"],
  2: ["13:00", "16:30"],
  3: ["10:30", "14:30", "17:00"],
  4: ["09:30", "11:00"],
  5: ["10:00", "13:30", "15:30"],
  6: ["14:00", "16:00"],
};

const today = new Date();
const getNextDays = (count: number) => {
  const days: Date[] = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    days.push(d);
  }
  return days;
};

const formatFullDate = (d: Date) =>
  d.toLocaleDateString("th-TH", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

const formatShortDate = (d: Date) =>
  d.toLocaleDateString("th-TH", { weekday: "short", day: "numeric", month: "short" });

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [booked, setBooked] = useState(false);

  const days = getNextDays(7);
  const service = services.find((s) => s.id === selectedService);

  const reset = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedDay(0);
    setSelectedTime(null);
    setName("");
    setPhone("");
    setEmail("");
    setNote("");
    setBooked(false);
  };

  const confirmBooking = () => {
    setBooked(true);
  };

  const canNext =
    step === 1 ? !!selectedService :
    step === 2 ? !!selectedTime :
    !!name && !!phone;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">AW Booking</h1>
              <p className="text-xs text-slate-500">ระบบจองคิวออนไลน์</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 text-sm text-slate-500">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            เปิดให้จอง
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-6">
        {booked ? (
          /* Success Screen */
          <div className="mx-auto max-w-md">
            <div className="rounded-3xl bg-white p-8 text-center shadow-lg">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">จองคิวสำเร็จ!</h2>
              <p className="mt-2 text-slate-500">เราได้ส่งยืนยันการจองไปยังช่องทางติดต่อของคุณแล้ว</p>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      {service && <service.icon className="h-5 w-5 text-blue-600" />}
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">บริการ</p>
                      <p className="font-semibold text-slate-800">{service?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100">
                      <CalendarDays className="h-5 w-5 text-violet-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">วันที่</p>
                      <p className="font-semibold text-slate-800">{formatFullDate(days[selectedDay])}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                      <Clock className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">เวลา</p>
                      <p className="font-semibold text-slate-800">{selectedTime} น. ({service?.duration} นาที)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                      <User className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">ชื่อ</p>
                      <p className="font-semibold text-slate-800">{name}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 border-t border-slate-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-slate-600">ค่าบริการ</span>
                    <span className="text-lg font-bold text-blue-600">฿{service?.price}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">ชำระได้ที่ร้าน หรือโอนล่วงหน้า</p>
                </div>
              </div>

              {/* Notifications */}
              <div className="mt-4 space-y-2 text-left">
                <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                  <Bell className="h-4 w-4 shrink-0" />
                  <span>LINE Notify: แจ้งเตือนก่อนนัด 30 นาที</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-700">
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  <span>SMS: ส่งเลขจองไปยัง {phone}</span>
                </div>
                {email && (
                  <div className="flex items-center gap-2 rounded-xl bg-violet-50 px-4 py-3 text-sm text-violet-700">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span>Email: ส่งใบยืนยันไปยัง {email}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  พิมพ์ใบยืนยัน
                </button>
                <button
                  onClick={reset}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-semibold text-white hover:bg-slate-800"
                >
                  จองคิวใหม่
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Progress */}
            <div className="mb-6 flex items-center justify-center gap-2">
              {[
                { num: 1, label: "เลือกบริการ" },
                { num: 2, label: "เลือกเวลา" },
                { num: 3, label: "ข้อมูลผู้จอง" },
              ].map((s, i) => (
                <div key={s.num} className="flex items-center gap-2">
                  <div className={"flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all " + (step >= s.num ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-400") + ""}>
                    {step > s.num ? <CheckCircle2 className="h-4 w-4" /> : s.num}
                  </div>
                  <span className={`hidden text-sm font-medium sm:inline ${step >= s.num ? "text-slate-700" : "text-slate-400"}`}>
                    {s.label}
                  </span>
                  {i < 2 && <div className={"h-0.5 w-6 sm:w-12 " + (step > s.num ? "bg-slate-900" : "bg-slate-200") + ""} />}
                </div>
              ))}
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">
              {/* Step 1: Service */}
              {step === 1 && (
                <div>
                  <h2 className="mb-4 text-lg font-bold text-slate-800">เลือกบริการ</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {services.map((s) => {
                      return (
                        <button
                          key={s.id}
                          onClick={() => setSelectedService(s.id)}
                          className={"flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition-all " + (selectedService === s.id ? "border-slate-900 bg-slate-50 shadow-md" : "border-slate-200 hover:border-slate-300") + ""}
                        >
                          <div className={"flex h-12 w-12 shrink-0 items-center justify-center rounded-xl " + (selectedService === s.id ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600") + ""}>
                            <s.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-slate-800">{s.name}</p>
                            <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">{s.desc}</p>
                            <div className="mt-2 flex items-center gap-3 text-sm">
                              <span className="flex items-center gap-1 text-slate-500">
                                <Clock className="h-3 w-3" /> {s.duration} นาที
                              </span>
                              <span className="font-bold text-slate-900">฿{s.price}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <div>
                  <h2 className="mb-4 text-lg font-bold text-slate-800">
                    เลือกวันและเวลา — {service?.name}
                  </h2>

                  {/* Date selector */}
                  <div className="mb-5">
                    <p className="mb-2 text-sm font-medium text-slate-600">เลือกวัน</p>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {days.map((d, i) => {
                        const isToday = i === 0;
                        return (
                          <button
                            key={i}
                            onClick={() => { setSelectedDay(i); setSelectedTime(null); }}
                            className={"flex min-w-[76px] flex-col items-center rounded-2xl border-2 px-3 py-3 transition-all " + (selectedDay === i ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300") + ""}
                          >
                            <span className="text-xs">{isToday ? "วันนี้" : d.toLocaleDateString("th-TH", { weekday: "short" })}</span>
                            <span className="text-xl font-bold">{d.getDate()}</span>
                            <span className="text-xs">{d.toLocaleDateString("th-TH", { month: "short" })}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time slots */}
                  <div>
                    <p className="mb-2 text-sm font-medium text-slate-600">
                      เวลาที่ว่าง — {formatShortDate(days[selectedDay])}
                    </p>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {timeSlots.map((time) => {
                        const unavailable = unavailableSlots[selectedDay]?.includes(time);
                        return (
                          <button
                            key={time}
                            disabled={unavailable}
                            onClick={() => setSelectedTime(time)}
                            className={"rounded-xl border-2 py-2.5 text-sm font-medium transition-all " + (unavailable ? "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300 line-through" : selectedTime === time ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400") + ""}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <span className="h-3 w-3 rounded border-2 border-slate-200 bg-white" /> ว่าง
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="h-3 w-3 rounded border-2 border-slate-100 bg-slate-50" /> ไม่ว่าง
                      </span>
                    </div>
                  </div>

                  {/* Summary mini */}
                  {selectedTime && (
                    <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                      <div className="text-sm">
                        <span className="text-slate-600">{service?.name} · {formatShortDate(days[selectedDay])} · {selectedTime} น.</span>
                      </div>
                      <span className="font-bold text-slate-900">฿{service?.price}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Customer Info */}
              {step === 3 && (
                <div>
                  <h2 className="mb-4 text-lg font-bold text-slate-800">กรอกข้อมูลผู้จอง</h2>

                  {/* Booking summary */}
                  <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                      <div>
                        <p className="text-xs text-slate-500">บริการ</p>
                        <p className="font-semibold text-slate-800">{service?.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">วันที่</p>
                        <p className="font-semibold text-slate-800">{formatShortDate(days[selectedDay])}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">เวลา</p>
                        <p className="font-semibold text-slate-800">{selectedTime} น.</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">ราคา</p>
                        <p className="font-semibold text-slate-900">฿{service?.price}</p>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">ชื่อ-นามสกุล <span className="text-red-500">*</span></span>
                      <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 focus-within:border-blue-500">
                        <User className="h-4 w-4 text-slate-400" />
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="ชื่อของคุณ"
                          className="flex-1 text-sm outline-none"
                        />
                      </div>
                    </label>

                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">เบอร์โทรศัพท์ <span className="text-red-500">*</span></span>
                      <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 focus-within:border-blue-500">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="08x-xxx-xxxx"
                          className="flex-1 text-sm outline-none"
                        />
                      </div>
                      <p className="mt-1 text-xs text-slate-500">ใช้สำหรับส่ง SMS ยืนยันการจอง</p>
                    </label>

                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">อีเมล (ไม่บังคับ)</span>
                      <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 focus-within:border-blue-500">
                        <Mail className="h-4 w-4 text-slate-400" />
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@email.com"
                          className="flex-1 text-sm outline-none"
                        />
                      </div>
                    </label>

                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">หมายเหตุ (ไม่บังคับ)</span>
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={3}
                        placeholder="แนะนำเพิ่มเติม เช่น แพ้ยา ต้องการช่างคนใด"
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                      />
                    </label>
                  </div>

                  {/* Notification preview */}
                  <div className="mt-5 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 shrink-0" />
                      <span>คุณจะได้รับการแจ้งเตือนผ่าน LINE และ SMS ก่อนถึงเวลานัด 30 นาที</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-6 flex gap-3">
                {step > 1 && (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="flex items-center gap-1 rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    ย้อนกลับ
                  </button>
                )}
                {step < 3 ? (
                  <button
                    onClick={() => canNext && setStep((s) => s + 1)}
                    disabled={!canNext}
                    className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-slate-900 py-3 font-semibold text-white transition-all hover:bg-slate-800 active:scale-95 disabled:opacity-40"
                  >
                    ถัดไป
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={confirmBooking}
                    disabled={!canNext}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-semibold text-white transition-all hover:bg-slate-800 active:scale-95 disabled:opacity-40"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    ยืนยันการจอง
                  </button>
                )}
              </div>
            </div>

            {/* Reviews section */}
            {step === 1 && (
              <div className="mt-6 rounded-3xl bg-white p-6 shadow-lg">
                <h3 className="mb-4 font-bold text-slate-800">รีวิวจากลูกค้า</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { name: "คุณสมชาย", text: "จองง่าย ไม่ต้องรอคิว ช่างทำดีมาก", rating: 5 },
                    { name: "คุณมาลี", text: "แจ้งเตือนทาง LINE สะดวกมาก ไม่ลืมนัด", rating: 5 },
                    { name: "คุณวิภา", text: "เวลาตรง บริการดี จะมาใหม่", rating: 4 },
                    { name: "คุณกิตติ", text: "เปลี่ยนเวลาได้ง่าย ประทับใจ", rating: 5 },
                  ].map((r) => (
                    <div key={r.name} className="rounded-xl border border-slate-200 p-4">
                      <div className="mb-1 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                          {r.name[4]}
                        </div>
                        <span className="text-sm font-medium text-slate-700">{r.name}</span>
                        <div className="ml-auto flex">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4">
        <div className="mx-auto max-w-3xl px-4 text-center text-xs text-slate-500">
          AW Booking System · จองคิวออนไลน์ 24 ชม. · โทร. 061-237-3304
        </div>
      </footer>
    </div>
  );
}
