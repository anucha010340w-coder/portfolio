"use client";

import { useState } from "react";
import {
  Utensils, Coffee, Cake, Plus, Minus, Trash2, ShoppingCart,
  Receipt, ArrowLeft, ArrowRight, CheckCircle, Users, CreditCard,
  Banknote, QrCode, Printer,
} from "lucide-react";

type MenuCategory = "อาหาร" | "เครื่องดื่ม" | "ของหวาน" | "อาหารเสริม";

type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: MenuCategory;
  icon: typeof Utensils;
  desc: string;
};

const categoryStyles: Record<MenuCategory, { active: string; bg: string; tileBg: string; text: string }> = {
  "อาหาร": { active: "bg-orange-600 text-white shadow-sm", bg: "bg-orange-50", tileBg: "bg-orange-100", text: "text-orange-600" },
  "เครื่องดื่ม": { active: "bg-blue-600 text-white shadow-sm", bg: "bg-blue-50", tileBg: "bg-blue-100", text: "text-blue-600" },
  "ของหวาน": { active: "bg-pink-600 text-white shadow-sm", bg: "bg-pink-50", tileBg: "bg-pink-100", text: "text-pink-600" },
  "อาหารเสริม": { active: "bg-green-600 text-white shadow-sm", bg: "bg-green-50", tileBg: "bg-green-100", text: "text-green-600" },
};

const menu: MenuItem[] = [
  { id: "1", name: "ข้าวผัดกุ้ง", price: 120, category: "อาหาร", icon: Utensils, desc: "ข้าวผัดกับกุ้งสดใหญ่" },
  { id: "2", name: "ผัดไทยกุ้งสด", price: 100, category: "อาหาร", icon: Utensils, desc: "ผัดไทยรสชาติจัดจ้วง" },
  { id: "3", name: "ส้มตำไก่ย่าง", price: 90, category: "อาหาร", icon: Utensils, desc: "ส้มตำรสปั๊บ + ไก่ย่าง" },
  { id: "4", name: "กะเพราไก่ไข่ดาว", price: 80, category: "อาหาร", icon: Utensils, desc: "กะเพราเผ็ดร้อน + ไข่ดาว" },
  { id: "5", name: "ราดหน้าเนื้อ", price: 130, category: "อาหาร", icon: Utensils, desc: "ราดหน้าเนื้อสดนุ่ม" },
  { id: "6", name: "ข้าวมันไก่", price: 70, category: "อาหาร", icon: Utensils, desc: "ไก่ต้มนุ่มฉ่ำ + น้ำจิ้มเด็ด" },
  { id: "7", name: "ชาเย็น", price: 45, category: "เครื่องดื่ม", icon: Coffee, desc: "ชาเย็นหวานมัน" },
  { id: "8", name: "กาแฟเย็น", price: 55, category: "เครื่องดื่ม", icon: Coffee, desc: "กาแฟเย็นเข้มข้น" },
  { id: "9", name: "โอเลี้ยงเย็น", price: 50, category: "เครื่องดื่ม", icon: Coffee, desc: "โอเลี้ยงหอมมือ" },
  { id: "10", name: "ชามะนาวเย็น", price: 40, category: "เครื่องดื่ม", icon: Coffee, desc: "ชามะนาวเปรี้ยวหวาน" },
  { id: "11", name: "น้ำส้มคั้น", price: 60, category: "เครื่องดื่ม", icon: Coffee, desc: "ส้มสด 100% คั้นสดใหม่" },
  { id: "12", name: "ข้าวเหนียวมะม่วง", price: 80, category: "ของหวาน", icon: Cake, desc: "มะม่วงสุกหวาน + ข้าวเหนียว" },
  { id: "13", name: "ไอศกรีมรวมมิตร", price: 70, category: "ของหวาน", icon: Cake, desc: "ไอศกรีม 3 รสชาติ" },
  { id: "14", name: "ทับทิมกรอบ", price: 60, category: "ของหวาน", icon: Cake, desc: "ทับทิมกรอบหวานหิมะ" },
  { id: "15", name: "เฟรนฟราย", price: 65, category: "อาหารเสริม", icon: Utensils, desc: "เฟรนฟรายกรอบนอกนุ่มใน" },
  { id: "16", name: "วิงส์ไก่ 6 ชิ้น", price: 120, category: "อาหารเสริม", icon: Utensils, desc: "วิงส์ไก่ทอดรสเด็ด" },
];

type CartItem = MenuItem & { qty: number; note?: string };

type Table = {
  id: number;
  seats: number;
  status: "ว่าง" | "มีลูกค้า" | "จองแล้ว";
};

const tables: Table[] = [
  { id: 1, seats: 2, status: "ว่าง" },
  { id: 2, seats: 4, status: "มีลูกค้า" },
  { id: 3, seats: 4, status: "ว่าง" },
  { id: 4, seats: 6, status: "ว่าง" },
  { id: 5, seats: 2, status: "จองแล้ว" },
  { id: 6, seats: 8, status: "ว่าง" },
  { id: 7, seats: 4, status: "มีลูกค้า" },
  { id: 8, seats: 2, status: "ว่าง" },
  { id: 9, seats: 6, status: "ว่าง" },
  { id: 10, seats: 10, status: "จองแล้ว" },
];

const categories: (MenuCategory | "ทั้งหมด")[] = ["ทั้งหมด", "อาหาร", "เครื่องดื่ม", "ของหวาน", "อาหารเสริม"];

type PayMethod = "cash" | "card" | "qr";

export default function POSPage() {
  const [view, setView] = useState<"tables" | "menu" | "payment" | "receipt">("tables");
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filter, setFilter] = useState<MenuCategory | "ทั้งหมด">("ทั้งหมด");
  const [payMethod, setPayMethod] = useState<PayMethod>("cash");
  const [cashReceived, setCashReceived] = useState<number | "">("");
  const [receiptNo, setReceiptNo] = useState("");

  const filtered = filter === "ทั้งหมด" ? menu : menu.filter((m) => m.category === filter);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const vat = Math.round(subtotal * 0.07);
  const total = subtotal + vat;
  const change = cashReceived ? cashReceived - total : 0;

  const selectTable = (t: number) => {
    setSelectedTable(t);
    setView("menu");
  };

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === item.id);
      if (ex) return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const changeQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => i.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id: string) => setCart((prev) => prev.filter((i) => i.id !== id));

  const goPayment = () => {
    if (cart.length === 0) return;
    setView("payment");
  };

  const confirmPayment = () => {
    const rNo = `R${Date.now().toString().slice(-6)}`;
    setReceiptNo(rNo);
    setView("receipt");
  };

  const newOrder = () => {
    setCart([]);
    setCashReceived("");
    setView("tables");
    setSelectedTable(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      {/* App Header */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          {view !== "tables" && (
            <button
              onClick={() => setView(view === "receipt" ? "payment" : view === "payment" ? "menu" : "tables")}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 text-white">
              <Utensils className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">AW POS</h1>
              <p className="text-xs text-slate-500">ระบบจุดขายร้านอาหาร</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {selectedTable && view !== "tables" && view !== "receipt" && (
            <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
              โต๊ะ {selectedTable}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-sm text-slate-500">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            เชื่อมต่อแล้ว
          </span>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1">
        {/* Tables View */}
        {view === "tables" && (
          <div className="mx-auto max-w-4xl p-6">
            <div className="mb-6 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-800">เลือกโต๊ะ</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {tables.map((t) => {
                const canSelect = t.status === "ว่าง";
                return (
                  <button
                    key={t.id}
                    disabled={!canSelect}
                    onClick={() => selectTable(t.id)}
                    className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-5 transition-all ${
                      canSelect
                        ? "border-slate-200 bg-white hover:border-blue-500 hover:shadow-lg active:scale-95"
                        : t.status === "มีลูกค้า"
                        ? "border-amber-200 bg-amber-50 cursor-not-allowed"
                        : "border-red-200 bg-red-50 cursor-not-allowed"
                    }`}
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold ${
                      canSelect ? "bg-blue-100 text-blue-700" : t.status === "มีลูกค้า" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                    }`}>
                      {t.id}
                    </div>
                    <span className="text-sm font-medium text-slate-700">โต๊ะ {t.id}</span>
                    <span className="text-xs text-slate-500">{t.seats} ที่นั่ง</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      canSelect ? "bg-green-100 text-green-700" : t.status === "มีลูกค้า" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                    }`}>
                      {t.status}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Menu + Cart View */}
        {view === "menu" && (
          <div className="flex h-full flex-col md:flex-row">
            {/* Menu */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
                {categories.map((c) => {
                  const isActive = filter === c;
                  const cat = c === "ทั้งหมด" ? null : categoryStyles[c as MenuCategory];
                  const tabClass = isActive
                    ? cat ? cat.active : "bg-slate-800 text-white shadow-sm"
                    : cat ? cat.bg + " " + cat.text + " hover:brightness-95"
                    : "bg-white text-slate-600 hover:bg-slate-100";
                  return (
                    <button
                      key={c}
                      onClick={() => setFilter(c)}
                      className={"whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all " + tabClass}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {filtered.map((item) => {
                  const cat = categoryStyles[item.category];
                  return (
                    <button
                      key={item.id}
                      onClick={() => addToCart(item)}
                      className={`group flex flex-col rounded-2xl border border-slate-200 bg-white p-4 text-left transition-all hover:shadow-md active:scale-95 ${cat.bg} hover:border-slate-300`}
                    >
                      <div className={"mb-2 flex h-16 w-16 items-center justify-center rounded-xl " + cat.tileBg}>
                        <item.icon className={"h-7 w-7 " + cat.text} />
                      </div>
                      <h4 className="text-sm font-semibold text-slate-800">{item.name}</h4>
                      <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">{item.desc}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <p className={`text-base font-bold ${cat.text}`}>฿{item.price}</p>
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full ${cat.tileBg} ${cat.text} opacity-0 transition-opacity group-hover:opacity-100`}>
                          <Plus className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cart Sidebar */}
            <div className="flex w-full flex-col border-t border-slate-200 bg-white md:w-80 md:border-l md:border-t-0">
              <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                  <ShoppingCart className="h-4 w-4 text-blue-600" />
                </div>
                <span className="font-semibold text-slate-800">โต๊ะ {selectedTable}</span>
                {cart.length > 0 && (
                  <span className="ml-auto rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">
                    {cart.reduce((s, i) => s + i.qty, 0)} ชิ้น
                  </span>
                )}
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-3" style={{ maxHeight: "400px" }}>
                {cart.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">
                      <ShoppingCart className="h-7 w-7 text-slate-300" />
                    </div>
                    <p className="text-sm font-medium text-slate-500">ยังไม่มีสินค้าในตะกร้า</p>
                    <p className="mt-1 text-xs text-slate-400">กดเมนูด้านซ้ายเพื่อเพิ่ม</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 rounded-xl border border-slate-200 p-2.5">
                        <div className={"flex h-9 w-9 shrink-0 items-center justify-center rounded-lg " + categoryStyles[item.category].tileBg}>
                          <item.icon className={"h-4 w-4 " + categoryStyles[item.category].text} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-medium text-slate-800">{item.name}</p>
                          <p className="text-xs text-slate-500">฿{item.price} × {item.qty}</p>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <button onClick={() => changeQty(item.id, -1)} className="flex h-6 w-6 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-5 text-center text-sm font-bold">{item.qty}</span>
                          <button onClick={() => changeQty(item.id, 1)} className="flex h-6 w-6 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => removeItem(item.id)} className="ml-1 flex h-6 w-6 items-center justify-center rounded-md text-red-400 hover:bg-red-50 hover:text-red-600">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-slate-200 px-4 py-3">
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between text-slate-500">
                      <span>รวม</span><span>฿{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>VAT 7%</span><span>฿{vat}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-2 text-lg font-bold text-slate-800">
                      <span>รวมทั้งสิ้น</span><span className="text-blue-600">฿{total}</span>
                    </div>
                  </div>
                  <button
                    onClick={goPayment}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-semibold text-white transition-all hover:bg-slate-800 active:scale-95"
                  >
                    ไปชำระเงิน <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Payment View */}
        {view === "payment" && (
          <div className="mx-auto max-w-lg p-6">
            <div className="mb-6 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-800">ชำระเงิน — โต๊ะ {selectedTable}</h2>
            </div>

            {/* Summary */}
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="mb-3 font-semibold text-slate-800">สรุปออเดอร์</h3>
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-slate-600">{item.name} × {item.qty}</span>
                    <span className="font-medium text-slate-800">฿{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-1 border-t border-slate-200 pt-3 text-sm">
                <div className="flex justify-between text-slate-600"><span>รวม</span><span>฿{subtotal}</span></div>
                <div className="flex justify-between text-slate-600"><span>VAT 7%</span><span>฿{vat}</span></div>
                <div className="flex justify-between pt-2 text-lg font-bold text-slate-800">
                  <span>รวมทั้งสิ้น</span><span className="text-blue-600">฿{total}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <h3 className="mb-3 font-semibold text-slate-800">เลือกวิธีชำระเงิน</h3>
              <div className="grid grid-cols-3 gap-3">
                {([
                  { id: "cash" as const, label: "เงินสด", icon: Banknote },
                  { id: "card" as const, label: "บัตรเครดิต", icon: CreditCard },
                  { id: "qr" as const, label: "คิวอาร์", icon: QrCode },
                ]).map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setPayMethod(m.id)}
                      className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                        payMethod === m.id ? "border-blue-600 bg-blue-50" : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <Icon className={`h-6 w-6 ${payMethod === m.id ? "text-blue-600" : "text-slate-400"}`} />
                      <span className={`text-sm font-medium ${payMethod === m.id ? "text-blue-700" : "text-slate-600"}`}>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cash Input */}
            {payMethod === "cash" && (
              <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">รับเงินมา</span>
                  <input
                    type="number"
                    value={cashReceived}
                    onChange={(e) => setCashReceived(e.target.value ? Number(e.target.value) : "")}
                    placeholder={total.toString()}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-3 text-lg font-bold outline-none focus:border-blue-600"
                  />
                </label>
                <div className="mt-3 flex gap-2">
                  {[total, total + 100, total + 500, 1000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setCashReceived(amt)}
                      className="flex-1 rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                    >
                      ฿{amt}
                    </button>
                  ))}
                </div>
                {cashReceived && change >= 0 && (
                  <div className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-center">
                    <span className="text-sm text-green-700">เงินทอน: </span>
                    <span className="text-lg font-bold text-green-700">฿{change}</span>
                  </div>
                )}
              </div>
            )}

            {/* QR Payment */}
            {payMethod === "qr" && (
              <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 text-center">
                <div className="mx-auto mb-3 flex h-48 w-48 items-center justify-center rounded-xl bg-slate-50">
                  <QrCode className="h-32 w-32 text-slate-800" />
                </div>
                <p className="text-sm text-slate-600">สแกนเพื่อชำระเงิน ฿{total}</p>
                <p className="mt-1 text-xs text-slate-400">PromptPay / TrueMoney / LINE Pay</p>
              </div>
            )}

            {/* Card Payment */}
            {payMethod === "card" && (
              <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 text-center">
                <CreditCard className="mx-auto mb-3 h-16 w-16 text-slate-300" />
                <p className="text-sm text-slate-600">เสียบหรือแตะบัตรที่เครื่องอ่าน</p>
                <p className="mt-1 text-xs text-slate-400">รองรับ Visa / Mastercard / UnionPay</p>
              </div>
            )}

            <button
              onClick={confirmPayment}
              disabled={payMethod === "cash" && (!cashReceived || change < 0)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-3 text-lg font-semibold text-white transition-all hover:brightness-110 active:scale-95 disabled:opacity-40"
            >
              <CheckCircle className="h-5 w-5" />
              ยืนยันการชำระเงิน
            </button>
          </div>
        )}

        {/* Receipt View */}
        {view === "receipt" && (
          <div className="mx-auto max-w-sm p-6">
            <div className="rounded-2xl bg-white p-6 shadow-lg" style={{ fontFamily: "monospace" }}>
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-7 w-7 text-green-600" />
                </div>
                <h2 className="text-lg font-bold text-slate-800">AW Restaurant</h2>
                <p className="text-xs text-slate-500">เลขที่ใบเสร็จ: {receiptNo}</p>
                <p className="text-xs text-slate-500">{new Date().toLocaleString("th-TH")}</p>
                <div className="my-3 border-t border-dashed border-slate-300" />
                <p className="text-sm font-semibold text-slate-700">โต๊ะ {selectedTable}</p>
                <div className="my-3 border-t border-dashed border-slate-300" />
              </div>

              <div className="space-y-1.5 text-sm">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-slate-700">
                    <span>{item.name} ×{item.qty}</span>
                    <span>฿{item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <div className="my-3 border-t border-dashed border-slate-300" />

              <div className="space-y-1 text-sm text-slate-600">
                <div className="flex justify-between"><span>รวม</span><span>฿{subtotal}</span></div>
                <div className="flex justify-between"><span>VAT 7%</span><span>฿{vat}</span></div>
              </div>
              <div className="mt-2 flex justify-between text-base font-bold text-slate-800">
                <span>รวมทั้งสิ้น</span><span>฿{total}</span>
              </div>

              {payMethod === "cash" && cashReceived && (
                <>
                  <div className="my-3 border-t border-dashed border-slate-300" />
                  <div className="space-y-1 text-sm text-slate-600">
                    <div className="flex justify-between"><span>เงินสด</span><span>฿{cashReceived}</span></div>
                    <div className="flex justify-between"><span>เงินทอน</span><span>฿{change}</span></div>
                  </div>
                </>
              )}

              <div className="my-3 border-t border-dashed border-slate-300" />
              <div className="text-center">
                <p className="text-xs text-slate-500">ขอบคุณที่ใช้บริการ</p>
                <p className="text-xs text-slate-400">www.aw-dev.com</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Printer className="h-4 w-4" /> พิมพ์
              </button>
              <button
                onClick={newOrder}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-3 font-semibold text-white hover:brightness-110"
              >
                <Receipt className="h-4 w-4" /> ออเดอร์ใหม่
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
