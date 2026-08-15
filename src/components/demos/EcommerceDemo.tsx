"use client";

import { useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2, Search, Star, CreditCard, Shirt, Footprints, Watch, Briefcase, Headphones, Glasses } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  icon: LucideIcon;
  rating: number;
  badge?: string;
};

const products: Product[] = [
  { id: "1", name: "เสื้อโปโล ผ้าฝ้าย", price: 590, oldPrice: 890, icon: Shirt, rating: 4.8, badge: "ลด 34%" },
  { id: "2", name: "รองเท้าผ้าใบแฟชั่น", price: 1290, icon: Footprints, rating: 4.6 },
  { id: "3", name: "นาฬิกาสปอร์ต", price: 1990, oldPrice: 2500, icon: Watch, rating: 4.9, badge: "ขายดี" },
  { id: "4", name: "กระเป๋าสะพายหนัง", price: 890, icon: Briefcase, rating: 4.5 },
  { id: "5", name: "หูฟังบลูทูธ", price: 1490, oldPrice: 1990, icon: Headphones, rating: 4.7, badge: "ลด 25%" },
  { id: "6", name: "แว่นกันแดด", price: 450, icon: Glasses, rating: 4.3 },
];

export default function EcommerceDemo() {
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
  const [search, setSearch] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);

  const addToCart = (product: Product) => {
    setOrdered(false);
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
  };

  const changeQty = (id: string, delta: number) => {
    setOrdered(false);
    setCart((prev) =>
      prev
        .map((i) => i.product.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter((i) => i.qty > 0)
    );
  };

  const placeOrder = () => {
    setOrdered(true);
    setTimeout(() => {
      setCart([]);
      setShowCart(false);
      setOrdered(false);
    }, 2500);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border bg-slate-50 px-4 py-3">
        <span className="font-semibold">ร้านค้าออนไลน์</span>
        <button
          onClick={() => setShowCart((v) => !v)}
          className="relative flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-1.5 text-sm font-medium transition-colors hover:border-accent"
        >
          <ShoppingCart className="h-4 w-4" />
          ตะกร้า
          {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      <div className="p-4">
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาสินค้า..."
            className="w-full rounded-lg border border-border bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-accent"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {filtered.map((p) => (
            <div key={p.id} className="group overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-md">
              <div className="relative flex h-28 items-center justify-center bg-slate-50">
                <p.icon className="h-10 w-10 text-slate-300" />
                {p.badge && (
                  <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="p-3">
                <h4 className="line-clamp-1 text-sm font-medium">{p.name}</h4>
                <div className="mt-1 flex items-center gap-1 text-xs text-muted">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {p.rating}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-accent">฿{p.price}</span>
                    {p.oldPrice && (
                      <span className="ml-1 text-xs text-slate-400 line-through">฿{p.oldPrice}</span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(p)}
                    className="rounded-lg bg-accent p-1.5 text-white transition-all hover:bg-accent-2 active:scale-90"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-muted">
            ไม่พบสินค้าที่ค้นหา
          </div>
        )}
      </div>

      {showCart && (
        <div className="border-t border-border bg-slate-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="font-semibold">ตะกร้าสินค้า ({cartCount})</h4>
            {cart.length > 0 && (
              <button
                onClick={() => setCart([])}
                className="text-sm text-red-500 hover:text-red-600"
              >
                ล้างตะกร้า
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted">
              {ordered ? "✓ สั่งซื้อสำเร็จ! ขอบคุณค่ะ" : "ตะกร้าว่างเปล่า"}
            </div>
          ) : (
            <>
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 rounded-lg border border-border bg-white p-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50">
                      <item.product.icon className="h-4 w-4 text-slate-400" />
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.product.name}</p>
                      <p className="text-xs text-muted">฿{item.product.price}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => changeQty(item.product.id, -1)}
                        className="rounded p-1 text-slate-400 hover:bg-slate-100"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                      <button
                        onClick={() => changeQty(item.product.id, 1)}
                        className="rounded p-1 text-slate-400 hover:bg-slate-100"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => changeQty(item.product.id, -item.qty)}
                        className="ml-1 rounded p-1 text-red-400 hover:bg-red-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <span className="font-semibold">รวมทั้งสิ้น</span>
                <span className="text-lg font-bold text-accent">฿{cartTotal}</span>
              </div>
              <button
                onClick={placeOrder}
                disabled={ordered}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 py-2.5 font-semibold text-white transition-all hover:brightness-110 active:scale-95 disabled:opacity-60"
              >
                <CreditCard className="h-4 w-4" />
                {ordered ? "✓ สั่งซื้อสำเร็จ" : "สั่งซื้อ & ชำระเงิน"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
