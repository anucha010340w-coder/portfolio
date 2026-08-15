"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ShoppingCart, Search, Star, Plus, Minus, Trash2, X,
  CreditCard, CheckCircle, ArrowLeft, Truck, Shield, RotateCcw,
  Heart,
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  category: string;
  desc: string;
  stock: number;
};

const allProducts: Product[] = [
  { id: "1", name: "เสื้อโปโล ผ้าฝ้าย 100%", price: 590, oldPrice: 890, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80", rating: 4.8, reviews: 234, badge: "ลด 34%", category: "เสื้อผ้า", desc: "เสื้อโปโลผ้าฝ้ายเกรดพรีเมียม นุ่มละมุน ใส่สบายตลอดวัน", stock: 15 },
  { id: "2", name: "รองเท้าผ้าใบแฟชั่น UNISEX", price: 1290, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", rating: 4.6, reviews: 189, category: "รองเท้า", desc: "รองเท้าผ้าใบดีไซน์ทันสมัย เบานุ่ม ใส่ได้ทุกโอกาส", stock: 8 },
  { id: "3", name: "นาฬิกาสปอร์ต Smart Watch", price: 1990, oldPrice: 2500, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", rating: 4.9, reviews: 512, badge: "ขายดี", category: "นาฬิกา", desc: "สมาร์ตวอทช์วัดชีพจร นับก้าว แจ้งเตือน กันน้ำ IP68", stock: 5 },
  { id: "4", name: "กระเป๋าสะพายหนังแท้", price: 890, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80", rating: 4.5, reviews: 97, category: "กระเป๋า", desc: "กระเป๋าหนังแท้คุณภาพดี ทนทาน ดีไซน์คลาสสิก", stock: 12 },
  { id: "5", name: "หูฟังบลูทูธ TWS", price: 1490, oldPrice: 1990, image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80", rating: 4.7, reviews: 343, badge: "ลด 25%", category: "อุปกรณ์", desc: "หูฟังไร้สายเสียงคมชัด กันเสียงรบกวน ใช้งาน 24 ชม.", stock: 20 },
  { id: "6", name: "แว่นกันแดด Polarized", price: 450, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80", rating: 4.3, reviews: 67, category: "อุปกรณ์", desc: "แว่นกันแดดเลนส์โพลาไรซ์ กัน UV400 ดีไซน์สวย", stock: 30 },
  { id: "7", name: "เข็มขัดหนังแท้", price: 350, oldPrice: 590, image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&q=80", rating: 4.4, reviews: 45, badge: "ลด 41%", category: "เสื้อผ้า", desc: "เข็มขัดหนังแท้คุณภาพดี ขนาดปรับได้", stock: 25 },
  { id: "8", name: "กระเป๋าเป้ผ้ากันน้ำ", price: 690, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80", rating: 4.6, reviews: 128, category: "กระเป๋า", desc: "เป้สะพายหลังกันน้ำ มีช่องใส่แล็ปท็อป 14 นิ้ว", stock: 10 },
];

const categories = ["ทั้งหมด", "เสื้อผ้า", "รองเท้า", "นาฬิกา", "กระเป๋า", "อุปกรณ์"];

type CartItem = { product: Product; qty: number };

export default function EcommercePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ทั้งหมด");
  const [showCart, setShowCart] = useState(false);
  const [showProduct, setShowProduct] = useState<Product | null>(null);
  const [checkout, setCheckout] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [favs, setFavs] = useState<string[]>([]);

  const filtered = allProducts.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "ทั้งหมด" || p.category === category;
    return matchSearch && matchCat;
  });

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = cartTotal >= 1000 ? 0 : 50;

  const addToCart = (product: Product) => {
    setOrdered(false);
    setCart((prev) => {
      const ex = prev.find((i) => i.product.id === product.id);
      if (ex) return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
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

  const toggleFav = (id: string) => {
    setFavs((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
  };

  const placeOrder = () => {
    setOrdered(true);
    setTimeout(() => {
      setCart([]);
      setShowCart(false);
      setCheckout(false);
      setOrdered(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Store Header */}
      <header className="sticky top-[53px] z-40 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">
              <ShoppingCart className="h-6 w-6 text-slate-900" />
            </span>
            <div>
              <h1 className="text-lg font-bold text-slate-800">AW Shop</h1>
              <p className="text-xs text-slate-500">ร้านค้าออนไลน์</p>
            </div>
          </div>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหาสินค้า..."
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none focus:border-slate-400 focus:bg-white"
            />
          </div>

          <button
            onClick={() => setShowCart(true)}
            className="relative flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">ตะกร้า</span>
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-xs text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Category bar */}
        <div className="border-t border-slate-100">
          <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={"whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors " + (category === c ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100")}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero banner */}
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="overflow-hidden rounded-2xl bg-slate-900 p-6 text-white md:p-8">
          <h2 className="text-2xl font-bold md:text-3xl">ลดราคาสูงสุด 50%</h2>
          <p className="mt-2 text-slate-300">ช้อปสินค้าคุณภาพราคาพิเศษ จัดส่งฟรีเมื่อสั่งซื้อ ฿1,000+</p>
        </div>
      </div>

      {/* Trust badges */}
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Truck, label: "จัดส่งฟรี ฿1,000+", desc: "ทั่วประเทศ" },
            { icon: Shield, label: "รับประกันของแท้", desc: "100%" },
            { icon: RotateCcw, label: "คืนสินค้าได้", desc: "ภายใน 7 วัน" },
          ].map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.label} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-3">
                <Icon className="h-5 w-5 text-slate-700" />
                <div>
                  <p className="text-xs font-semibold text-slate-700">{b.label}</p>
                  <p className="text-xs text-slate-500">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Products */}
      <div className="mx-auto max-w-6xl px-4 pb-24">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            พบ {filtered.length} สินค้า
            {category !== "ทั้งหมด" && <span className="ml-1">ในหมวด {category}</span>}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <div key={p.id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-lg">
              <div
                className="relative flex aspect-square cursor-pointer items-center justify-center bg-slate-50"
                onClick={() => setShowProduct(p)}
              >
                <Image src={p.image} alt={p.name} width={400} height={400} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                {p.badge && (
                  <span className="absolute left-2 top-2 rounded-full bg-slate-900 px-2 py-0.5 text-xs font-medium text-white">
                    {p.badge}
                  </span>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFav(p.id); }}
                  className="absolute right-2 top-2 rounded-full bg-white/80 p-1.5 backdrop-blur"
                >
                  <Heart className={"h-4 w-4 " + (favs.includes(p.id) ? "fill-red-500 text-red-500" : "text-slate-400")} />
                </button>
              </div>
              <div className="p-3">
                <h4
                  className="line-clamp-2 cursor-pointer text-sm font-medium text-slate-800 hover:text-slate-600"
                  onClick={() => setShowProduct(p)}
                >
                  {p.name}
                </h4>
                <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {p.rating} ({p.reviews})
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-slate-900">฿{p.price}</span>
                    {p.oldPrice && (
                      <span className="ml-1 text-xs text-slate-400 line-through">฿{p.oldPrice}</span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(p)}
                    className="rounded-lg bg-slate-900 p-2 text-white transition-all hover:bg-slate-800 active:scale-90"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search className="mb-3 h-12 w-12 text-slate-300" />
            <p className="text-slate-500">ไม่พบสินค้าที่ค้นหา</p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {showProduct && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4" onClick={() => setShowProduct(null)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white" onClick={(e) => e.stopPropagation()}>
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 overflow-hidden bg-slate-50 md:h-full">
                <Image src={showProduct.image} alt={showProduct.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    {showProduct.badge && (
                      <span className="mb-2 inline-block rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
                        {showProduct.badge}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-slate-800">{showProduct.name}</h3>
                  </div>
                  <button onClick={() => setShowProduct(null)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {showProduct.rating} · {showProduct.reviews} รีวิว
                </div>
                <p className="mt-3 text-sm text-slate-600">{showProduct.desc}</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-2xl font-bold text-blue-600">฿{showProduct.price}</span>
                  {showProduct.oldPrice && (
                    <span className="text-lg text-slate-400 line-through">฿{showProduct.oldPrice}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  คงเหลือ: {showProduct.stock} ชิ้น
                  {showProduct.stock <= 5 && <span className="ml-1 text-red-500">(ใกล้หมด!)</span>}
                </p>
                <button
                  onClick={() => { addToCart(showProduct); setShowProduct(null); setShowCart(true); }}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-semibold text-white transition-all hover:bg-slate-800 active:scale-95"
                >
                  <ShoppingCart className="h-4 w-4" />
                  หยิบใส่ตะกร้า
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-[70] flex justify-end bg-black/50" onClick={() => setShowCart(false)}>
          <div className="flex w-full max-w-md flex-col bg-white" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <h3 className="font-bold text-slate-800">ตะกร้าสินค้า ({cartCount})</h3>
              <button onClick={() => setShowCart(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                  {ordered ? (
                    <>
                      <CheckCircle className="mb-3 h-16 w-16 text-green-500" />
                      <p className="text-lg font-bold text-slate-800">สั่งซื้อสำเร็จ!</p>
                      <p className="mt-1 text-sm text-slate-500">ขอบคุณที่ช้อปกับ AW Shop</p>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mb-3 h-12 w-12 text-slate-300" />
                      <p className="text-sm text-slate-500">ตะกร้าว่างเปล่า</p>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-3 rounded-xl border border-slate-200 p-3">
                      <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-slate-50">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="line-clamp-1 text-sm font-medium text-slate-800">{item.product.name}</p>
                        <p className="text-sm font-bold text-slate-900">฿{item.product.price}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <button onClick={() => changeQty(item.product.id, -1)} className="rounded border border-slate-200 p-1 text-slate-400 hover:bg-slate-100">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                          <button onClick={() => changeQty(item.product.id, 1)} className="rounded border border-slate-200 p-1 text-slate-400 hover:bg-slate-100">
                            <Plus className="h-3 w-3" />
                          </button>
                          <button onClick={() => changeQty(item.product.id, -item.qty)} className="ml-auto text-xs text-red-500 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-slate-200 p-4">
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>ยอดสินค้า</span><span>฿{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>ค่าจัดส่ง</span>
                    <span>{shipping === 0 ? "ฟรี" : `฿${shipping}`}</span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-green-600">จัดส่งฟรี (สั่งซื้อขั้นต่ำ ฿1,000)</p>
                  )}
                  <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-800">
                    <span>รวมทั้งสิ้น</span><span className="text-slate-900">฿{cartTotal + shipping}</span>
                  </div>
                </div>

                {!checkout ? (
                  <button
                    onClick={() => setCheckout(true)}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-semibold text-white transition-all hover:bg-slate-800 active:scale-95"
                  >
                    ดำเนินการสั่งซื้อ <ArrowLeft className="h-4 w-4 rotate-180" />
                  </button>
                ) : (
                  <div className="mt-3 space-y-3">
                    <div className="rounded-xl border border-slate-200 p-3">
                      <p className="mb-2 text-sm font-semibold text-slate-700">ที่อยู่จัดส่ง</p>
                      <input placeholder="ชื่อ-นามสกุล" className="mb-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
                      <input placeholder="ที่อยู่" className="mb-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
                      <div className="grid grid-cols-2 gap-2">
                        <input placeholder="เบอร์โทร" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
                        <input placeholder="รหัสไปรษณีย์" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
                      </div>
                    </div>
                    <div className="rounded-xl border border-slate-200 p-3">
                      <p className="mb-2 text-sm font-semibold text-slate-700">วิธีชำระเงิน</p>
                      <div className="space-y-2">
                        {[
                          { label: "เก็บเงินปลายทาง", desc: "ชำระเงินสดเมื่อรับสินค้า" },
                          { label: "โอนผ่านธนาคาร", desc: "SCB / KBANK / BBL" },
                          { label: "บัตรเครดิต", desc: "Visa / Mastercard" },
                        ].map((m, i) => (
                          <label key={m.label} className="flex items-center gap-2 rounded-lg border border-slate-200 p-2 cursor-pointer hover:bg-slate-50">
                            <input type="radio" name="pay" defaultChecked={i === 0} className="accent-blue-600" />
                            <div>
                              <p className="text-sm font-medium text-slate-700">{m.label}</p>
                              <p className="text-xs text-slate-500">{m.desc}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={placeOrder}
                      disabled={ordered}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-semibold text-white transition-all hover:bg-slate-800 active:scale-95 disabled:opacity-60"
                    >
                      <CreditCard className="h-4 w-4" />
                      {ordered ? "✓ สั่งซื้อสำเร็จ" : "สั่งซื้อ · ฿" + (cartTotal + shipping)}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
