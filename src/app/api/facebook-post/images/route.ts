import { NextRequest, NextResponse } from "next/server";

// Translate Thai query to English keywords using Gemini AI
async function translateToEnglish(query: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return query;

  try {
    const MODELS = ["gemini-3.1-flash-lite", "gemini-flash-latest", "gemini-flash-lite-latest"];
    for (const model of MODELS) {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: `แปลเป็นคำค้นหารูปภาพภาษาอังกฤษ 1-3 คำ เช่น "website coding" หรือ "business meeting" ตอบแค่คำค้นหาอย่างเดียวไม่ต้องอธิบาย: ${query}` }] }],
            generationConfig: { temperature: 0.3, maxOutputTokens: 50 },
          }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (text && text.length > 1) return text.replace(/["']/g, "").trim();
      }
    }
  } catch {
    // ignore
  }
  return query;
}

// GET — search free images for a given topic
// Uses Pexels API (free) with fallback to Lorem Picsum
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "กรุณาระบุคำค้นหา" });
  }

  try {
    const images: { url: string; description: string; source: string }[] = [];

    // Translate Thai to English for Pexels (Pexels doesn't support Thai well)
    const englishQuery = await translateToEnglish(query);

    // Try Pexels API first (free, requires API key)
    const pexelsKey = process.env.PEXELS_API_KEY?.trim();
    if (pexelsKey) {
      try {
        const res = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(englishQuery)}&per_page=9&orientation=landscape`,
          { headers: { Authorization: pexelsKey } }
        );
        if (res.ok) {
          const data = await res.json();
          if (data.photos && data.photos.length > 0) {
            for (const photo of data.photos.slice(0, 9)) {
              images.push({
                url: photo.src.medium,
                description: photo.alt || `รูปเกี่ยวกับ ${query}`,
                source: "Pexels",
              });
            }
          }
        }
      } catch {
        // Pexels failed, continue to fallback
      }
    }

    // Fallback: use Lorem Picsum (random images, no keyword search but always works)
    if (images.length === 0) {
      const seed = encodeURIComponent(englishQuery);
      for (let i = 0; i < 6; i++) {
        images.push({
          url: `https://picsum.photos/seed/${seed}${i}/800/600`,
          description: `รูปภาพ ${i + 1}`,
          source: "Picsum",
        });
      }
    }

    return NextResponse.json({ images, query, translatedQuery: englishQuery });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
