"use client";

import { useState } from "react";
import { ShoppingCart, Trash2, Printer, Utensils, Coffee, Cake, Plus, Minus } from "lucide-react";

type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: "อาหาร" | "เครื่องดื่ม" | "ของหวาน";
  icon: typeof Utensils;
};

const menu: MenuItem[] = [
  { id: "1", name: "ข้าวผัดกุ้ง", price: 120, category: "อาหาร", icon: Utensils },
  { id: "2", name: "ผัดไทยกุ้งสด", price: 100, category: "อาหาร", icon: Utensils },
  { id: "3", name: "ส้มตำไก่ย่าง", price: 90, category: "อาหาร", icon: Utensils },
  { id: "4", name: "กะเพราไก่ไข่ดาว", price: 80, category: "อาหาร", icon: Utensils },
  { id: "5", name: "ชาเย็น", price: 45, category: "เครื่องดื่ม", icon: Coffee },
  { id: "6", name: "กาแฟเย็น", price: 55, category: "เครื่องดื่ม", icon: Coffee },
  { id: "7", name: "โอเลี้ยงเย็น", price: 50, category: "เครื่องดื่ม", icon: Coffee },
  { id: "8", name: "ชามะนาวเย็น", price: 40, category: "เครื่องดื่ม", icon: Coffee },
  { id: "9", name: "ข้าวเหนียวมะม่วง", price: 80, category: "ของหวาน", icon: Cake },
  { id: "10", name: "ไอศกรีมรวมมิตร", price: 70, category: "ของหวาน", icon: Cake },
  { id: "11", name: "ทับทิมกรอบ", price: 60, category: "ของหวาน", icon: Cake },
  { id: "12", name: "ลอดช่องสิงคโปร์", price: 65, category: "ของหวาน", icon: Cake },
];

type CartItem = MenuItem & { qty: number };

export default function POSDemo() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filter, setFilter] = useState<MenuItem["category"] | "ทั้งหมด">("ทั้งหมด");
  const [table, setTable] = useState(5);
  const [paid, setPaid] = useState(false);

  const filtered = filter === "ทั้งหมด" ? menu : menu.filter((m) => m.category === filter);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const vat = Math.round(total * 0.07);
  const grandTotal = total + vat;

  const addToCart = (item: MenuItem) => {
    setPaid(false);
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const changeQty = (id: string, delta: number) => {
    setPaid(false);
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id: string) => {
    setPaid(false);
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const checkout = () => {
    setPaid(true);
    setTimeout(() => {
      setCart([]);
      setPaid(false);
    }, 2500);
  };

  const categories: (MenuItem["category"] | "ทั้งหมด")[] = ["ทั้งหมด", "อาหาร", "เครื่องดื่ม", "ของหวาน"];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border bg-slate-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <Utensils className="h-5 w-5 text-accent" />
          <span className="font-semibold">POS ร้านอาหาร</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted">โต๊ะ:</span>
          <select
            value={table}
            onChange={(e) => setTable(Number(e.target.value))}
            className="rounded-lg border border-border bg-white px-2 py-1 text-sm outline-none focus:border-accent"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((t) => (
              <option key={t} value={t}>โต๊ะ {t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_320px]">
        <div className="p-4">
          <div className="mb-4 flex gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  filter === c
                    ? "bg-accent text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => addToCart(item)}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-white p-4 text-center transition-all hover:border-accent hover:shadow-md active:scale-95"
                >
                  <Icon className="h-8 w-8 text-accent transition-transform group-hover:scale-110" />
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-sm font-bold text-accent">฿{item.price}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col border-t border-border bg-slate-50 md:border-l md:border-t-0">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <ShoppingCart className="h-5 w-5 text-accent" />
            <span className="font-semibold">ออเดอร์ โต๊ะ {table}</span>
            {cart.length > 0 && (
              <span className="ml-auto rounded-full bg-accent px-2 py-0.5 text-xs text-white">
                {cart.reduce((s, i) => s + i.qty, 0)} ชิ้น
              </span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3" style={{ maxHeight: "300px" }}>
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center text-sm text-muted">
                <ShoppingCart className="mb-2 h-10 w-10 text-slate-300" />
                ยังไม่มีสินค้าในออเดอร์
                <span className="mt-1 text-xs">กดเมนูด้านซ้ายเพื่อเพิ่ม</span>
              </div>
            ) : (
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 rounded-lg border border-border bg-white p-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted">฿{item.price} × {item.qty}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => changeQty(item.id, -1)}
                        className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                      <button
                        onClick={() => changeQty(item.id, 1)}
                        className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-1 rounded p-1 text-red-400 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-border px-4 py-3">
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-muted">
                  <span>รวม</span>
                  <span>฿{total}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>VAT 7%</span>
                  <span>฿{vat}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
                  <span>รวมทั้งสิ้น</span>
                  <span className="text-accent">฿{grandTotal}</span>
                </div>
              </div>
              <button
                onClick={checkout}
                disabled={paid}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 py-2.5 font-semibold text-white transition-all hover:brightness-110 active:scale-95 disabled:opacity-60"
              >
                {paid ? (
                  <>✓ ชำระเงินสำเร็จ</>
                ) : (
                  <>
                    <Printer className="h-4 w-4" />
                    ชำระเงิน & พิมพ์ใบเสร็จ
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
