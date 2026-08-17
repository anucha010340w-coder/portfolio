import { NextRequest, NextResponse } from "next/server";
import { replyComment } from "@/lib/facebook";
import { AI_KNOWLEDGE_BASE } from "@/lib/ai-knowledge";
import { webSearch, formatSearchContext } from "@/lib/web-search";

const SYSTEM_PROMPT = `${AI_KNOWLEDGE_BASE}

หลักการตอบคอมเมนต์:
- ตอบเป็นภาษาไทย เป็นกันเอง สุภาพ เหมือนเจ้าของเพจตอบเอง
- ตอบสั้นกระชับ 1-3 บรรทัด
- ใส่ emoji แค่ 1 ตัวหรือไม่ใส่เลย ไม่เยอะ
- ใช้ความรู้จากข้อมูลข้างต้นและข้อมูลจริงจากอินเทอร์เน็ต ตอบได้ถูกต้องแม่นยำ ไม่มั่ว
- ถ้าคอมเมนต์ถามราคา ตอบราคาประมาณการแล้วชวนทัก LINE: anucha1997w สอบถามเพิ่ม
- ถ้าคอมเมนต์ถามเทคนิค ตอบใจความสั้นๆ ให้ความรู้แล้วชวนทักสอบถาม
- ถ้าคอมเมนต์ชม ขอบคุณและชวนติดตาม
- ถ้าคอมเมนต์ถามเรื่องเว็บ/แอพ/POS ตอบตามความรู้แล้วชวนทัก
- ไม่ใช้ markdown หรือสัญลักษณ์ * ** # _
- ตอบเฉพาะข้อความตอบกลับเท่านั้น ไม่ต้องอธิบายเพิ่ม`;

export async function POST(req: NextRequest) {
  try {
    const { commentMessage, postMessage, mode } = await req.json();

    if (!commentMessage) {
      return NextResponse.json({ error: "กรุณาระบุคอมเมนต์" });
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json({ error: "AI ไม่พร้อมใช้งาน" }, { status: 500 });
    }

    // Search for real info if comment asks a question
    const searchResults = await webSearch(commentMessage.slice(0, 100));
    const searchContext = formatSearchContext(searchResults);

    let prompt = "";
    if (mode === "auto") {
      prompt = `${searchContext}คอมเมนต์จากผู้ใช้: "${commentMessage}"
${postMessage ? `เนื้อหาโพสต์: "${postMessage.slice(0, 300)}"` : ""}

ตอบคอมเมนต์นี้ในฐานะเจ้าของเพจ AW Dev
ใช้ความรู้จากข้อมูลธุรกิจและข้อมูลจริงจากการค้นหา ตอบให้ถูกต้องแม่นยำ ไม่มั่ว
ตอบสั้นๆ เป็นกันเอง ใส่ emoji แค่ 1 ตัวหรือไม่ใส่`;
    } else {
      prompt = `${searchContext}คอมเมนต์จากผู้ใช้: "${commentMessage}"
${postMessage ? `เนื้อหาโพสต์: "${postMessage.slice(0, 300)}"` : ""}

ตอบคอมเมนต์นี้แบบให้ความรู้ ละเอียดหน่อย
อธิบายใจความสำคัญ ใส่ข้อมูลที่เป็นประโยชน์จริง`;
    }

    const MODELS = ["gemini-3.1-flash-lite", "gemini-flash-latest", "gemini-flash-lite-latest"];

    async function callGemini(modelIdx: number): Promise<Response> {
      const model = MODELS[modelIdx];
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
              { role: "model", parts: [{ text: "รับทราบ พร้อมตอบคอมเมนต์ให้ครับ" }] },
              { role: "user", parts: [{ text: prompt }] },
            ],
            generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
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
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "ขอบคุณสำหรับคอมเมนต์ครับ สนใจทัก LINE ได้เลย";

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
