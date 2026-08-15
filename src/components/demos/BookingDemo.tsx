"use client";

import { useState } from "react";
import { Calendar, Clock, User, Phone, CheckCircle2, ChevronLeft, ChevronRight, Bell } from "lucide-react";

const services = [
  { id: "1", name: "ตัดผม", duration: 30, price: 200 },
  { id: "2", name: "สระ + ตัด", duration: 45, price: 350 },
  { id: "3", name: "ย้อมผม", duration: 90, price: 800 },
  { id: "4", name: "ดัดผม", duration: 120, price: 1500 },
  { id: "5", name: "ทำเล็บ", duration: 60, price: 500 },
  { id: "6", name: "สปาหน้า", duration: 45, price: 600 },
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30",
];

const today = new Date();
const formatDate = (d: Date) =>
  d.toLocaleDateString("th-TH", { weekday: "short", day: "numeric", month: "short" });

const getNextDays = (count: number) => {
  const days: Date[] = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    days.push(d);
  }
  return days;
};

export default function BookingDemo() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
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
    setBooked(false);
  };

  const confirmBooking = () => {
    setBooked(true);
    setTimeout(reset, 3500);
  };

  const canNext = step === 1 ? !!selectedService : step === 2 ? !!selectedTime : !!name && !!phone;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border bg-slate-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-accent" />
          <span className="font-semibold">ระบบจองคิวออนไลน์</span>
        </div>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                step >= s ? "w-8 bg-accent" : "w-2 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-4">
        {booked ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold">จองคิวสำเร็จ!</h3>
            <p className="mt-2 text-sm text-muted">
              {service?.name} · {formatDate(days[selectedDay])} · เวลา {selectedTime} น.
            </p>
            <p className="mt-1 text-sm text-muted">
              ส่งการแจ้งเตือนไปยัง LINE ของคุณแล้ว
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700">
              <Bell className="h-4 w-4" />
              LINE Notify: แจ้งเตือนก่อนนัด 30 นาที
            </div>
          </div>
        ) : (
          <>
            {step === 1 && (
              <div>
                <h4 className="mb-3 text-sm font-semibold text-muted">เลือกบริการ</h4>
                <div className="grid grid-cols-2 gap-3">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedService(s.id)}
                      className={`rounded-xl border p-4 text-left transition-all ${
                        selectedService === s.id
                          ? "border-accent bg-accent/5 shadow-sm"
                          : "border-border bg-white hover:border-slate-300"
                      }`}
                    >
                      <p className="font-medium">{s.name}</p>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted">
                        <Clock className="h-3 w-3" />
                        {s.duration} นาที
                      </div>
                      <p className="mt-1 text-sm font-bold text-accent">฿{s.price}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h4 className="mb-3 text-sm font-semibold text-muted">
                  เลือกวันและเวลา — {service?.name}
                </h4>
                <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
                  {days.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedDay(i)}
                      className={`flex min-w-[72px] flex-col items-center rounded-xl border px-3 py-2 transition-all ${
                        selectedDay === i
                          ? "border-accent bg-accent text-white"
                          : "border-border bg-white hover:border-slate-300"
                      }`}
                    >
                      <span className="text-xs">{d.toLocaleDateString("th-TH", { weekday: "short" })}</span>
                      <span className="text-lg font-bold">{d.getDate()}</span>
                      <span className="text-xs">{d.toLocaleDateString("th-TH", { month: "short" })}</span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {timeSlots.map((time) => {
                    const unavailable = ["10:00", "14:00"].includes(time);
                    return (
                      <button
                        key={time}
                        disabled={unavailable}
                        onClick={() => setSelectedTime(time)}
                        className={`rounded-lg border py-2 text-sm font-medium transition-all ${
                          unavailable
                            ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300 line-through"
                            : selectedTime === time
                            ? "border-accent bg-accent text-white"
                            : "border-border bg-white hover:border-accent"
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-xs text-muted">* เวลาที่ขีดฆ่า = ถูกจองแล้ว</p>
              </div>
            )}

            {step === 3 && (
              <div>
                <h4 className="mb-3 text-sm font-semibold text-muted">กรอกข้อมูลผู้จอง</h4>
                <div className="mb-4 rounded-xl border border-border bg-slate-50 p-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">บริการ:</span>
                    <span className="font-medium">{service?.name} (฿{service?.price})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">วันที่:</span>
                    <span className="font-medium">{formatDate(days[selectedDay])}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">เวลา:</span>
                    <span className="font-medium">{selectedTime} น.</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block">
                    <span className="text-sm text-muted">ชื่อ-นามสกุล</span>
                    <div className="mt-1 flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2">
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
                    <span className="text-sm text-muted">เบอร์โทรศัพท์</span>
                    <div className="mt-1 flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="08x-xxx-xxxx"
                        className="flex-1 text-sm outline-none"
                      />
                    </div>
                  </label>
                </div>
              </div>
            )}

            <div className="mt-4 flex gap-2">
              {step > 1 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="flex items-center gap-1 rounded-xl border border-border bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  ย้อนกลับ
                </button>
              )}
              {step < 3 ? (
                <button
                  onClick={() => canNext && setStep((s) => s + 1)}
                  disabled={!canNext}
                  className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-accent to-accent-2 py-2 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-95 disabled:opacity-40"
                >
                  ถัดไป
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={confirmBooking}
                  disabled={!canNext}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 py-2 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-95 disabled:opacity-40"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  ยืนยันการจอง
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
