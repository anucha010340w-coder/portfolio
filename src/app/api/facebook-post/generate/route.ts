import { NextRequest, NextResponse } from "next/server";
import { AI_KNOWLEDGE_BASE } from "@/lib/ai-knowledge";
import { webSearch, formatSearchContext } from "@/lib/web-search";

const SYSTEM_PROMPT = `${AI_KNOWLEDGE_BASE}

หลักการเขียนโพสต์:
- เน้นให้ความรู้เป็นส่วนใหญ่ อ่านสนุก เหมือนเพื่อนเล่าให้ฟัง
- เขียนยาว 12-20 บรรทัด เว้นบรรทัดทุก 2-3 ประโยค เพื่อให้อ่านง่าย ไม่ยาวติดกัน
- ใส่ emoji แค่ 1-2 ตัวทั้งโพสต์ ไม่เยอะ
- ใช้ความรู้จากข้อมูลข้างต้นและข้อมูลจริงจากอินเทอร์เน็ต ตอบได้ถูกต้องแม่นยำ ไม่มั่ว
- ถ้ามีข้อมูลจากการค้นหา ให้อ้างอิงข้อมูลนั้น อย่าเขียนเดา
- ชวนคลิกลิงก์หรือทัก LINE ตามธรรมชาติ ไม่บังคับ
- ตอบเฉพาะข้อความโพสต์เท่านั้น ไม่ต้องอธิบายเพิ่ม`;

export async function POST(req: NextRequest) {
  try {
    const { topic, type, serviceName, serviceDesc, blogTitle, blogDesc, hireType, hireBudget } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json({ error: "AI ไม่พร้อมใช้งาน (ไม่มี API key)" }, { status: 500 });
    }

    // Search the web for real information about the topic
    const searchQuery = type === "promo" || type === "hire" ? `${serviceName} ${serviceDesc}`.slice(0, 100) : type === "blog" ? `${blogTitle} ${blogDesc}`.slice(0, 100) : topic;
    const searchResults = await webSearch(searchQuery);
    const searchContext = formatSearchContext(searchResults);

    let prompt = "";
    if (type === "promo") {
      prompt = `เขียนโพสต์ Facebook โปรโมทบริการ "${serviceName}" รายละเอียด: ${serviceDesc}
เน้นให้ความรู้เกี่ยวกับบริการนี้ ทำไมลูกค้าต้องการ ประโยชน์คืออะไร
แนะนำบริการที่มี: รับทำเว็บไซต์ (เว็บนำเสนอ, เว็บธุรกิจ, เว็บขายของ, เว็บแอพ), แอพมือถือ (React Native, Flutter), ระบบ POS (ร้านอาหาร, ร้านค้า, คลินิก), SEO, E-Commerce
สำคัญ: ใช้ราคาที่ระบุในรายละเอียดข้างต้นเท่านั้น ห้ามแต่งราคาเอง ถ้ารายละเอียดระบุราคา 3,000 บาท ก็ใช้ 3,000 บาท
ใส่ลิงก์เว็บ https://dgkingshop.com ชวนทัก LINE: anucha1997w
เขียนยาว 12-20 บรรทัด เว้นบรรทัดทุก 2-3 ประโยค ใส่ emoji แค่ 1-2 ตัว ให้ข้อมูลที่เป็นประโยชน์จริง`;
    } else if (type === "hire") {
      const budgetLine = hireBudget && hireBudget.trim() ? `\nงบประมาณ: ${hireBudget.trim()}` : "\nงบประมาณ: นั่งคุยกันได้";
      prompt = `เขียนโพสต์ Facebook ประกาศรับงาน "${serviceName}" รายละเอียด: ${serviceDesc}${budgetLine}\nเน้นให้ความรู้เกี่ยวกับบริการนี้ ทำไมลูกค้าต้องการ ประโยชน์คืออะไร\nแนะนำบริการที่มี: รับทำเว็บไซต์ (เว็บนำเสนอ, เว็บธุรกิจ, เว็บขายของ, เว็บแอพ), แอพมือถือ (React Native, Flutter), ระบบ POS (ร้านอาหาร, ร้านค้า, คลินิก), SEO, E-Commerce\nสำคัญ: ใช้ราคาที่ระบุในรายละเอียดข้างต้นเท่านั้น ห้ามแต่งราคาเอง ถ้าระบุราคา 3,000 บาท ก็ใช้ 3,000 บาท\nใส่ลิงก์เว็บ https://dgkingshop.com ชวนทัก LINE: anucha1997w\nเขียนยาว 12-20 บรรทัด เว้นบรรทัดทุก 2-3 ประโยค ใส่ emoji แค่ 1-2 ตัว ให้ข้อมูลที่เป็นประโยชน์จริง`;
    } else if (type === "blog") {
      prompt = `เขียนโพสต์ Facebook แชร์บทความ "${blogTitle}" เนื้อหา: ${blogDesc}
เน้นเล่าความรู้จากบทความแบบเพื่อนเล่าให้ฟัง ไม่เหมือนโฆษณา
ดึงความรู้สำคัญมาเล่าให้คนอ่านเข้าใจง่าย
แนะนำบริการที่เกี่ยวข้อง: รับทำเว็บไซต์, แอพ, POS, SEO แต่ห้ามแต่งราคาเอง
ใส่ลิงก์บอกว่าอ่านต่อได้ที่ลิงก์ https://dgkingshop.com
ชวนทัก LINE: anucha1997w
เขียนยาว 12-20 บรรทัด เว้นบรรทัดทุก 2-3 ประโยค ใส่ emoji แค่ 1-2 ตัว`;
    } else {
      prompt = `เขียนโพสต์ Facebook เกี่ยวกับ "${topic}"
เน้นให้ความรู้จริงจากความเชี่ยวชาญ เล่าเรื่องแบบน่าสนใจ มีประโยชน์จริง
แนะนำบริการที่เกี่ยวข้อง: รับทำเว็บไซต์, แอพมือถือ, ระบบ POS, SEO, E-Commerce แต่ห้ามแต่งราคาเอง
ใส่ตัวอย่างหรือเคล็ดลับที่ใช้ได้จริง
ใส่ลิงก์เว็บ https://dgkingshop.com ชวนทัก LINE: anucha1997w
เขียนยาว 12-20 บรรทัด เว้นบรรทัดทุก 2-3 ประโยค ใส่ emoji แค่ 1-2 ตัว`;
    }

    // Ask AI to generate 3 variations
    const multiPrompt = `${searchContext}${prompt}\n\nเขียนให้ 3 แบบ แยกด้วย --- ระหว่างแบบ แต่ละแบบเขียนสไตล์ต่างกัน (แบบ 1: ให้ความรู้แบบเจาะลึก, แบบ 2: เป็นกันเองเหมือนเพื่อนเล่า, แบบ 3: สนุกสนานแบบเบาๆ ไม่ใช้ emoji เยอะ)\n\nสำคัญ: ใช้ข้อมูลจริงจากการค้นหาข้างต้น อย่าเขียนเดาหรือมั่ว\nสำคัญ: ต้องเว้นบรรทัดทุก 2-3 ประโยค อย่าเขียนติดกันเป็นก้อนเดียว\nสำคัญ: ห้ามแต่งราคาเอง ใช้ราคาที่ระบุในรายละเอียดเท่านั้น`;

    const contents = [
      { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
      { role: "model", parts: [{ text: "รับทราบ พร้อมเขียนโพสต์ให้ครับ" }] },
      { role: "user", parts: [{ text: multiPrompt }] },
    ];

    const MODELS = [
      "gemini-3.1-flash-lite",
      "gemini-flash-latest",
      "gemini-flash-lite-latest",
    ];

    async function callGemini(modelIdx: number, attempt: number): Promise<Response> {
      const model = MODELS[modelIdx];
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.8,
              maxOutputTokens: 4000,
            },
          }),
        }
      );
      if (res.status === 503 && attempt < 2) {
        await new Promise((r) => setTimeout(r, 1000 * attempt));
        return callGemini(modelIdx, attempt + 1);
      }
      if (!res.ok && modelIdx < MODELS.length - 1) {
        return callGemini(modelIdx + 1, 1);
      }
      return res;
    }

    const res = await callGemini(0, 1);

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: `AI error: ${err.slice(0, 200)}` }, { status: 500 });
    }

    const data = await res.json();
    const rawText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "ไม่สามารถสร้างโพสต์ได้ ลองอีกครั้ง";

    // Split into 3 variations — AI separates with ---
    const variations = rawText
      .split(/\n\s*-{3,}\s*\n/)
      .map((t: string) => {
        let cleaned = t
          .replace(/\*\*/g, "")
          .replace(/^\s*[-*]\s/gm, "")
          .replace(/[*_`#]/g, "")
          .replace(/^แบบที่\s*\d+/g, "")
          .trim();

        // If text is one long block without line breaks, insert breaks at sentence boundaries
        const lineCount = (cleaned.match(/\n/g) || []).length;
        if (lineCount < 2 && cleaned.length > 100) {
          // Split at Thai sentence endings (ๆ, ครับ, ค่ะ, นะครับ, นะ) followed by space or next sentence
          cleaned = cleaned
            .replace(/(ครับ|ค่ะ|นะครับ|นะ|ครับผม|จริงๆ|เลย|มาก|ของเรา)\s+/g, "$1\n")
            .replace(/(ๆ)\s+/g, "$1\n")
            .replace(/\n{3,}/g, "\n\n")
            .trim();
        }

        return cleaned;
      })
      .filter((t: string) => t.length > 0)
      .slice(0, 3);

    // Fallback: if split didn't work, use the whole text
    const finalVariations = variations.length >= 1 ? variations : [rawText.trim()];

    // Generate hashtags
    const hashtags = generateHashtags(type, serviceName, blogTitle, topic);

    // Suggest best posting times (static recommendations based on Thai social media usage)
    const suggestedTimes = [
      { time: "09:00", label: "เช้า 9:00 — คนเปิดเฟสตอนเริ่มงาน", score: 85 },
      { time: "12:00", label: "เที่ยง 12:00 — พักกินข้าวเล่นเฟส", score: 90 },
      { time: "18:00", label: "เย็น 18:00 — เลิกงานเดินทางกลับ", score: 80 },
      { time: "20:00", label: "ค่ำ 20:00 — ช่วงคนเล่นเฟสเยอะที่สุด", score: 95 },
    ];

    return NextResponse.json({
      variations: finalVariations,
      hashtags,
      suggestedTimes,
      content: finalVariations[0],
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: `Server error: ${msg.slice(0, 200)}` }, { status: 500 });
  }
}

function generateHashtags(type: string, serviceName?: string, blogTitle?: string, topic?: string): string[] {
  const base = ["รับทำเว็บ", "เว็บไซต์", "AWDev", "WebDeveloper"];
  if (type === "promo" && serviceName) {
    if (serviceName.includes("POS")) base.push("POS", "ระบบPOS");
    if (serviceName.includes("แอพ")) base.push("แอพ", "MobileApp");
    if (serviceName.includes("เว็บ")) base.push("เว็บธุรกิจ", "WebDesign");
  }
  if (type === "blog" && blogTitle) {
    const words = blogTitle.split(/\s+/).slice(0, 3).map((w) => w.replace(/[^\u0E00-\u0E7Fa-zA-Z]/g, ""));
    base.push(...words.filter((w) => w.length > 2));
  }
  if (topic) {
    base.push(topic.split(/\s+/).slice(0, 2).join(""));
  }
  return [...new Set(base)].slice(0, 8);
}
