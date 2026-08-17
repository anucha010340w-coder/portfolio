import { NextRequest, NextResponse } from "next/server";
import { AI_KNOWLEDGE_BASE } from "@/lib/ai-knowledge";
import { webSearch, formatSearchContext } from "@/lib/web-search";

// Pre-built topic pool — no AI needed, instant random
const TOPIC_POOL: { topic: string; category: string }[] = [
  // ความรู้/เทคนิค
  { topic: "SEO คืออะไร? มือใหม่เริ่มต้นยังไง", category: "tips" },
  { topic: "ทำไมเว็บไซต์ต้องโหลดเร็ว? ผลกระทบต่อยอดขาย", category: "tips" },
  { topic: "5 วิธีเพิ่มความเร็วเว็บไซต์ที่ทำได้เลย", category: "tips" },
  { topic: "Core Web Vitals คืออะไร? สำคัญอย่างไร", category: "tips" },
  { topic: "HTTPS สำคัญอย่างไง? ปลอดภัยกว่า HTTP ยังไง", category: "tips" },
  { topic: "Responsive Design คืออะไร? ทำไมต้องมี", category: "tips" },
  { topic: "Next.js ดีกว่า React ธรรมดายังไง", category: "tips" },
  { topic: "TypeScript ช่วยอะไรในการทำเว็บ", category: "tips" },
  { topic: "PWA คืออะไร? แอพแบบเว็บที่ใช้งานออฟไลน์ได้", category: "tips" },
  { topic: "Headless CMS คืออะไร? ดีกว่า WordPress ยังไง", category: "tips" },
  { topic: "การป้องกัน SQL Injection และ XSS บนเว็บ", category: "tips" },
  { topic: "Sitemap และ robots.txt สำคัญอย่างไรต่อ SEO", category: "tips" },
  { topic: "Lighthouse คืออะไร? วัดคุณภาพเว็บยังไง", category: "tips" },
  { topic: "Meta Description สำคัญไหม? ช่วยอะไรกับการตลาด", category: "tips" },
  { topic: "Alt text รูปภาพสำคัญอย่างไรต่อ SEO", category: "tips" },
  { topic: "ทำไมเว็บไซต์ต้องมี SSL Certificate", category: "tips" },
  { topic: "CDN คืออะไร? ช่วยเร็วขึ้นยังไง", category: "tips" },
  { topic: "Serverless คืออะไร? ประหยัดค่าเซิร์ฟเวอร์ยังไง", category: "tips" },
  { topic: "Edge Computing คืออะไร? อนาคตของเว็บ", category: "tips" },
  { topic: "ทำไมเว็บบางเว็บโหลดช้า? สาเหตุและวิธีแก้", category: "tips" },

  // โปรโมท
  { topic: "รับทำเว็บไซต์ราคาเริ่มต้น 5,000 บาท", category: "promo" },
  { topic: "ทำไมต้องจ้างทำเว็บกับผู้เชี่ยวชาญ", category: "promo" },
  { topic: "ระบบ POS ร้านอาหาร ทำเอง vs ซื้อสำเร็จ", category: "promo" },
  { topic: "รับทำแอพมือถือ React Native ราคาประหยัด", category: "promo" },
  { topic: "ระบบจองคิวออนไลน์ สำหรับคลินิกและร้านเสริมสวย", category: "promo" },
  { topic: "ทำเว็บขายของออนไลน์ ครบทุกฟีเจอร์", category: "promo" },
  { topic: "รับทำระบบตามสั่ง ออกแบบตามธุรกิจคุณ", category: "promo" },
  { topic: "บริการดูแลเว็บไซต์หลังขาย ตลอดอายุการใช้งาน", category: "promo" },
  { topic: "ทำเว็บ SEO ติดอันดับ Google ได้จริง", category: "promo" },
  { topic: "รับทำระบบ CRM จัดการลูกค้าสำหรับธุรกิจ", category: "promo" },

  // เทรนด์ 2026
  { topic: "AI ช่วยทำเว็บได้จริงไหมในปี 2026", category: "trending" },
  { topic: "PWA จะแทนแอพแบบเดิมไหมในปี 2026", category: "trending" },
  { topic: "Headless CMS เทรนด์ใหม่ที่ธุรกิจควรรู้", category: "trending" },
  { topic: "แชทบอท AI สำหรับเว็บไซต์ธุรกิจ", category: "trending" },
  { topic: "การตลาดอัตโนมัติด้วย AI ในปี 2026", category: "trending" },
  { topic: "Voice Search จะเปลี่ยน SEO ยังไง", category: "trending" },
  { topic: "ธุรกิจไทยต้องปรับตัวยังไงกับ AI", category: "trending" },
  { topic: "Web3 และ Blockchain สำคัญกับธุรกิจไหม", category: "trending" },

  // ชวนคุย/engagement
  { topic: "เว็บไซต์ vs Facebook Page อันไหนสำคัญกว่ากัน", category: "engagement" },
  { topic: "ธุรกิจคุณใช้เว็บไซต์หรือโซเชียลอย่างเดียว", category: "engagement" },
  { topic: "ร้านอาหารควรมีระบบ POS ไหม มีกี่แบบ", category: "engagement" },
  { topic: "คุณเคยเจอเว็บช้าจนอยากปิดไปไหม", category: "engagement" },
  { topic: "ถ้าให้ทำแอพสักแอพ อยากทำแอพอะไร", category: "engagement" },
  { topic: "LINE OA vs เว็บไซต์ อันไหนคุ้มกว่าสำหรับธุรกิจ", category: "engagement" },
  { topic: "คุณคิดว่า AI จะแทนนักพัฒนาได้ไหม", category: "engagement" },
  { topic: "ธุรกิจเล็กควรลงทุนทำเว็บไหม หรือใช้ Facebook พอ", category: "engagement" },
];

// GET — random topics from pool (instant, no AI needed)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode");
  const count = parseInt(searchParams.get("count") || "8", 10);

  let pool = TOPIC_POOL;
  if (mode && mode !== "all") {
    pool = TOPIC_POOL.filter((t) => t.category === mode);
  }

  // Shuffle and pick
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const picked = shuffled.slice(0, Math.min(count, shuffled.length));

  return NextResponse.json({
    topics: picked.map((t) => t.topic),
    total: pool.length,
  });
}

// POST — AI suggests post topics when user has no idea what to post
export async function POST(req: NextRequest) {
  try {
    const { mode } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json({ error: "AI ไม่พร้อมใช้งาน" }, { status: 500 });
    }

    // Search for trending/real info
    const searchQuery = mode === "trending" ? "web development technology trends 2026" : mode === "tips" ? "web development tips SEO 2026" : "web development business technology";
    const searchResults = await webSearch(searchQuery);
    const searchContext = formatSearchContext(searchResults);

    const prompt = `${AI_KNOWLEDGE_BASE}
${searchContext}
คุณเป็นผู้ช่วยคิดหัวข้อโพสต์ Facebook สำหรับเพจ AW Dev

${mode === "tips" ? "แนะนำ 10 หัวข้อเกี่ยวกับเทคนิค/ความรู้ทำเว็บ เช่น SEO, ความเร็วเว็บ, เทคโนโลยี, ความปลอดภัย" : ""}
${mode === "promo" ? "แนะนำ 10 หัวข้อโปรโมทบริการ เช่น รับทำเว็บ, แอพ, POS, ระบบตามสั่ง" : ""}
${mode === "trending" ? "แนะนำ 10 หัวข้อเทรนด์เทคโนโลยี 2026 ที่คนสนใจ ใช้ข้อมูลจริงจากการค้นหาข้างต้น" : ""}
${mode === "engagement" ? "แนะนำ 10 หัวข้อชวนคุย/โพล/คำถามเพื่อเพิ่ม engagement" : ""}
${!mode ? "แนะนำ 10 หัวข้อโพสต์หลากหลาย ทั้งโปรโมท ความรู้ และชวนคุย" : ""}

เขียนแต่ละหัวข้อเป็นบรรทัดเดียว ขึ้นบรรทัดใหม่ ไม่มีหมายเลข ไม่มีสัญลักษณ์
เขียนเป็นภาษาไทย สั้น น่าสนใจ ทำให้อยากโพสต์ และใช้ความรู้จากข้อมูลข้างต้น
สำคัญ: ถ้ามีข้อมูลจริงจากการค้นหา ให้ใช้ข้อมูลนั้น อย่ามั่ว`;

    const MODELS = ["gemini-3.1-flash-lite", "gemini-flash-latest", "gemini-flash-lite-latest"];

    async function callGemini(modelIdx: number): Promise<Response> {
      const model = MODELS[modelIdx];
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { temperature: 1.0, maxOutputTokens: 600 },
          }),
        }
      );
      if (!res.ok && modelIdx < MODELS.length - 1) {
        return callGemini(modelIdx + 1);
      }
      return res;
    }

    const res = await callGemini(0);
    if (!res.ok) {
      return NextResponse.json({ error: "AI error" }, { status: 500 });
    }

    const data = await res.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const topics = rawText
      .split("\n")
      .map((t: string) => t.replace(/^\d+[\.\)]\s*/, "").replace(/^[-*]\s*/, "").trim())
      .filter((t: string) => t.length > 5)
      .slice(0, 10);

    return NextResponse.json({ topics });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Unknown error" }, { status: 500 });
  }
}
