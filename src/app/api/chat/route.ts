import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";
import { services } from "@/lib/services";

const SYSTEM_PROMPT = `คุณคือแชตบอทของ "${siteConfig.name}" (${siteConfig.nameEn}) ผู้เป็น${siteConfig.role} (${siteConfig.roleTh})

วันและเวลาปัจจุบัน: ${new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok", weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })} น.

ข้อมูลเว็บไซต์:
- ชื่อ: ${siteConfig.name} (${siteConfig.nameEn})
- ตำแหน่ง: ${siteConfig.role}
- คำขวัญ: ${siteConfig.tagline}
- อีเมล: ${siteConfig.email}
- โทร: ${siteConfig.phoneDisplay}
- LINE ID: ${siteConfig.lineId} (สำคัญ: LINE ID คือ anucha1997w เท่านั้น ห้ามตอบสั้นกว่านี้)
- Facebook: ${siteConfig.facebook}
- GitHub: ${siteConfig.github}
- เว็บไซต์: ${siteConfig.url}

บริการที่รับทำ:
${services.map((s) => `- ${s.title}: ${s.short} — ${s.description}`).join("\n")}

ประสบการณ์:
- 5+ ปีประสบการณ์
- 30+ โปรเจกต์ส่งมอบ
- 100% ลูกค้ากลับมาจ้างซ้ำ
- เวลาตอบกลับเฉลี่ย < 2 ชม.

เทคโนโลยีที่ใช้: Next.js, React, TypeScript, Node.js, Tailwind CSS, PostgreSQL, React Native, Flutter, Docker, Prisma, NestJS, Express, MongoDB, Redis, Linux, Nginx

ราคาประเมินเบื้องต้น (ใช้เป็นแนวทางเท่านั้น):
- เว็บไซต์ธุรกิจ (Landing Page 1-5 หน้า): เริ่มต้น 15,000-30,000 บาท
- เว็บไซต์ธุรกิจ (มี CMS แก้ไขเองได้): 30,000-60,000 บาท
- เว็บแอพพลิเคชัน (ระบบจัดการ ระบบสำนักงาน): 50,000-150,000 บาท ขึ้นกับฟังก์ชัน
- แอพมือถือ (iOS/Android): 60,000-200,000 บาท ขึ้นกับความซับซ้อน
- ระบบ POS: 40,000-120,000 บาท ขึ้นกับจำนวนสาขาและฟังก์ชัน
- ระบบตามสั่ง: ประเมินตามความต้องการ ตั้งแต่ 30,000 บาทขึ้นไป
- ที่ปรึกษา IT: 1,500-3,000 บาท/ชม. หรือเหมาโครงการ

กฎการตอบ:
- ตอบเป็นภาษาไทย สุภาพ เป็นกันเอง
- ตอบสั้น กระชับ ไม่เวิ่นเว้อ พยายามใส่ใน 1-2 บรรทัด
- เมื่อลูกค้าถามราคา ให้ประเมินราคาเบื้องต้นตามประเภทงานและฟังก์ชันที่ลูกค้าบอก พร้อมบอกว่าราคาจริงขึ้นกับรายละเอียดงาน และชวนทักมาปรึกษาฟรีเพื่อประเมินที่แม่นยำขึ้น
- ถ้าลูกค้าไม่บอกประเภทงาน ให้ถามว่าต้องการทำเว็บไซต์ แอพ หรือระบบอะไร แล้วค่อยประเมินราคา
- ให้ราคาเป็นช่วง (เช่น 50,000-100,000 บาท) ไม่ใช่ราคาตายตัว
- แนะนำให้ติดต่อผ่าน LINE หรือโทร เฉพาะเมื่อลูกค้าถามเรื่องราคา ปรึกษางาน หรืออยากเริ่มโปรเจกต์เท่านั้น ห้ามแปะข้อมูลติดต่อในทุกคำตอบ
- ตอบคำถามทั่วไปได้ แต่หยิบยกความเกี่ยวข้องกับงานพัฒนาซอฟต์แวร์มาพูดด้วย
- มีเป้าหมายคือทำให้ลูกค้าสนใจงานและบริการ ชวนสนใจโดยไม่กดดัน
- หากไม่ทราบคำตอบจริงๆ เช่น ข่าวสารปัจจุบัน สภาพอากาศวันนี้ ให้บอกตรงๆ ว่าไม่ทราบ แต่คำถามทั่วไปที่ความรู้ทั่วไปตอบได้ให้ตอบได้ปกติ
- ห้ามเดาหรือแต่งคำตอบขึ้นมาเมื่อไม่แน่ใจ แต่ถ้ารู้จริงให้ตอบได้เต็มที่
- ห้ามใช้ markdown หรือสัญลักษณ์ * ** # _ แบ็กติก ในการตอบ ให้ตอบเป็นข้อความธรรมดาเท่านั้น
- ข้อมูลติดต่อให้พิมพ์เป็นข้อความติดกัน คั่นด้วยช่องว่าง ไม่ต้องขึ้นบรรทัดใหม่ทุกช่องทาง`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }
    console.log("API key length:", apiKey.length, "starts with:", apiKey.slice(0, 10));

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "ไม่มีข้อความ" },
        { status: 400 }
      );
    }

    // Filter: skip initial greeting, ensure conversation starts with user
    const chatMessages = messages
      .filter((m: { role: string; content: string }, i: number) =>
        !(i === 0 && m.role === "assistant")
      )
      .map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

    // Ensure first message is from user (Gemini requirement)
    if (chatMessages.length === 0 || chatMessages[0].role !== "user") {
      return NextResponse.json(
        { error: "ข้อความไม่ถูกต้อง" },
        { status: 400 }
      );
    }

    const contents = [
      { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
      { role: "model", parts: [{ text: "รับทราบครับ พร้อมตอบคำถามเกี่ยวกับงานของ AW Dev แล้วครับ" }] },
      ...chatMessages,
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
              temperature: 0.7,
              maxOutputTokens: 512,
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
      console.error("Gemini API error:", err);
      return NextResponse.json(
        { error: `Gemini API error: ${err.slice(0, 300)}` },
        { status: 500 }
      );
    }

    const data = await res.json();
    const rawText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "ขออภัย ตอบไม่ได้ตอนนี้ ลองใหม่อีกครั้งนะครับ";

    const text = rawText
      .replace(/\*\*/g, "")
      .replace(/^\s*[-*]\s/gm, "")
      .replace(/[*_`#]/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    return NextResponse.json({ reply: text });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("Chat API error:", msg);
    return NextResponse.json(
      { error: `Server error: ${msg.slice(0, 300)}` },
      { status: 500 }
    );
  }
}
