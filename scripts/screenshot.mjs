import puppeteer from "puppeteer";
import { mkdir } from "fs/promises";
import path from "path";

const BASE_URL = "http://localhost:3000";
const OUTPUT_DIR = path.resolve("public/projects");

const demos = [
  { slug: "pos-restaurant", path: "/demo/pos" },
  { slug: "ecommerce-website", path: "/demo/ecommerce" },
  { slug: "booking-system", path: "/demo/booking" },
  { slug: "company-website", path: "/demo/company" },
  { slug: "inventory-system", path: "/demo/inventory" },
  { slug: "mobile-delivery", path: "/demo/delivery" },
];

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const demo of demos) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });

    console.log(`Capturing ${demo.slug}...`);
    await page.goto(`${BASE_URL}${demo.path}`, { waitUntil: "networkidle0", timeout: 30000 });

    // Wait a bit for animations to settle
    await new Promise((r) => setTimeout(r, 1500));

    // Hide Navbar and Footer, then screenshot only the demo content
    await page.evaluate(() => {
      // Remove navbar and footer
      document.querySelectorAll("header, footer").forEach((el) => {
        el.style.display = "none";
      });
      // Remove the "กลับ" back button from demo layout
      document.querySelectorAll("a").forEach((el) => {
        if (el.textContent?.includes("กลับ")) {
          el.style.display = "none";
        }
      });
    });

    // Find the demo content container (first child of main, or the demo layout div)
    const clip = await page.evaluate(() => {
      const main = document.querySelector("main");
      if (main) {
        const demoDiv = main.querySelector("div");
        if (demoDiv) {
          const rect = demoDiv.getBoundingClientRect();
          return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
        }
        const rect = main.getBoundingClientRect();
        return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
      }
      return null;
    });

    const outPath = path.join(OUTPUT_DIR, `${demo.slug}.png`);
    if (clip) {
      await page.screenshot({
        path: outPath,
        clip: {
          x: clip.x,
          y: clip.y,
          width: clip.width,
          height: Math.min(clip.height, 800),
        },
        type: "png",
      });
    } else {
      await page.screenshot({
        path: outPath,
        fullPage: false,
        type: "png",
      });
    }
    console.log(`  Saved to ${outPath}`);
    await page.close();
  }

  await browser.close();
  console.log("Done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
