// Free web search utilities — no API key needed
// Uses DuckDuckGo Instant Answer API + Wikipedia API

type SearchResult = {
  title: string;
  snippet: string;
  url: string;
  source: string;
};

// Search DuckDuckGo Instant Answer API (free, no key)
async function searchDuckDuckGo(query: string): Promise<SearchResult[]> {
  try {
    const res = await fetch(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) return [];
    const data = await res.json();

    const results: SearchResult[] = [];

    // Abstract (main answer)
    if (data.AbstractText) {
      results.push({
        title: data.Heading || query,
        snippet: data.AbstractText,
        url: data.AbstractURL || "",
        source: "DuckDuckGo",
      });
    }

    // Related topics
    if (data.RelatedTopics) {
      for (const topic of data.RelatedTopics.slice(0, 5)) {
        if (topic.Text) {
          results.push({
            title: topic.Text.split(" - ")[0] || topic.Text.slice(0, 80),
            snippet: topic.Text,
            url: topic.FirstURL || "",
            source: "DuckDuckGo",
          });
        }
        if (topic.Topics) {
          for (const sub of topic.Topics.slice(0, 3)) {
            if (sub.Text) {
              results.push({
                title: sub.Text.split(" - ")[0] || sub.Text.slice(0, 80),
                snippet: sub.Text,
                url: sub.FirstURL || "",
                source: "DuckDuckGo",
              });
            }
          }
        }
      }
    }

    return results;
  } catch {
    return [];
  }
}

// Search Wikipedia API (free, no key, very reliable for knowledge)
async function searchWikipedia(query: string): Promise<SearchResult[]> {
  try {
    // Search for articles
    const searchRes = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&srlimit=3`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (!searchRes.ok) return [];
    const searchData = await searchRes.json();
    const titles = searchData?.query?.search?.map((s: { title: string }) => s.title) || [];
    if (titles.length === 0) return [];

    // Get summaries for top results
    const results: SearchResult[] = [];
    for (const title of titles.slice(0, 3)) {
      const summaryRes = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
        { signal: AbortSignal.timeout(5000) }
      );
      if (summaryRes.ok) {
        const summary = await summaryRes.json();
        if (summary.extract) {
          results.push({
            title: summary.title || title,
            snippet: summary.extract,
            url: summary.content_urls?.desktop?.page || "",
            source: "Wikipedia",
          });
        }
      }
    }

    return results;
  } catch {
    return [];
  }
}

// Thai Wikipedia search
async function searchThaiWikipedia(query: string): Promise<SearchResult[]> {
  try {
    const searchRes = await fetch(
      `https://th.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&srlimit=3`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (!searchRes.ok) return [];
    const searchData = await searchRes.json();
    const titles = searchData?.query?.search?.map((s: { title: string }) => s.title) || [];
    if (titles.length === 0) return [];

    const results: SearchResult[] = [];
    for (const title of titles.slice(0, 3)) {
      const summaryRes = await fetch(
        `https://th.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
        { signal: AbortSignal.timeout(5000) }
      );
      if (summaryRes.ok) {
        const summary = await summaryRes.json();
        if (summary.extract) {
          results.push({
            title: summary.title || title,
            snippet: summary.extract,
            url: summary.content_urls?.desktop?.page || "",
            source: "Wikipedia (ไทย)",
          });
        }
      }
    }

    return results;
  } catch {
    return [];
  }
}

// Main search function — tries multiple sources in parallel
export async function webSearch(query: string): Promise<SearchResult[]> {
  const [ddg, wikiEn, wikiTh] = await Promise.all([
    searchDuckDuckGo(query),
    searchWikipedia(query),
    searchThaiWikipedia(query),
  ]);

  const all = [...ddg, ...wikiEn, ...wikiTh];
  // Deduplicate by URL
  const seen = new Set<string>();
  return all.filter((r) => {
    if (r.url && seen.has(r.url)) return false;
    if (r.url) seen.add(r.url);
    return true;
  });
}

// Format search results as context for AI
export function formatSearchContext(results: SearchResult[]): string {
  if (results.length === 0) return "";
  const formatted = results
    .slice(0, 8)
    .map((r, i) => `[${i + 1}] ${r.title}\n${r.snippet}\nแหล่ง: ${r.source} ${r.url}`)
    .join("\n\n");
  return `\nข้อมูลจริงจากอินเทอร์เน็ต (ใช้เป็นข้อมูลอ้างอิง อย่ามั่ว):\n${formatted}\n`;
}
