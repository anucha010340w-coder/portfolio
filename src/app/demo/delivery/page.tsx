"use client";

import { useState } from "react";
import {
  Package, Navigation, Clock, MapPin, CheckCircle, Truck,
  Star, ChevronRight, Bell, Route,
} from "lucide-react";

type JobStatus = "pending" | "accepted" | "picking" | "delivering" | "completed";

type Job = {
  id: string;
  pickup: string;
  dropoff: string;
  distance: string;
  duration: string;
  fee: number;
  status: JobStatus;
};

const availableJobs: Job[] = [
  { id: "1024", pickup: "เซียร์รังสิต", dropoff: "ลาดพร้าว 71", distance: "15.2 กม.", duration: "25 นาที", fee: 85, status: "pending" },
  { id: "1025", pickup: "ฟิวเจอร์พาร์ค", dropoff: "มององ 3", distance: "8.5 กม.", duration: "15 นาที", fee: 55, status: "pending" },
  { id: "1026", pickup: "บางบัวทอย", dropoff: "สุวรรณภูมิ", distance: "22 กม.", duration: "35 นาที", fee: 120, status: "pending" },
  { id: "1027", pickup: "คลอง 6", dropoff: "รังสิต ซิตี้", distance: "5 กม.", duration: "10 นาที", fee: 40, status: "pending" },
];

const steps: { key: JobStatus; label: string; icon: typeof Package }[] = [
  { key: "accepted", label: "รับงาน", icon: CheckCircle },
  { key: "picking", label: "รับสินค้า", icon: Package },
  { key: "delivering", label: "นำส่ง", icon: Truck },
  { key: "completed", label: "สำเร็จ", icon: Star },
];

export default function MobileDeliveryPage() {
  const [jobs, setJobs] = useState<Job[]>(availableJobs);
  const [activeJob, setActiveJob] = useState<Job | null>(null);
  const [status, setStatus] = useState<JobStatus>("pending");
  const [showComplete, setShowComplete] = useState(false);

  const acceptJob = (job: Job) => {
    setActiveJob(job);
    setStatus("accepted");
    setJobs((prev) => prev.filter((j) => j.id !== job.id));
  };

  const nextStatus = () => {
    if (status === "accepted") setStatus("picking");
    else if (status === "picking") setStatus("delivering");
    else if (status === "delivering") {
      setStatus("completed");
      setShowComplete(true);
    }
  };

  const reset = () => {
    setActiveJob(null);
    setStatus("pending");
    setShowComplete(false);
  };

  const currentStepIndex = steps.findIndex((s) => s.key === status);

  return (
    <div className="min-h-screen bg-slate-100 py-4 md:py-8">
      {/* Phone Frame */}
      <div className="mx-auto flex max-w-md flex-col overflow-hidden rounded-2xl bg-slate-50 shadow-xl md:min-h-[700px]">
        {/* App Header */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-800">AW Delivery</h1>
              <p className="text-xs text-slate-500">แอพจัดส่งสินค้า</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Bell className="h-5 w-5 text-slate-400" />
            <span className="rounded-full bg-slate-900 px-2 py-0.5 text-xs font-bold text-white">
              {jobs.length}
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
          {showComplete ? (
            /* Completed Screen */
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">ส่งสำเร็จ!</h2>
              <p className="mt-2 text-sm text-slate-500">
                งาน #{activeJob?.id} ส่งถึง {activeJob?.dropoff} เรียบร้อยแล้ว
              </p>
              <div className="mt-6 w-full rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">ค่าจัดส่ง</span>
                  <span className="text-lg font-bold text-slate-900">฿{activeJob?.fee}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-slate-500">ระยะทาง</span>
                  <span className="text-sm font-medium text-slate-700">{activeJob?.distance}</span>
                </div>
                <div className="mt-4 flex items-center justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400" fill="currentColor" />
                  ))}
                </div>
                <p className="mt-1 text-xs text-slate-500">ให้คะแนนลูกค้า</p>
              </div>
              <button
                onClick={reset}
                className="mt-6 w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                รับงานใหม่
              </button>
            </div>
          ) : activeJob ? (
            /* Active Job Screen */
            <div className="p-4">
              {/* Map placeholder */}
              <div className="relative mb-4 h-48 overflow-hidden rounded-xl bg-slate-100">
                <div className="absolute inset-0">
                  {/* Grid lines to simulate map */}
                  <div className="absolute left-0 right-0 top-1/3 h-px bg-slate-200" />
                  <div className="absolute left-0 right-0 top-2/3 h-px bg-slate-200" />
                  <div className="absolute bottom-0 top-0 left-1/3 w-px bg-slate-200" />
                  <div className="absolute bottom-0 top-0 left-2/3 w-px bg-slate-200" />
                  {/* Route line */}
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 192">
                    <path
                      d="M60 160 L60 80 L200 80 L200 40 L340 40"
                      stroke="#0f172a"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="8 4"
                    />
                  </svg>
                  {/* Start point */}
                  <div className="absolute left-[15%] top-[83%]">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 ring-4 ring-green-100">
                      <MapPin className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  {/* End point */}
                  <div className="absolute left-[85%] top-[21%]">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 ring-4 ring-red-100">
                      <MapPin className="h-3 w-3 text-white" />
                    </div>
                  </div>
                </div>
                <div className="absolute left-3 top-3 rounded-lg bg-white/90 px-3 py-1.5 backdrop-blur">
                  <p className="text-xs font-medium text-slate-700">กำลังนำทาง</p>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="mb-4 rounded-xl border border-slate-200 bg-white p-4">
                <div className="relative flex items-center justify-between">
                  {steps.map((step, i) => {
                    const Icon = step.icon;
                    const isDone = i < currentStepIndex;
                    const isActive = i === currentStepIndex;
                    return (
                      <div key={step.key} className="relative flex flex-1 flex-col items-center">
                        {i < steps.length - 1 && (
                          <div className={`absolute top-5 h-0.5 ${isDone ? "bg-green-500" : "bg-slate-200"}`} style={{ left: "50%", width: "100%" }} />
                        )}
                        <div
                          className={"relative z-10 flex h-10 w-10 items-center justify-center rounded-full transition-all " + (isDone ? "bg-green-500 text-white" : isActive ? "bg-slate-900 text-white ring-4 ring-slate-200" : "bg-slate-100 text-slate-400") + ""}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className={"mt-1.5 text-xs " + (isActive ? "font-semibold text-slate-900" : "text-slate-400") + ""}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Job Details */}
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm font-bold text-slate-800">งาน #{activeJob.id}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                    {activeJob.distance} · {activeJob.duration}
                  </span>
                </div>

                {/* Pickup */}
                <div className="mt-3 flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                      <Package className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="my-1 h-8 w-px bg-slate-200" />
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                      <MapPin className="h-4 w-4 text-red-600" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <p className="text-xs text-slate-500">จุดรับสินค้า</p>
                      <p className="text-sm font-medium text-slate-800">{activeJob.pickup}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">จุดส่งมอบ</p>
                      <p className="text-sm font-medium text-slate-800">{activeJob.dropoff}</p>
                    </div>
                  </div>
                </div>

                {/* Fee */}
                <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 p-3">
                  <span className="text-sm text-slate-600">ค่าจัดส่ง</span>
                  <span className="text-lg font-bold text-slate-900">฿{activeJob.fee}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={nextStatus}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white transition-transform hover:bg-slate-800 active:scale-95"
              >
                {status === "accepted" && "เริ่มเดินทางไปรับสินค้า"}
                {status === "picking" && "รับสินค้าแล้ว เริ่มนำส่ง"}
                {status === "delivering" && "ยืนยันส่งสำเร็จ"}
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Cancel */}
              <button
                onClick={reset}
                className="mt-2 w-full rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-500"
              >
                ยกเลิกงาน
              </button>
            </div>
          ) : (
            /* Job List Screen */
            <div className="p-4">
              <div className="mb-4 flex items-center gap-2">
                <Navigation className="h-5 w-5 text-slate-700" />
                <h2 className="text-lg font-bold text-slate-800">งานใกล้คุณ</h2>
              </div>

              {/* Stats */}
              <div className="mb-4 grid grid-cols-3 gap-2">
                <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
                  <p className="text-xs text-slate-500">งานวันนี้</p>
                  <p className="text-lg font-bold text-slate-800">12</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
                  <p className="text-xs text-slate-500">รายได้</p>
                  <p className="text-lg font-bold text-green-600">฿840</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
                  <p className="text-xs text-slate-500">คะแนน</p>
                  <p className="text-lg font-bold text-amber-500">4.9</p>
                </div>
              </div>

              {/* Available Jobs */}
              <div className="space-y-3">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-slate-400 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-sm font-bold text-slate-800">งาน #{job.id}</span>
                      <span className="text-sm font-bold text-slate-900">฿{job.fee}</span>
                    </div>
                    <div className="mt-3 flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100">
                          <Package className="h-3.5 w-3.5 text-green-600" />
                        </div>
                        <div className="my-1 h-6 w-px bg-slate-200" />
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100">
                          <MapPin className="h-3.5 w-3.5 text-red-600" />
                        </div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <p className="text-xs text-slate-500">รับที่</p>
                          <p className="text-sm font-medium text-slate-800">{job.pickup}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">ส่งที่</p>
                          <p className="text-sm font-medium text-slate-800">{job.dropoff}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Route className="h-3.5 w-3.5" /> {job.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {job.duration}
                      </span>
                    </div>
                    <button
                      onClick={() => acceptJob(job)}
                      className="mt-3 w-full rounded-lg bg-slate-900 py-2.5 text-sm font-semibold text-white transition-transform hover:bg-slate-800 active:scale-95"
                    >
                      รับงาน
                    </button>
                  </div>
                ))}
              </div>

              {jobs.length === 0 && (
                <div className="py-16 text-center">
                  <CheckCircle className="mx-auto mb-3 h-12 w-12 text-slate-300" />
                  <p className="text-sm text-slate-500">ไม่มีงานใหม่ในขณะนี้</p>
                  <button
                    onClick={() => setJobs(availableJobs)}
                    className="mt-4 rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600"
                  >
                    รีเฟรช
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Status Bar */}
        <div className="border-t border-slate-200 bg-white px-4 py-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              ออนไลน์
            </span>
            <span>AW Delivery · Demo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
