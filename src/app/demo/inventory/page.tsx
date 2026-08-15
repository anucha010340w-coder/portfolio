"use client";

import { useState, useMemo } from "react";
import {
  Package, Search, Plus, Minus, AlertTriangle,
  TrendingUp, TrendingDown, Boxes, Wallet, X, History,
} from "lucide-react";

type StockItem = {
  id: string;
  name: string;
  sku: string;
  stock: number;
  minStock: number;
  price: number;
  category: string;
};

const initialItems: StockItem[] = [
  { id: "1", name: "เสื้อยืดคอกลม", sku: "SKU-001", stock: 120, minStock: 20, price: 250, category: "เสื้อผ้า" },
  { id: "2", name: "กางเกงยีนส์", sku: "SKU-002", stock: 85, minStock: 15, price: 890, category: "เสื้อผ้า" },
  { id: "3", name: "รองเท้าผ้าใบ", sku: "SKU-003", stock: 4, minStock: 10, price: 1290, category: "รองเท้า" },
  { id: "4", name: "หมวกแก๊ป", sku: "SKU-004", stock: 56, minStock: 10, price: 350, category: "เสื้อผ้า" },
  { id: "5", name: "เข็มขัดหนัง", sku: "SKU-005", stock: 2, minStock: 8, price: 450, category: "เสื้อผ้า" },
  { id: "6", name: "นาฬิกาสปอร์ต", sku: "SKU-006", stock: 15, minStock: 5, price: 1990, category: "อุปกรณ์" },
  { id: "7", name: "หูฟังบลูทูธ", sku: "SKU-007", stock: 30, minStock: 8, price: 1490, category: "อุปกรณ์" },
  { id: "8", name: "แว่นกันแดด", sku: "SKU-008", stock: 45, minStock: 10, price: 590, category: "อุปกรณ์" },
  { id: "9", name: "กระเป๋าสะพาย", sku: "SKU-009", stock: 18, minStock: 5, price: 1290, category: "กระเป๋า" },
  { id: "10", name: "เป้กันน้ำ", sku: "SKU-010", stock: 22, minStock: 8, price: 690, category: "กระเป๋า" },
];

type Movement = {
  id: string;
  itemId: string;
  itemName: string;
  type: "in" | "out";
  qty: number;
  time: string;
};

export default function InventoryPage() {
  const [items, setItems] = useState<StockItem[]>(initialItems);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ทั้งหมด");
  const [showAdjust, setShowAdjust] = useState<StockItem | null>(null);
  const [adjustQty, setAdjustQty] = useState(1);
  const [adjustType, setAdjustType] = useState<"in" | "out">("in");
  const [movements, setMovements] = useState<Movement[]>([
    { id: "1", itemId: "1", itemName: "เสื้อยืดคอกลม", type: "in", qty: 50, time: "09:30" },
    { id: "2", itemId: "3", itemName: "รองเท้าผ้าใบ", type: "out", qty: 8, time: "10:15" },
    { id: "3", itemId: "6", itemName: "นาฬิกาสปอร์ต", type: "in", qty: 10, time: "11:00" },
    { id: "4", itemId: "5", itemName: "เข็มขัดหนัง", type: "out", qty: 5, time: "13:20" },
  ]);

  const categories = ["ทั้งหมด", "เสื้อผ้า", "รองเท้า", "อุปกรณ์", "กระเป๋า"];

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase());
      const matchCat = filter === "ทั้งหมด" || item.category === filter;
      return matchSearch && matchCat;
    });
  }, [items, search, filter]);

  const lowStock = items.filter((i) => i.stock <= i.minStock);
  const totalValue = items.reduce((s, i) => s + i.stock * i.price, 0);
  const totalItems = items.reduce((s, i) => s + i.stock, 0);

  const adjustStock = () => {
    if (!showAdjust) return;
    setItems((prev) =>
      prev.map((i) =>
        i.id === showAdjust.id
          ? { ...i, stock: adjustType === "in" ? i.stock + adjustQty : Math.max(0, i.stock - adjustQty) }
          : i
      )
    );
    setMovements((prev) => [
      {
        id: Date.now().toString(),
        itemId: showAdjust.id,
        itemName: showAdjust.name,
        type: adjustType,
        qty: adjustQty,
        time: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }),
      },
      ...prev,
    ]);
    setShowAdjust(null);
    setAdjustQty(1);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
            <Boxes className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800">AW Inventory</h1>
            <p className="text-xs text-slate-500">ระบบจัดการคลังสินค้า</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-sm text-slate-500">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          อัปเดตเรียลไทม์
        </span>
      </header>

      {/* Stats Cards */}
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2 text-slate-500">
              <Package className="h-4 w-4" />
              <span className="text-xs">สินค้าทั้งหมด</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-slate-800">{totalItems.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2 text-slate-500">
              <Wallet className="h-4 w-4" />
              <span className="text-xs">มูลค่าสต็อก</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-slate-900">฿{(totalValue / 1000000).toFixed(1)}M</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2 text-slate-500">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs">รับเข้าวันนี้</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-green-600">
              {movements.filter((m) => m.type === "in").reduce((s, m) => s + m.qty, 0)}
            </p>
          </div>
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <div className="flex items-center gap-2 text-red-500">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs">ใกล้หมด</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-red-600">{lowStock.length}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Stock Table */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-slate-200 bg-white">
              {/* Search & Filter */}
              <div className="border-b border-slate-200 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="ค้นหาสินค้าหรือ SKU..."
                      className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex gap-2 overflow-x-auto">
                    {categories.map((c) => (
                      <button
                        key={c}
                        onClick={() => setFilter(c)}
                        className={"whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors " + (filter === c ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200") + ""}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Table (desktop) */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-xs text-slate-500">
                      <th className="px-4 py-3 font-medium">SKU</th>
                      <th className="px-4 py-3 font-medium">สินค้า</th>
                      <th className="px-4 py-3 text-right font-medium">สต็อก</th>
                      <th className="px-4 py-3 text-right font-medium">ราคา</th>
                      <th className="px-4 py-3 text-center font-medium">สถานะ</th>
                      <th className="px-4 py-3 text-right font-medium">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item) => {
                      const isLow = item.stock <= item.minStock;
                      return (
                        <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="px-4 py-3 text-slate-500">{item.sku}</td>
                          <td className="px-4 py-3 font-medium text-slate-800">{item.name}</td>
                          <td className="px-4 py-3 text-right font-semibold text-slate-800">{item.stock}</td>
                          <td className="px-4 py-3 text-right text-slate-600">฿{item.price.toLocaleString()}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={"inline-block rounded-full px-2 py-0.5 text-xs font-medium " + (isLow ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700") + ""}>
                              {isLow ? "ใกล้หมด" : "ปกติ"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => { setShowAdjust(item); setAdjustType("in"); setAdjustQty(1); }}
                              className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
                            >
                              ปรับสต็อก
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <div className="py-12 text-center text-slate-400">
                    <Package className="mx-auto mb-2 h-12 w-12" />
                    <p>ไม่พบสินค้าที่ค้นหา</p>
                  </div>
                )}
              </div>

              {/* Card list (mobile) */}
              <div className="divide-y divide-slate-100 md:hidden">
                {filtered.map((item) => {
                  const isLow = item.stock <= item.minStock;
                  return (
                    <div key={item.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-slate-800">{item.name}</p>
                          <p className="text-xs text-slate-500">{item.sku}</p>
                        </div>
                        <span className={"inline-block rounded-full px-2 py-0.5 text-xs font-medium " + (isLow ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700") + ""}>
                          {isLow ? "ใกล้หมด" : "ปกติ"}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex gap-4 text-sm">
                          <div>
                            <span className="text-slate-500">สต็อก: </span>
                            <span className="font-semibold text-slate-800">{item.stock}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">ราคา: </span>
                            <span className="text-slate-700">฿{item.price.toLocaleString()}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => { setShowAdjust(item); setAdjustType("in"); setAdjustQty(1); }}
                          className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 active:bg-slate-200"
                        >
                          ปรับสต็อก
                        </button>
                      </div>
                    </div>
                  );
                })}
                {filtered.length === 0 && (
                  <div className="py-12 text-center text-slate-400">
                    <Package className="mx-auto mb-2 h-12 w-12" />
                    <p>ไม่พบสินค้าที่ค้นหา</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Movement History */}
          <div className="rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center gap-2 border-b border-slate-200 p-4">
              <History className="h-5 w-5 text-slate-700" />
              <h3 className="font-semibold text-slate-800">การเคลื่อนไหวสินค้า</h3>
            </div>
            <div className="max-h-[500px] overflow-y-auto p-4">
              <div className="space-y-3">
                {movements.map((m) => (
                  <div key={m.id} className="flex items-center gap-3 rounded-lg border border-slate-100 p-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      m.type === "in" ? "bg-green-50" : "bg-red-50"
                    }`}>
                      {m.type === "in" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">{m.itemName}</p>
                      <p className="text-xs text-slate-500">
                        {m.type === "in" ? "รับเข้า" : "ส่งออก"} {m.qty} ชิ้น · {m.time} น.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Adjust Stock Modal */}
      {showAdjust && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowAdjust(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">ปรับสต็อกสินค้า</h3>
              <button onClick={() => setShowAdjust(null)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-4 rounded-lg bg-slate-50 p-3">
              <p className="text-sm font-medium text-slate-800">{showAdjust.name}</p>
              <p className="text-xs text-slate-500">{showAdjust.sku} · สต็อกปัจจุบัน: {showAdjust.stock} ชิ้น</p>
            </div>
            <div className="mb-4">
              <p className="mb-2 text-sm font-medium text-slate-700">ประเภท</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setAdjustType("in")}
                  className={`flex items-center justify-center gap-2 rounded-lg border-2 py-2.5 text-sm font-medium transition-all ${
                    adjustType === "in"
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-slate-200 text-slate-600"
                  }`}
                >
                  <TrendingUp className="h-4 w-4" /> รับเข้า
                </button>
                <button
                  onClick={() => setAdjustType("out")}
                  className={`flex items-center justify-center gap-2 rounded-lg border-2 py-2.5 text-sm font-medium transition-all ${
                    adjustType === "out"
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-slate-200 text-slate-600"
                  }`}
                >
                  <TrendingDown className="h-4 w-4" /> ส่งออก
                </button>
              </div>
            </div>
            <div className="mb-4">
              <p className="mb-2 text-sm font-medium text-slate-700">จำนวน</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAdjustQty((q) => Math.max(1, q - 1))}
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  value={adjustQty}
                  onChange={(e) => setAdjustQty(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-center text-sm outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => setAdjustQty((q) => q + 1)}
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mb-4 rounded-lg bg-slate-50 p-3 text-center">
              <p className="text-xs text-slate-500">สต็อกหลังปรับ</p>
              <p className="text-xl font-bold text-slate-900">
                {adjustType === "in" ? showAdjust.stock + adjustQty : Math.max(0, showAdjust.stock - adjustQty)} ชิ้น
              </p>
            </div>
            <button
              onClick={adjustStock}
              className="w-full rounded-lg bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              ยืนยัน
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
