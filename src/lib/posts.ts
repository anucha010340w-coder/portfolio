export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  readingTime: string;
  tags: string[];
  category: string;
  body: string; // เนื้อหา HTML (เขียนด้วย HTML ง่ายๆ)
};

export const posts: Post[] = [
  {
    slug: "why-business-need-website-2026",
    title: "ทำไมธุรกิจในปี 2026 ต้องมีเว็บไซต์ ถ้ามี Facebook และ LINE แล้วไม่พูดหรือ?",
    description:
      "วิเคราะห์เหตุผลจริงๆ ว่าทำไมเว็บไซต์ยังจำเป็นสำหรับธุรกิจ แม้จะมีโซเชียลมีเดียแล้ว พร้อมตัวอย่างและวิธีเริ่มต้น",
    date: "2026-08-10",
    readingTime: "6 นาที",
    tags: ["เว็บไซต์", "ธุรกิจ", "การตลาด"],
    category: "ธุรกิจ",
    body: `
<p>หลายคนถามผมว่า "มีเพจ Facebook และ LINE OA แล้ว ยังต้องทำเว็บไซต์อีกเหรอ?" คำตอบสั้นๆ คือ <strong>ถ้าอยากให้ธุรกิจโตและน่าเชื่อถือ ก็ต้องมี</strong> มาดูเหตุผลกัน</p>

<h2>1. เว็บไซต์คือ "หน้าบ้าน" ของธุรกิจ</h2>
<p>ลองนึกภาพว่าคุณไปหาบริการหรือสินค้าสักอย่าง คุณจะเชื่อใจร้านที่มีแค่เพจ Facebook หรือร้านที่มีเว็บไซต์สวยๆ มีรายละเอียดครบ มีที่อยู่ชัดเจน? ส่วนใหญ่ลูกค้าจะเช็คเว็บไซต์ก่อนตัดสินใจ โดยเฉพาะลูกค้า B2B หรือลูกค้าที่มีงบสูง</p>

<h2>2. Google คือช่องทางหาลูกค้าใหม่ที่ทรงพลังที่สุด</h2>
<p>เมื่อคนต้องการสินค้า/บริการ สิ่งแรกที่ทำคือ <strong>เสิร์ช Google</strong> ถ้าคุณไม่มีเว็บไซต์ คุณหายไปจากช่องทางที่คนค้นหาสูงสุด โซเชียลมีเดียไม่ได้ถูก index บน Google เท่าเว็บไซต์</p>
<ul>
  <li>คนเสิร์ช "รับทำเว็บไซต์" → ต้องเจอเว็บคุณ</li>
  <li>คนเสิร์ช "ร้านอาหารใกล้ฉัน" → ต้องเจอเว็บร้านคุณ</li>
  <li>คนเสิร์ช "บริการขนส่ง" → ต้องเจอเว็บบริษัทคุณ</li>
</ul>

<h2>3. เว็บไซต์เป็นของคุณ โซเชียลมีเดียเป็นของแพลตฟอร์ม</h2>
<p>Facebook เปลี่ยน algorithm ได้ทุกวัน วันนี้โพสต์ของคุณอาจเห็นแค่ 5% ของคนติดตาม แต่เว็บไซต์เป็นของคุณ คุณควบคุมได้เต็มที่ ไม่มีใครมาจำกัดการเข้าถึงลูกค้า</p>

<h2>4. เว็บไซต์ทำงานให้คุณ 24 ชั่วโมง</h2>
<p>เว็บไซต์สามารถรับคำสั่งซื้อ ตอบคำถาม แสดงแคตตาล็อก จองคิว โดยที่คุณไม่ต้องนั่งตอบ ลองนึกถึงระบบจองออนไลน์ ระบบขายสินค้า หรือระบบ FAQ ที่ลดภาระพนักงานได้มาก</p>

<h2>5. รวบรวมข้อมูลลูกค้าได้</h2>
<p>เว็บไซต์ให้คุณเก็บข้อมูลพฤติกรรมลูกค้าผ่าน Google Analytics รู้ว่าลูกค้ามาจากไหน ดูหน้าไหน สนใจสินค้าอะไร แล้วนำข้อมูลไปปรับกลยุทธ์การตลาด</p>

<h2>เริ่มต้นอย่างไร?</h2>
<p>ถ้างบจำกัด เริ่มจากเว็บไซต์นำเสนอ (Landing Page) ก่อนก็ได้ แค่ 1-2 หน้า แต่ต้องมีข้อมูลครบ: บอกว่าคุณเป็นใคร ขายอะไร ติดต่อยังไง และที่สำคัญ <strong>ต้องติดอันดับ Google</strong> ด้วย SEO</p>
<p>พอธุรกิจโต ค่อยขยายเป็นเว็บขายของ ระบบจอง หรือระบบจัดการ ผมเองก็รับทำตั้งแต่เว็บ 1 หน้า ไปจนถึงระบบเต็มรูปแบบ ขอแค่รู้วัตถุประสงค์และงบ ก็วางแผนได้</p>

<blockquote>สรุป: เว็บไซต์ไม่ใช่ตัวเลือก แต่เป็น "พื้นฐาน" ของธุรกิจยุคดิจิทัล โซเชียลมีเดียเป็นช่องทางเสริม ไม่ใช่ตัวแทนของเว็บไซต์</blockquote>

<p>📌 อยากให้ผมช่วยทำเว็บไซต์ให้ธุรกิจของคุณ? ดู <a href="/services">บริการของผม</a> หรือ <a href="/contact">ติดต่อปรึกษาฟรี</a> ได้เลย หรือลอง <a href="/demo">ทดลองใช้งานระบบตัวอย่าง</a> ก่อนตัดสินใจ</p>
`,
  },
  {
    slug: "seo-checklist-2026",
    title: "SEO Checklist 2026: 12 ข้อที่เว็บไซต์ต้องมีเพื่อติดอันดับ Google",
    description:
      "รายการตรวจสอบ SEO ที่ผมใช้จริงกับเว็บลูกค้า ทำครบทุกข้อแล้วติดอันดับได้แน่นอน",
    date: "2026-08-05",
    readingTime: "8 นาที",
    tags: ["SEO", "เว็บไซต์", "Google"],
    category: "SEO",
    body: `
<p>หลายคนทำเว็บเสร็จแล้วรอให้ Google มาเก็บไปแสดงผลเอง จริงๆ ต้อง "ทำ" ให้ Google เห็นและเข้าใจเว็บเรา นี่คือ checklist ที่ผมใช้กับทุกเว็บที่ทำ</p>

<h2>1. ใช้ HTTPS (SSL)</h2>
<p>Google ให้ความสำคัญกับเว็บที่ปลอดภัย ปัจจุบัน SSL ฟรีจาก Let's Encrypt หรือ Vercel ไม่มีเหตุผลที่จะไม่ใช้</p>

<h2>2. Title และ Meta Description ทุกหน้า</h2>
<p>ทุกหน้าต้องมี title ที่สื่อความหมายและมี keyword ที่ต้องการ และ meta description ที่ดึงดูดให้คนคลิก ตัวอย่าง:</p>
<ul>
  <li><code>&lt;title&gt;รับทำเว็บไซต์ราคาคุย | อนุชา วังราช&lt;/title&gt;</code></li>
  <li><code>&lt;meta name="description" content="..."&gt;</code></li>
</ul>

<h2>3. โครงสร้างหัวข้อ (H1, H2, H3) ถูกต้อง</h2>
<p>หน้าหนึ่งควรมี H1 อันเดียว แล้วแบ่งหัวข้อย่อยด้วย H2, H3 ตามลำดับความสำคัญ Google ใช้โครงสร้างนี้เข้าใจเนื้อหา</p>

<h2>4. URL ที่อ่านง่าย (Clean URL)</h2>
<p>ใช้ URL แบบ <code>/blog/seo-checklist</code> แทน <code>/blog?id=123</code> ทั้งคนและ Google เข้าใจง่ายกว่า</p>

<h2>5. Sitemap.xml</h2>
<p>สร้าง sitemap ส่งให้ Google Search Console เพื่อบอกว่าเว็บมีหน้าอะไรบ้าง อัปเดตเมื่อไหร่</p>

<h2>6. Robots.txt</h2>
<p>บอก Google ว่าหน้าไหน index ได้ หน้าไหนห้าม ป้องกันหน้า admin หรือหน้าทดสอบถูก index</p>

<h2>7. ความเร็วเว็บ (Core Web Vitals)</h2>
<p>Google วัด LCP, FID, CLS ถ้าเว็บช้าหรือกระตุก คะแนนจะตก ใช้ Next.js หรือ Astro ช่วยได้มาก</p>

<h2>8. รองรับมือถือ (Mobile-Friendly)</h2>
<p>Google ใช้ mobile-first indexing คือเก็บเว็บเวอร์ชันมือถือเป็นหลัก ถ้าเว็บคุณไม่ responsive บนมือถือ อันดับจะตก</p>

<h2>9. รูปภาพต้องมี alt</h2>
<p>ทุกรูปต้องมี <code>alt</code> บอกว่ารูปคืออะไร ทั้งเพื่อ SEO และ accessibility</p>

<h2>10. Structured Data (JSON-LD)</h2>
<p>บอก Google แบบเป็นโครงสร้างว่าเว็บคุณเป็นบุคคล ธุรกิจ บทความ หรือสินค้า ทำให้แสดงผลได้สวยขึ้นในผลค้นหา</p>

<h2>11. เนื้อหาคุณภาพและอัปเดตสม่ำเสมอ</h2>
<p>Google ชอบเว็บที่มีเนื้อหาเป็นประโยชน์ ตอบคำถามผู้ใช้ และอัปเดตบ่อย บล็อกเป็นวิธีที่ดีในการเพิ่มเนื้อหา</p>

<h2>12. ลิงก์เข้าเว็บ (Backlinks)</h2>
<p>ลิงก์จากเว็บอื่นเข้าเว็บคุณเป็นเสมือน "โหวต" ยิ่งเว็บที่ลิงก์มาน่าเชื่อถือมาก อันดับยิ่งดีขึ้น</p>

<blockquote>ทำครบ 12 ข้อนี้แล้ว อันดับ Google จะดีขึ้นแน่นอน แต่ต้องใช้เวลา 1-3 เดือน อดทนและอัปเดตเนื้อหาต่อเนื่อง</blockquote>

<p>📌 อยากให้เว็บติดอันดับ Google จริง? ดู <a href="/services">บริการทำเว็บไซต์ + SEO</a> ของผม หรือ <a href="/contact">ทักปรึกษาฟรี</a> ได้เลย</p>
`,
  },
  {
    slug: "how-to-choose-tech-stack",
    title: "เลือกเทคโนโลยีพัฒนาเว็บยังไง ให้เหมาะกับงบและธุรกิจ",
    description:
      "คู่มือเลือก tech stack สำหรับคนอยากทำเว็บหรือแอพ อธิบายแบบเข้าใจง่าย ไม่ต้องเป็น Developer ก็อ่านรู้เรื่อง",
    date: "2026-07-28",
    readingTime: "7 นาที",
    tags: ["เทคโนโลยี", "เว็บแอพ", "คำแนะนำ"],
    category: "เทคโนโลยี",
    body: `
<p>ลูกค้ามักถามผมว่า "จะทำเว็บ/แอพ ควรใช้เทคโนโลยีอะไรดี?" คำตอบคือ <strong>ขึ้นกับวัตถุประสงค์และงบ</strong> บทความนี้จะอธิบายแบบเข้าใจง่าย ไม่ต้องเป็น Developer ก็อ่านรู้เรื่อง</p>

<h2>1. เว็บนำเสนอ (Landing Page / เว็บบริษัท)</h2>
<p>เป้าหมาย: นำเสนอข้อมูล ดึงลูกค้าผ่าน Google</p>
<p>แนะนำ: <strong>Next.js + Tailwind</strong> หรือ <strong>Astro</strong></p>
<ul>
  <li>โหลดเร็ว ติดอันดับ Google ดี</li>
  <li>งบประมาณต่ำ-กลาง</li>
  <li>เหมาะกับเว็บที่เน้นเนื้อหา</li>
</ul>

<h2>2. เว็บแอพพลิเคชัน (Web App)</h2>
<p>เป้าหมาย: ระบบที่ผู้ใช้ login ใช้งานจริง เช่น ระบบจัดการ ระบบจอง</p>
<p>แนะนำ: <strong>Next.js + TypeScript + PostgreSQL</strong></p>
<ul>
  <li>รองรับการทำงานซับซ้อน</li>
  <li>รักษาสถานะผู้ใช้ จัดการสิทธิ์</li>
  <li>งบประมาณกลาง-สูง</li>
</ul>

<h2>3. ระบบขายของออนไลน์ (E-Commerce)</h2>
<p>เป้าหมาย: ขายสินค้า รับชำระเงิน จัดการสต็อก</p>
<p>แนะนำ: <strong>Next.js + Stripe/Payment Gateway + CMS</strong> หรือใช้ <strong>Shopify</strong> ถ้าเริ่มต้น</p>
<ul>
  <li>Next.js: ยืดหยุ่น ปรับแต่งได้เต็มที่</li>
  <li>Shopify: เริ่มเร็ว จ่ายรายเดือน</li>
  <li>งบประมาณกลาง-สูง</li>
</ul>

<h2>4. แอพมือถือ (Mobile App)</h2>
<p>เป้าหมาย: แอพบน iOS/Android</p>
<p>แนะนำ: <strong>React Native</strong> หรือ <strong>Flutter</strong></p>
<ul>
  <li>Cross-platform: ทำครั้งเดียว ใช้ได้ทั้ง iOS/Android</li>
  <li>ประหยัดงบกว่าทำ Native แยก</li>
  <li>งบประมาณสูง</li>
</ul>

<h2>5. ระบบ POS</h2>
<p>เป้าหมาย: ขายหน้าร้าน พิมพ์ใบเสร็จ จัดการสต็อก</p>
<p>แนะนำ: <strong>Next.js + Electron</strong> สำหรับ desktop หรือ <strong>Next.js + PWA</strong> สำหรับ tablet</p>
<ul>
  <li>ทำงานได้ทั้งออนไลน์และออฟไลน์</li>
  <li>เชื่อมอุปกรณ์พิมพ์ใบเสร็จ บาร์โค้ด</li>
  <li>งบประมาณกลาง-สูง</li>
</ul>

<h2>เลือกยังไงให้คุ้มงบ?</h2>
<p>หลักการของผมคือ:</p>
<ol>
  <li><strong>เริ่มจาก MVP</strong> — ทำฟีเจอร์หลักก่อน ขยายทีหลัง</li>
  <li><strong>เลือกเทคโนโลยีที่มีคนใช้เยอะ</strong> — หาคนดูแลต่อได้ง่าย</li>
  <li><strong>ไม่ต้องตามเทรนด์เสมอ</strong> — เทคโนโลยีที่เก่าแต่เสถียร บางครั้งคุ้มกว่า</li>
  <li><strong>คำนึงถึงการดูแลระยะยาว</strong> — ไม่ใช่แค่ทำเสร็จ แต่ต้องดูแลได้</li>
</ol>

<blockquote>สรุป: ไม่มีเทคโนโลยีที่ "ดีที่สุด" มีแค่เทคโนโลยีที่ "เหมาะกับงานและงบของคุณ" ถ้าไม่แน่ใจ ปรึกษาคนทำจริง เขาจะแนะนำตามความต้องการจริง ไม่ใช่ตามที่อยากขาย</blockquote>

<p>📌 ไม่แน่ใจว่าควรเลือกเทคโนโลยีไหน? <a href="/contact">ทักปรึกษาผมฟรี</a> ได้เลย หรือดู <a href="/portfolio">ผลงานตัวอย่าง</a> ที่ผมเคยทำ</p>
`,
  },
  {
    slug: "nextjs-vs-react-2026",
    title: "Next.js กับ React ต่างกันยังไง? และควรเลือกอันไหนในปี 2026",
    description:
      "อธิบายความต่างระหว่าง Next.js และ React แบบเข้าใจง่าย พร้อมคำแนะนำว่าควรเลือกอันไหนสำหรับโปรเจกต์ของคุณ",
    date: "2026-07-20",
    readingTime: "10 นาที",
    tags: ["Next.js", "React", "เทคโนโลยี"],
    category: "เทคโนโลยี",
    body: `
<p>หนึ่งคำถามที่ลูกค้าถามบ่อยมากคือ "Next.js กับ React ต่างกันยังไง แล้วจ้างทำเว็บควรเลือกอันไหน?" บทความนี้จะอธิบายแบบเข้าใจง่าย พร้อมตัวอย่างโค้ดจริง</p>

<h2>React คืออะไร?</h2>
<p><strong>React</strong> เป็น library สำหรับสร้างหน้าเว็บแบบ interactive พัฒนาโดย Meta (Facebook) หน้าที่หลักคือจัดการ UI หรือหน้าต่างเว็บที่ผู้ใช้เห็นและกดโต้ตอบได้</p>
<p>ลักษณะการทำงานของ React อย่างเดียวคือ <strong>Client-Side Rendering (CSR)</strong> คือ:</p>
<ol>
  <li>Browser โหลด HTML เปล่าๆ ที่มีแค่ <code>&lt;div id="root"&gt;&lt;/div&gt;</code></li>
  <li>โหลด JavaScript bundle (อาจใหญ่ 200-500KB)</li>
  <li>JavaScript ทำงาน สร้างเนื้อหาและแสดงผล</li>
  <li>ผู้ใช้เห็นเนื้อหา (ใช้เวลา 2-5 วินาทีถ้าเน็ตช้า)</li>
</ol>
<p>ปัญหาคือ Googlebot เข้ามาเก็บเนื้อหา แต่เห็นแค่ <code>&lt;div id="root"&gt;&lt;/div&gt;</code> ไม่เห็นเนื้อหาจริง เพราะต้องรอ JavaScript ทำงาน แม้ Google จะ render JavaScript ได้ แต่ช้ากว่าและไม่น่าเชื่อถือเท่า HTML สำเร็จรูป</p>

<h2>Next.js คืออะวรัย?</h2>
<p><strong>Next.js</strong> เป็น framework ที่สร้างบน React เพิ่มความสามารถที่ React อย่างเดียวไม่มี โดยเฉพาะ <strong>Server-Side Rendering (SSR)</strong> และ <strong>Static Site Generation (SSG)</strong></p>
<p>Next.js แก้ปัญหา CSR โดยสร้าง HTML บนเซิร์ฟเวอร์ก่อนส่งให้ browser:</p>
<ol>
  <li>ผู้ใช้เข้าเว็บ → เซิร์ฟเวอร์สร้าง HTML สำเร็จรูป (มีเนื้อหาครบ)</li>
  <li>Browser แสดงผลทันที (1-2 วินาที)</li>
  <li>JavaScript โหลดทีหลังเพื่อเพิ่มความ interactive (Hydration)</li>
  <li>Googlebot เห็นเนื้อหาทันที ไม่ต้องรอ JavaScript</li>
</ol>

<h2>ตัวอย่างโค้ด: หน้าเว็บเดียวกัน สองแบบ</h2>
<h3>React อย่างเดียว (CSR)</h3>
<pre>
// App.tsx
import { useState, useEffect } from 'react'

export default function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // โหลดข้อมูลหลังเว็บแสดงผลแล้ว
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  // ตอนโหลดครั้งแรก products = [] หน้าเว็บว่าง
  return (
    &lt;div&gt;
      {products.map(p => &lt;div key={p.id}&gt;{p.name}&lt;/div&gt;)}
    &lt;/div&gt;
  )
}
</pre>
<p>Googlebot เห็น: <code>&lt;div&gt;&lt;/div&gt;</code> ว่างเปล่า</p>

<h3>Next.js (SSR)</h3>
<pre>
// app/products/page.tsx
// ทำงานบนเซิร์ฟเวอร์ ก่อนส่ง HTML
export default async function ProductsPage() {
  // โหลดข้อมูลบนเซิร์ฟเวอร์
  const res = await fetch('https://api.example.com/products')
  const products = await res.json()

  // ส่ง HTML ที่มีเนื้อหาครบ
  return (
    &lt;div&gt;
      {products.map(p => (
        &lt;div key={p.id}&gt;
          &lt;h2&gt;{p.name}&lt;/h2&gt;
          &lt;p&gt;{p.description}&lt;/p&gt;
          &lt;span&gt;฿{p.price}&lt;/span&gt;
        &lt;/div&gt;
      ))}
    &lt;/div&gt;
  )
}
</pre>
<p>Googlebot เห็น: HTML ที่มีชื่อสินค้า รายละเอียด ราคา ครบทันที</p>

<h2>เปรียบเทียบสำคัญ</h2>
<table>
  <tr><th>คุณสมบัติ</th><th>React</th><th>Next.js</th></tr>
  <tr><td>Rendering</td><td>Client-side เท่านั้น</td><td>SSR + SSG + CSR เลือกได้</td></tr>
  <tr><td>SEO</td><td>ไม่ดี (Google อาจไม่เห็นเนื้อหา)</td><td>ดีมาก (HTML สำเร็จรูป)</td></tr>
  <tr><td>ความเร็วโหลดแรก (LCP)</td><td>2-5 วินาที</td><td>0.8-1.5 วินาที</td></tr>
  <tr><td>Routing</td><td>ต้องติดตั้ง react-router</td><td>มีในตัว (file-based)</td></tr>
  <tr><td>Image Optimization</td><td>ไม่มี ต้องทำเอง</td><td>มี next/image อัตโนมัติ</td></tr>
  <tr><td>API Routes</td><td>ต้องทำเซิร์ฟเวอร์แยก</td><td>มีในตัว (app/api/)</td></tr>
  <tr><td>เหมาะกับ</td><td>Web App ภายใน ไม่ต้อง SEO</td><td>เว็บทุกประเภท</td></tr>
</table>

<h2>แล้วควรเลือกอันไหน?</h2>
<h3>เลือก Next.js ถ้า:</h3>
<ul>
  <li>เว็บธุรกิจที่ต้องติดอันดับ Google</li>
  <li>เว็บขายของ เว็บบริษัท เว็บบล็อก</li>
  <li>ต้องการความเร็ว LCP &lt; 2.5 วินาที</li>
  <li>ต้องการทำทั้ง frontend และ API ในโปรเจกต์เดียว</li>
</ul>
<h3>เลือก React อย่างเดียว ถ้า:</h3>
<ul>
  <li>Admin Panel ภายในองค์กร ไม่ต้อง SEO</li>
  <li>Dashboard ที่ผู้ใช้ login แล้วใช้งาน</li>
  <li>เว็บแอพที่ไม่ต้องการให้ Google index</li>
</ul>

<h2>ประสบการณ์จริง</h2>
<p>ผมเคย migrate เว็บลูกค้าจาก React (CRA) เป็น Next.js ผลที่ได้:</p>
<ul>
  <li>LCP: 4.2 วินาที → 1.1 วินาที (เร็วขึ้น 3.8 เท่า)</li>
  <li>คะแนน Lighthouse: 45 → 98</li>
  <li>ยอดคลิกจาก Google: เพิ่ม 320% ใน 2 เดือน</li>
  <li>Bounce Rate: ลดจาก 68% เป็น 42%</li>
</ul>

<blockquote>สรุป: ถ้าจ้างทำเว็บในปี 2026 ขอแนะนำ Next.js เพราะได้ทั้งความเร็ว SEO และความยืดหยุ่น React อย่างเดียวเหมาะกับเว็บแอพภายในที่ไม่ต้องการ SEO เท่านั้น</blockquote>

<p>📌 อยากทำเว็บด้วย Next.js? ดู <a href="/services">บริการของผม</a> หรือ <a href="/contact">ติดต่อจ้างงาน</a> ได้เลย</p>
`,
  },
  {
    slug: "line-api-development-guide",
    title: "พัฒนาระบบเชื่อมต่อ LINE: LINE Login, LINE Notify, และ LINE Messaging API",
    description:
      "คู่มือเชื่อมต่อระบบของคุณเข้ากับ LINE ตั้งแต่ LINE Login, LINE Notify ไปจนถึง Messaging API สำหรับส่งข้อความอัตโนมัติ",
    date: "2026-07-15",
    readingTime: "12 นาที",
    tags: ["LINE API", "การพัฒนา", "ระบบ"],
    category: "การพัฒนา",
    body: `
<p>ในไทย LINE มีผู้ใช้มากกว่า 50 ล้านคน เกือบทุกคนที่ใช้สมาร์ทโฟนมี LINE การเชื่อมต่อระบบของเราเข้ากับ LINE จึงเป็นสิ่งที่ลูกค้าส่วนใหญ่ต้องการ บทความนี้จะอธิบาย 3 วิธีหลัก พร้อมตัวอย่างโค้ดจริง</p>

<h2>1. LINE Login</h2>
<p>ให้ผู้ใช้ล็อกอินเว็บหรือแอพของคุณด้วยบัญชี LINE ไม่ต้องสมัครใหม่ สะดวกและรวดเร็ว</p>
<p><strong>ขั้นตอนการทำงาน:</strong></p>
<ol>
  <li>ผู้ใช้กดปุ่ม "Login with LINE" บนเว็บคุณ</li>
  <li>LINE แสดงหน้ายินยอมการเข้าถึงข้อมูล</li>
  <li>ผู้ใช้กดยินยอม → LINE ส่ง authorization code กลับมา</li>
  <li>เซิร์ฟเวอร์ของคุณแลก code เป็น access token</li>
  <li>ใช้ token ดึง profile (ชื่อ, รูป, email ถ้ามีสิทธิ์)</li>
</ol>
<p><strong>ตัวอย่างโค้ด (Next.js API Route):</strong></p>
<pre>
// app/api/auth/line-callback/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { code } = await req.json()

  // แลก code เป็น access token
  const tokenRes = await fetch('https://api.line.me/oauth2/v2.1/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: process.env.LINE_CHANNEL_ID!,
      client_secret: process.env.LINE_CHANNEL_SECRET!,
      redirect_uri: process.env.LINE_CALLBACK_URL!,
    }),
  })

  const { access_token } = await tokenRes.json()

  // ดึง profile ผู้ใช้
  const profileRes = await fetch('https://api.line.me/v2/profile', {
    headers: { Authorization: 'Bearer ' + access_token },
  })

  const profile = await profileRes.json()
  // profile = { userId, displayName, pictureUrl, statusMessage }

  // สร้าง session ในระบบของเรา
  // ... บันทึกลง database หรือสร้าง JWT

  return NextResponse.json({ user: profile })
}
</pre>
<p><strong>ข้อควรรู้:</strong></p>
<ul>
  <li>ต้องสมัคร LINE Developers Console เพื่อรับ Channel ID และ Secret</li>
  <li>เลือก scope ที่จำเป็น: <code>profile</code>, <code>openid</code>, <code>email</code></li>
  <li>ใช้ PKCE (Proof Key for Code Exchange) เพื่อความปลอดภัยเพิ่มขึ้น</li>
  <li>Token มีอายุ 30 วัน ต้อง refresh ถ้าใช้ต่อ</li>
</ul>

<h2>2. LINE Notify</h2>
<p>ส่งข้อความแจ้งเตือนไปยัง LINE ของผู้ใช้หรือกลุ่ม เป็นวิธีที่ง่ายที่สุด ไม่ต้องสร้างบอท</p>
<p><strong>ตัวอย่างโค้ดส่งข้อความ:</strong></p>
<pre>
// ส่งแจ้งเตือนไปยัง LINE
async function sendLineNotify(token: string, message: string) {
  const res = await fetch('https://notify-api.line.me/api/notify', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ message }),
  })

  if (!res.ok) {
    const error = await res.json()
    console.error('LINE Notify error:', error)
    throw new Error('ส่ง LINE Notify ไม่สำเร็จ')
  }

  return res.json()
}

// ตัวอย่าง: แจ้งเตือนออเดอร์ใหม่
await sendLineNotify(
  process.env.LINE_NOTIFY_TOKEN!,
  '\n📦 ออเดอร์ใหม่ #1234\nลูกค้า: คุณสมชาย\nยอดรวม: ฿1,250\nสถานะ: รอยืนยัน'
)
</pre>
<p><strong>Use Case ที่ใช้จริง:</strong></p>
<ul>
  <li>ระบบจองคิว → แจ้งเตือนวันนัด 1 ชม. ก่อน</li>
  <li>ระบบขาย → แจ้งออเดอร์ใหม่ให้พนักงานในกลุ่ม</li>
  <li>ระบบ monitor → แจ้งเตือนเมื่อเซิร์ฟเวอร์ล่ม หรือ disk เต็ม</li>
  <li>ระบบการเงิน → แจ้งยอดโอนเข้า ยอดขายรายวัน</li>
</ul>
<p><strong>ข้อจำกัด:</strong> ส่งได้ 1 ข้อความต่อวินาทีต่อ token และจำกัด 1,000 ข้อความต่อวัน</p>

<h2>3. LINE Messaging API</h2>
<p>สร้างแชทบอทหรือระบบตอบกลับอัตโนมัติบน LINE เป็นวิธีที่ทรงพลังที่สุด</p>
<p><strong>ตัวอย่าง Webhook รับข้อความและตอบกลับ:</strong></p>
<pre>
// app/api/line-webhook/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()

  // ตรวจสอบ signature เพื่อความปลอดภัย
  // (ใช้ crypto.verify กับ X-Line-Signature header)

  const events = body.events

  for (const event of events) {
    if (event.type === 'message' && event.message.type === 'text') {
      const userMessage = event.message.text
      const replyToken = event.replyToken

      // ตอบกลับข้อความ
      await fetch('https://api.line.me/v2/bot/message/reply', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + process.env.LINE_CHANNEL_ACCESS_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          replyToken,
          messages: [{
            type: 'text',
            text: 'คุณพิมพ์ว่า: "' + userMessage + '"',
          }],
        }),
      })
    }
  }

  return NextResponse.json({ status: 'ok' })
}
</pre>
<p><strong>ประเภทข้อความที่ส่งได้:</strong></p>
<ul>
  <li><strong>Text</strong> — ข้อความธรรมดา</li>
  <li><strong>Image/Video</strong> — ส่งรูปหรือวิดีโอ</li>
  <li><strong>Sticker</strong> — สติกเกอร์ LINE</li>
  <li><strong>Flex Message</strong> — การ์ดสวยๆ มีรูป ปุ่ม ข้อความ</li>
  <li><strong>Template</strong> — ปุ่มเลือก ยืนยัน รายการ</li>
  <li><strong>Quick Reply</strong> — ปุ่มตอบกลับด่วน</li>
</ul>

<h2>ตัวอย่าง Flex Message สวยๆ</h2>
<pre>
// ส่งใบเสร็จในรูปแบบ Flex Message
const flexMessage = {
  type: 'flex',
  altText: 'ใบเสร็จออเดอร์ #1234',
  contents: {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        { type: 'text', text: 'ใบเสร็จ', weight: 'bold', size: 'xl' },
        { type: 'text', text: 'ออเดอร์ #1234', color: '#999999' },
        { type: 'separator', margin: 'md' },
        { type: 'text', text: 'ข้าวผัดกุ้ง x1', margin: 'md' },
        { type: 'text', text: '฿120', align: 'end' },
        { type: 'text', text: 'ชาเย็น x2', margin: 'md' },
        { type: 'text', text: '฿90', align: 'end' },
        { type: 'separator', margin: 'md' },
        { type: 'text', text: 'รวมทั้งสิ้น', weight: 'bold', margin: 'md' },
        { type: 'text', text: '฿210', weight: 'bold', align: 'end' },
      ],
    },
  },
}
</pre>

<h2>Use Case จริงที่ผมเคยทำ</h2>
<h3>ระบบจองคิวคลินิก</h3>
<p>ลูกค้าจองผ่านเว็บ → ระบบส่ง LINE Notify ยืนยันการจองพร้อมรายละเอียด → ก่อนนัด 1 ชม. ส่งแจ้งเตือนอีกครั้ง → พนักงานเห็นคิวใหม่ในกลุ่ม LINE ของคลินิก → ลูกค้ายกเลิกผ่านบอทได้</p>
<h3>ระบบสั่งอาหารร้านอาหาร</h3>
<p>ลูกค้าสั่งผ่านเว็บ → ครัวได้รับ Flex Message ในกลุ่ม LINE ทันที มีรายการอาหาร โต๊ะ หมายเหตุ → พิมพ์ใบสั่งอัตโนมัติ → อัปเดตสถานะผ่านระบบ → ลูกค้าได้รับแจ้งเมื่ออาหารเสร็จ</p>

<h2>ข้อควรระวัง</h2>
<ul>
  <li><strong>Rate Limit</strong> — Messaging API ส่งได้ 200 ข้อความ/วัน (แบบฟรี) ต้องอัปเกรดถ้าส่งเยอะ</li>
  <li><strong>Token Security</strong> — เก็บ Access Token และ Channel Secret ใน environment variable อย่า hardcode ในโค้ด</li>
  <li><strong>Webhook Verification</strong> — ต้องตรวจ signature ทุกครั้ง ไม่งั้นคนอื่นส่ง webhook ปลอมมาได้</li>
  <li><strong>User Consent</strong> — ต้องขออนุญาตผู้ใช้ก่อนส่ง Push Message (ไม่ใช่ Reply)</li>
  <li><strong>GDPR/PDPA</strong> — ข้อมูลผู้ใช้จาก LINE ต้องเก็บให้ปลอดภัย และลบเมื่อผู้ใช้ขอ</li>
</ul>

<blockquote>สรุป: LINE API เป็นเครื่องมือทรงพลังสำหรับธุรกิจในไทย เลือกใช้แบบที่เหมาะกับงาน — Notify สำหรับแจ้งเตือนง่ายๆ, Login สำหรับลดขั้นตอนสมัคร, Messaging API สำหรับแชทบอทและ Flex Message สวยๆ</blockquote>

<p>📌 อยากเชื่อมระบบเข้ากับ LINE? <a href="/contact">ทักปรึกษาผม</a> ได้เลย หรือดู <a href="/services">บริการพัฒนาระบบ</a> ที่ผมรับทำ</p>
`,
  },
  {
    slug: "web-performance-optimization",
    title: "เพิ่มความเร็วเว็บไซต์: เทคนิคที่ทำให้เว็บโหลดใน 1 วินาที",
    description:
      "วิธี optimize เว็บไซต์ให้โหลดเร็ว ทำคะแนน Lighthouse 100 พร้อมเทคนิคที่ใช้จริงกับเว็บลูกค้า",
    date: "2026-07-10",
    readingTime: "8 นาที",
    tags: ["Performance", "Core Web Vitals", "เว็บไซต์"],
    category: "การพัฒนา",
    body: `
<p>ความเร็วเว็บส่งผลตรงต่อ SEO และ conversion rate ลูกค้าวิจัยพบว่า 1 วินาทีช้าลง = ยอดขายลด 7% บทความนี้คือเทคนิคที่ผมใช้จริง</p>

<h2>1. วัดก่อนแก้ — Core Web Vitals</h2>
<p>Google วัด 3 ตัวหลัก:</p>
<ul>
  <li><strong>LCP (Largest Contentful Paint)</strong> — เวลาที่เนื้อหาหลักโหลดเสร็จ ต้อง < 2.5 วินาที</li>
  <li><strong>FID (First Input Delay)</strong> — เวลาที่เว็บตอบสนองการคลิกแรก ต้อง < 100ms</li>
  <li><strong>CLS (Cumulative Layout Shift)</strong> — การกระตุกของหน้าจอ ต้อง < 0.1</li>
</ul>

<h2>2. ใช้ Next.js Image Component</h2>
<p>รูปภาพคือสาเหตุอันดับ 1 ของเว็บช้า Next.js มี <code>next/image</code> ที่:</p>
<ul>
  <li>แปลงรูปเป็น WebP อัตโนมัติ (เล็กลง 30-50%)</li>
  <li>Lazy load — โหลดรูปเมื่อใกล้เข้าหน้าจอ</li>
  <li>กำหนดขนาดล่วงหน้า ป้องกัน CLS</li>
  <li>Responsive — ส่งรูปขนาดเหมาะกับแต่ละ device</li>
</ul>

<h2>3. Code Splitting และ Lazy Loading</h2>
<p>ไม่โหลดทุกอย่างพร้อมกัน โหลดเฉพาะที่จำเป็นตอนแรก ที่เหลือโหลดทีหลัง:</p>
<ul>
  <li>ใช้ <code>dynamic import()</code> สำหรับ component หนัก</li>
  <li>Next.js แบ่งหน้าอัตโนมัติ แต่ละหน้าโหลดเฉพาะ code ของตัวเอง</li>
  <li>library จากภายนอกโหลดเฉพาะเมื่อใช้งาน</li>
</ul>

<h2>4. Font Optimization</h2>
<p>ฟอนต์เป็นอีกสาเหตุของเว็บช้า:</p>
<ul>
  <li>ใช้ <code>next/font</code> เพื่อโหลดฟอนต์จาก Google Fonts แบบ self-hosted</li>
  <li>ใช้ <code>font-display: swap</code> แสดงฟอนต์สำรองก่อน ไม่บล็อกการโหลด</li>
  <li>โหลดเฉพาะ weight ที่ใช้ ไม่ต้องโหลดทั้ง family</li>
</ul>

<h2>5. Caching Strategy</h2>
<ul>
  <li><strong>Static Generation</strong> — หน้าที่ไม่เปลี่ยนบ่อย สร้าง HTML ตอน build</li>
  <li><strong>ISR (Incremental Static Regeneration)</strong> — อัปเดตหน้า static เป็นระยะ</li>
  <li><strong>CDN</strong> — ใช้ Vercel/Cloudflare CDN กระจายเนื้อหาทั่วโลก</li>
</ul>

<h2>6. ลด JavaScript Bundle Size</h2>
<ul>
  <li>ตรวจ bundle ด้วย <code>@next/bundle-analyzer</code></li>
  <li>เปลี่ยน library หนักเป็นทางเลือกเบากว่า</li>
  <li>Tree shaking — ไม่ import ส่วนที่ไม่ใช้</li>
</ul>

<h2>ผลลัพธ์จริง</h2>
<p>เว็บลูกค้าที่ผมทำ หลัง optimize ได้คะแนน:</p>
<ul>
  <li>Performance: 98-100</li>
  <li>Accessibility: 95-100</li>
  <li>SEO: 100</li>
  <li>LCP: 0.8-1.2 วินาที</li>
</ul>

<blockquote>สรุป: ความเร็วเว็บไม่ใช่เรื่องยาก แต่ต้องทั้งตอนเขียนโค้ดและตอน deploy ใช้ Next.js ช่วยได้เยอะมาก แต่ก็ต้องเข้าใจหลักการเบื้องหลัง</blockquote>

<p>📌 อยากให้เว็บโหลดเร็วและติดอันดับ Google? ดู <a href="/services">บริการทำเว็บไซต์</a> ของผม หรือ <a href="/contact">ปรึกษาฟรี</a> ได้เลย</p>
`,
  },
  {
    slug: "pos-system-guide-2026",
    title: "ระบบ POS สำหรับร้านค้า 2026: เลือกแบบไหน? ทำเองหรือซื้อสำเร็จ?",
    description:
      "คู่มือเลือกระบบ POS สำหรับร้านอาหาร ร้านค้า และธุรกิจค้าปลีก เปรียบเทียบทำเองกับซื้อสำเร็จ พร้อมคำแนะนำ",
    date: "2026-07-05",
    readingTime: "7 นาที",
    tags: ["POS", "ระบบ", "ธุรกิจ"],
    category: "ธุรกิจ",
    body: `
<p>ระบบ POS (Point of Sale) เป็นหัวใจของธุรกิจค้าปลีกและร้านอาหาร บทความนี้จะช่วยให้คุณตัดสินใจได้ว่าควรทำเองหรือซื้อสำเร็จ</p>

<h2>ประเภทระบบ POS</h2>
<h3>1. Cloud POS (เว็บ-based)</h3>
<p>รันบน browser ไม่ต้องติดตั้ง เข้าใช้ได้จากทุกที่</p>
<ul>
  <li>ข้อดี: ไม่ต้องอัปเดต เข้าใช้ได้ทุกที่ ข้อมูลล่าสุดเสมอ</li>
  <li>ข้อเสีย: ต้องมีอินเทอร์เน็น</li>
  <li>เหมาะกับ: ร้านที่มีหลายสาขา หรือเจ้าของดูแลระยะไกล</li>
</ul>

<h3>2. Offline POS (Desktop)</h3>
<p>ติดตั้งบนเครื่อง ทำงานได้ไม่ต้องอินเทอร์เน็น</p>
<ul>
  <li>ข้อดี: ทำงานได้แม้ไร้เน็ต เร็ว ปลอดภัย</li>
  <li>ข้อเสีย: อัปเดตยาก ดูข้อมูลได้แค่ที่เครื่อง</li>
  <li>เหมาะกับ: ร้านเดียว อินเทอร์เน็นไม่เสถียร</li>
</ul>

<h3>3. Hybrid POS (PWA)</h3>
<p>ทำงานได้ทั้งออนไลน์และออฟไลน์ ซิงค์ข้อมูลเมื่อมีเน็ต</p>
<ul>
  <li>ข้อดี: ดีที่สุดของทั้งสองแบบ</li>
  <li>ข้อเสีย: พัฒนาซับซ้อนกว่า</li>
  <li>เหมาะกับ: ร้านที่อินเทอร์เน็นไม่เสถียรแต่ต้องการ cloud</li>
</ul>

<h2>ทำเอง vs ซื้อสำเร็จ</h2>
<table>
  <tr><th>ปัจจัย</th><th>ทำเอง</th><th>ซื้อสำเร็จ</th></tr>
  <tr><td>ราคาเริ่มต้น</td><td>สูง (ค่าพัฒนา)</td><td>ต่ำ (รายเดือน)</td></tr>
  <tr><td>ระยะยาว</td><td>คุ้มกว่า (ไม่มีรายเดือน)</td><td>แพงขึ้นเรื่อยๆ</td></tr>
  <tr><td>การปรับแต่ง</td><td>ได้เต็มที่</td><td>จำกัด</td></tr>
  <tr><td>เวลาใช้งาน</td><td>1-3 เดือน</td><td>ทันที</td></tr>
  <tr><td>ความเป็นเอกลักษณ์</td><td>สูง</td><td>ต่ำ</td></tr>
</table>

<h2>ฟีเจอร์ที่ระบบ POS ควรมี</h2>
<ol>
  <li><strong>ขายหน้าร้าน</strong> — สแกนบาร์โค้ด คำนวณราคา รับเงิน</li>
  <li><strong>จัดการสต็อก</strong> — ตรวจนับ รับเข้า ส่งออก แจ้งเตือนของใกล้หมด</li>
  <li><strong>รายงาน</strong> — ยอดขาย กำไร ขายดี สต็อก</li>
  <li><strong>พิมพ์ใบเสร็จ</strong> — รองรับเครื่องพิมพ์ thermal</li>
  <li><strong>จัดการพนักงาน</strong> — เข้า-ออกงาน สิทธิ์การใช้งาน</li>
  <li><strong>โปรโมชัน</strong> — ส่วนลด ซื้อ N แถม 1 ฯลฯ</li>
  <li><strong>รับชำระหลายช่องทาง</strong> — เงินสด บัตร QR Code</li>
</ol>

<h2>ฮาร์ดแวร์ที่ต้องมี</h2>
<ul>
  <li>เครื่องพิมพ์ใบเสร็จ (Thermal Printer) — แนะนำ Epson หรือ Star</li>
  <li>สแกนเนอร์บาร์โค้ด — USB หรือ Bluetooth</li>
  <li>ลิ้นชักเก็บเงินสด (Cash Drawer)</li>
  <li>จอแสดงผลลูกค้า (Customer Display)</li>
  <li>เครื่องอ่านบัตรเครดิต (ถ้ารับบัตร)</li>
</ul>

<blockquote>สรุป: ถ้าร้านเดียว งบจำกัด เริ่มจากสำเร็จก่อน ถ้ามีหลายสาขา ต้องการฟีเจอร์เฉพาะ หรือใช้ระยะยาว ทำเองคุ้มกว่า ถ้าไม่แน่ใจ ปรึกษาคนทำจริง</blockquote>

<p>📌 อยากทำระบบ POS เฉพาะของธุรกิจ? ลอง <a href="/demo/pos">ทดลองใช้งาน POS ตัวอย่าง</a> หรือ <a href="/contact">ติดต่อปรึกษาฟรี</a> ได้เลย</p>
`,
  },
  {
    slug: "web-security-best-practices",
    title: "ความปลอดภัยเว็บไซต์: 7 สิ่งที่ทำให้เว็บคุณไม่ถูกแฮ็ก",
    description:
      "คู่มือรักษาความปลอดภัยเว็บไซต์สำหรับธุรกิจ ตั้งแต่ HTTPS, รหัสผ่าน, การป้องกัน SQL Injection และ XSS",
    date: "2026-06-28",
    readingTime: "8 นาที",
    tags: ["Security", "เว็บไซต์", "การพัฒนา"],
    category: "การพัฒนา",
    body: `
<p>เว็บไซต์ถูกแฮ็กทุกวัน ข้อมูลลูกค้ารั่วไหว ธุรกิจเสียหาย บทความนี้คือ 7 สิ่งพื้นฐานที่ทำให้เว็บคุณปลอดภัยขึ้นมาก</p>

<h2>1. ใช้ HTTPS (SSL/TLS)</h2>
<p>สิ่งแรกสุดและสำคัญที่สุด ปัจจุบัน SSL ฟรีจาก Let's Encrypt ไม่มีเหตุผลที่จะไม่ใช้</p>
<ul>
  <li>เข้ารหัสข้อมูลระหว่าง browser กับ server</li>
  <li>Google ให้ความสำคัญ ไม่มี HTTPS อันดับตก</li>
  <li>Chrome เตือน "Not Secure" ถ้าไม่มี</li>
</ul>

<h2>2. รหัสผ่านแข็งแรง</h2>
<p>80% ของการแฮ็กมาจากรหัสผ่านอ่อน:</p>
<ul>
  <li>บังคับอย่างน้อย 12 ตัว มีตัวอักษร ตัวเลข สัญลักษณ์</li>
  <li>ใช้ bcrypt หรือ argon2 เก็บรหัสผ่าน ไม่ใช่ plain text</li>
  <li>รองรับ 2FA (Two-Factor Authentication)</li>
  <li>ไม่ให้ใช้รหัสผ่านที่ซ้ำกับที่รั่วไหว</li>
</ul>

<h2>3. ป้องกัน SQL Injection</h2>
<p>แฮ็กเกอร์ใส่ SQL code ในช่องกรอกข้อมูล เช่น login form:</p>
<ul>
  <li>ใช้ <strong>parameterized queries</strong> เสมอ ไม่ต่อ string</li>
  <li>ใช้ ORM เช่น Prisma ที่ป้องกันให้อัตโนมัติ</li>
  <li>ตรวจสอบ input ทุกตัว ไม่เชื่อใจผู้ใช้</li>
</ul>

<h2>4. ป้องกัน XSS (Cross-Site Scripting)</h2>
<p>แฮ็กเกอร์ใส่ JavaScript ในเว็บของคุณ:</p>
<ul>
  <li>Escape HTML ทุกครั้งที่แสดงข้อมูลผู้ใช้</li>
  <li>ใช้ Content Security Policy (CSP) header</li>
  <li>ไม่ใช้ <code>dangerouslySetInnerHTML</code> กับข้อมูลที่ไม่น่าเชื่อถือ</li>
  <li>ใช้ HttpOnly cookie ป้องกัน JavaScript อ่าน</li>
</ul>

<h2>5. ป้องกัน CSRF (Cross-Site Request Forgery)</h2>
<p>แฮ็กเกอร์หลอกให้ผู้ใช้ส่ง request ไปยังเว็บของคุณ:</p>
<ul>
  <li>ใช้ CSRF token ในทุก form</li>
  <li>ตรวจสอบ <code>Origin</code> และ <code>Referer</code> header</li>
  <li>ใช้ <code>SameSite</code> cookie attribute</li>
</ul>

<h2>6. Rate Limiting และ Brute Force Protection</h2>
<p>ป้องกันการเดารหัสผ่าน:</p>
<ul>
  <li>จำกัดการ login ไม่เกิน 5 ครั้งต่อ 15 นาที</li>
  <li>ล็อคบัญชีชั่วคราวเมื่อพยายามเยอะเกินไป</li>
  <li>ใช้ CAPTCHA ในหน้า login</li>
  <li>แจ้งเตือนเมื่อมีการ login จาก device ใหม่</li>
</ul>

<h2>7. อัปเดตและตรวจสอบสม่ำเสมอ</h2>
<ul>
  <li>อัปเดต dependencies ทุกเดือน — ใช้ <code>npm audit</code></li>
  <li>ตรวจสอบ log หากิจกรรมผิดปกติ</li>
  <li>สำรองข้อมูลทุกวัน</li>
  <li>ใช้ security scanner เช่น Snyk, Dependabot</li>
</ul>

<h2>Security Headers ที่ควรตั้งค่า</h2>
<pre>
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000
Referrer-Policy: strict-origin-when-cross-origin
</pre>

<blockquote>สรุป: ความปลอดภัยไม่ใช่ feature ที่เพิ่มทีหลัง แต่ต้องคิดตั้งแต่ตอนออกแบบ ทำครบ 7 ข้อนี้ เว็บคุณปลอดภัยกว่า 90% ของเว็บทั่วไป</blockquote>

<p>📌 อยากให้เว็บปลอดภัยและทำงานได้จริง? ดู <a href="/services">บริการพัฒนาเว็บ</a> ของผม หรือ <a href="/contact">ปรึกษาฟรี</a> ได้เลย</p>
`,
  },
  {
    slug: "ecommerce-guide-thailand",
    title: "ทำเว็บขายของออนไลน์ในไทย 2026: เริ่มยังไง? ใช้อะไร?",
    description:
      "คู่มือทำเว็บขายของออนไลน์สำหรับธุรกิจในไทย เปรียบเทียบ Shopify, WooCommerce, และทำเองด้วย Next.js",
    date: "2026-06-20",
    readingTime: "9 นาที",
    tags: ["E-Commerce", "ธุรกิจ", "เว็บไซต์"],
    category: "ธุรกิจ",
    body: `
<p>ขายของออนไลน์ในไทยปี 2026 ไม่ใช่แค่เปิดเพจ Facebook แล้วรอลูกค้ามา ต้องมีเว็บขายของที่ทั้งสวย ใช้งานง่าย และติดอันดับ Google บทความนี้จะบอกว่าเริ่มยังไง</p>

<h2>ตัวเลือกหลักในการทำเว็บขายของ</h2>

<h3>1. Shopify</h3>
<p>แพลตฟอร์ม E-Commerce สำเร็จรูป จ่ายรายเดือน</p>
<ul>
  <li>ข้อดี: เริ่มเร็ว ใช้งานง่าย มี app เสริมเยอะ รองรับไทย</li>
  <li>ข้อเสีย: ราคาสูง ($29-299/เดือน) ปรับแต่งจำกัด ค่าธรรมเนียมธุรกรรม</li>
  <li>เหมาะกับ: คนเริ่มต้น สินค้าไม่ซับซ้อน งบรายเดือนพอรับ</li>
</ul>

<h3>2. WooCommerce (WordPress)</h3>
<p>Plugin ของ WordPress เพิ่มความสามารถขายของ</p>
<ul>
  <li>ข้อดี: ฟรี (จ่ายแค่ hosting) ปรับแต่งได้มาก plugin เยอะ</li>
  <li>ข้อเสีย: ต้องดูแลเอง ช้าถ้าไม่ optimize ความปลอดภัยต้องระวัง</li>
  <li>เหมาะกับ: งบจำกัด ต้องการความยืดหยุ่น มีคนดูแลเว็บ</li>
</ul>

<h3>3. ทำเองด้วย Next.js</h3>
<p>พัฒนาเว็บขายของเอง ปรับแต่งได้ทุกอย่าง</p>
<ul>
  <li>ข้อดี: ปรับแต่งได้เต็มที่ SEO ดีที่สุด ความเร็วสูง ไม่มีค่ารายเดือน</li>
  <li>ข้อเสีย: ค่าพัฒนาสูง ใช้เวลา 1-3 เดือน</li>
  <li>เหมาะกับ: ธุรกิจที่จริงจัง สินค้าเฉพาะทาง ต้องการระบบเฉพาะ</li>
</ul>

<h2>ฟีเจอร์ที่เว็บขายของต้องมี</h2>
<ol>
  <li><strong>ตะกร้าสินค้า</strong> — เพิ่ม/ลด แก้ไขจำนวน คำนวณราคา</li>
  <li><strong>ระบบชำระเงิน</strong> — บัตรเครดิต PromptPay TrueMoney LINE Pay</li>
  <li><strong>จัดการสินค้า</strong> — เพิ่ม/แก้ไข หมวดหมู่ รูป สต็อก</li>
  <li><strong>ติดตามออเดอร์</strong> — สถานะ การจัดส่ง เลขพัสดุ</li>
  <li><strong>ค้นหาและกรอง</strong> — ค้นหาสินค้า กรองตามราคา/หมวดหมู่</li>
  <li><strong>รีวิวและให้คะแนน</strong> — ลูกค้ารีวิวสินค้า</li>
  <li><strong>SEO</strong> — แต่ละสินค้ามีหน้าเฉพาะ ติดอันดับ Google</li>
</ol>

<h2>ระบบชำระเงินในไทย</h2>
<ul>
  <li><strong>Omise (Opn)</strong> — รองรับบัตร PromptPay TrueMoney ค่าธรรมเนียม 2.9-3.65%</li>
  <li><strong>Stripe</strong> — สากล รองรับบัตร ค่าธรรมเนียม 3.25%</li>
  <li><strong>2C2P</strong> — รองรับไทย บัตรเครดิต QR Code</li>
  <li><strong>LINE Pay</strong> — ผูกกับ LINE สะดวกสำหรับผู้ใช้ไทย</li>
</ul>

<h2>การจัดส่งในไทย</h2>
<ul>
  <li>เชื่อม Kerry, Flash, JT Express, Thailand Post ผ่าน API</li>
  <li>คำนวณค่าส่งตามน้ำหนักและจังหวัด</li>
  <li>ติดตามพัสดุผ่านเลข tracking</li>
  <li>รองรับ COD (เก็บเงินปลายทาง)</li>
</ul>

<h2>SEO สำหรับเว็บขายของ</h2>
<ul>
  <li>แต่ละสินค้ามีหน้าเฉพาะ มี title, description ที่ดี</li>
  <li>ใช้ Structured Data (Product schema) แสดงราคาใน Google</li>
  <li>รูปสินค้ามี alt บอกรายละเอียด</li>
  <li>โหลดเร็ว ลดขั้นตอนการซื้อ</li>
</ul>

<blockquote>สรุป: ถ้าเริ่มต้น งบจำกัด ใช้ Shopify ถ้าต้องการความยืดหยุ่น ใช้ WooCommerce ถ้าธุรกิจจริงจัง ต้องการ SEO และฟีเจอร์เฉพาะ ทำเองด้วย Next.js คุ้มที่สุดระยะยาว</blockquote>

<p>📌 อยากทำเว็บขายของออนไลน์? ลอง <a href="/demo/ecommerce">ทดลองใช้งานร้านค้าตัวอย่าง</a> หรือ <a href="/contact">ติดต่อปรึกษาฟรี</a> ได้เลย</p>
`,
  },
  {
    slug: "mobile-app-vs-web-app",
    title: "แอพมือถือ vs เว็บแอพ: อันไหนเหมาะกับธุรกิจของคุณ?",
    description:
      "เปรียบเทียบ Mobile App และ Web App แบบเข้าใจง่าย ช่วยให้ตัดสินใจได้ว่าควรทำอันไหน",
    date: "2026-06-15",
    readingTime: "6 นาที",
    tags: ["Mobile App", "Web App", "เทคโนโลยี"],
    category: "เทคโนโลยี",
    body: `
<p>ลูกค้ามักถามว่า "จะทำแอพมือถือหรือเว็บแอพดี?" คำตอบคือ "ขึ้นกับว่าลูกค้าของคุณใช้ยังไง" มาดูกัน</p>

<h2>Mobile App (Native/Hybrid)</h2>
<p>แอพที่ติดตั้งบนมือถือ ผ่าน App Store / Play Store</p>
<h3>ข้อดี</h3>
<ul>
  <li>ประสบการณ์ใช้งานดีที่สุด ลื่น เร็ว</li>
  <li>ใช้ฮาร์ดแวร์ได้เต็มที่ — กล้อง, GPS, พิมพ์, Bluetooth</li>
  <li>ทำงานออฟไลน์ได้</li>
  <li>Push Notification ส่งได้ตรง</li>
  <li>ลูกค้าเห็นไอคอนทุกวัน จำได้</li>
</ul>
<h3>ข้อเสีย</h3>
<ul>
  <li>ค่าพัฒนาสูง (1.5-3 เท่าของเว็บ)</li>
  <li>ต้องผ่าน App Store / Play Store review</li>
  <li>อัปเดตยาก ลูกค้าต้องกดอัปเดต</li>
  <li>ทำ 2 แพลตฟอร์ม (iOS + Android) งบเพิ่ม</li>
</ul>

<h2>Web App (PWA)</h2>
<p>เว็บที่ทำงานเหมือนแอพ ผ่าน browser</p>
<h3>ข้อดี</h3>
<ul>
  <li>ค่าพัฒนาต่ำกว่า ทำครั้งเดียวใช้ได้ทุก device</li>
  <li>ไม่ต้องผ่าน App Store อัปเดตได้ทันที</li>
  <li>ค้นหา Google เจอได้ (SEO)</li>
  <li>แชร์ลิงก์ได้ง่าย</li>
  <li>PWA ติดตั้งได้บนหน้าจอ ส่ง notification ได้</li>
</ul>
<h3>ข้อเสีย</h3>
<ul>
  <li>ประสบการณ์ไม่เท่า Native</li>
  <li>เข้าถึงฮาร์ดแวร์ได้จำกัด</li>
  <li>ออฟไลน์ได้แต่จำกัด</li>
  <li>บน iOS มีข้อจำกัดมากกว่า Android</li>
</ul>

<h2>เปรียบเทียบสรุป</h2>
<table>
  <tr><th>ปัจจัย</th><th>Mobile App</th><th>Web App</th></tr>
  <tr><td>ค่าพัฒนา</td><td>สูง</td><td>กลาง</td></tr>
  <tr><td>ประสบการณ์</td><td>ดีที่สุด</td><td>ดี</td></tr>
  <tr><td>ออฟไลน์</td><td>ได้เต็มที่</td><td>ได้จำกัด</td></tr>
  <tr><td>SEO</td><td>ไม่ได้</td><td>ได้</td></tr>
  <tr><td>อัปเดต</td><td>ช้า (review)</td><td>ทันที</td></tr>
  <tr><td>ฮาร์ดแวร์</td><td>เต็มที่</td><td>จำกัด</td></tr>
  <tr><td>แชร์</td><td>ยาก</td><td>ง่าย (ลิงก์)</td></tr>
</table>

<h2>เลือกยังไง?</h2>
<h3>เลือก Mobile App ถ้า:</h3>
<ul>
  <li>ต้องใช้ฮาร์ดแวร์เยอะ (กล้อง, Bluetooth, NFC)</li>
  <li>ต้องทำงานออฟไลน์จริงจัง</li>
  <li>ลูกค้าใช้บ่อยทุกวัน (เช่น แอพจัดส่ง, แอพพนักงาน)</li>
  <li>ต้องการ push notification ที่เข้าถึงได้ดี</li>
</ul>

<h3>เลือก Web App ถ้า:</h3>
<ul>
  <li>ต้องการ SEO ดึงลูกค้าผ่าน Google</li>
  <li>ลูกค้าใช้ไม่บ่อย (เช่น จองคิว, สั่งซื้อครั้งคราว)</li>
  <li>งบจำกัด</li>
  <li>ต้องการอัปเดตบ่อยและรวดเร็ว</li>
</ul>

<h3>ทำทั้งสองอย่าง (Hybrid)</h3>
<p>เริ่มจาก Web App ก่อน ทดสอบตลาด พอมั่นใจแล้วค่อยทำ Mobile App เพิ่ม ประหยัดงบและลดความเสี่ยง</p>

<blockquote>สรุป: ถ้าไม่แน่ใจ เริ่มจาก Web App ก่อน ทำเร็ว งบน้อย และได้ SEO พอธุรกิจโตและแน่ใจว่าลูกค้าต้องการแอพ ค่อยทำ Mobile App เพิ่ม</blockquote>

<p>📌 ไม่แน่ใจว่าควรทำเว็บหรือแอพ? <a href="/contact">ทักปรึกษาผมฟรี</a> ได้เลย หรือดู <a href="/services">บริการพัฒนาเว็บและแอพ</a> ที่ผมรับทำ</p>
`,
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}
