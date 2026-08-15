"use client";

import { useEffect, useState } from "react";

const codeSets = [
  [
    { text: "const dev = {", color: "text-slate-400" },
    { text: "  name: 'AW Dev',", color: "text-cyan-400" },
    { text: "  role: 'Full-Stack Developer',", color: "text-cyan-400" },
    { text: "  stack: ['Next.js', 'React',", color: "text-purple-400" },
    { text: "    'TypeScript', 'Node'],", color: "text-purple-400" },
    { text: "  available: true,", color: "text-green-400" },
    { text: "};", color: "text-slate-400" },
    { text: "", color: "" },
    { text: "dev.build('your-project');", color: "text-slate-200" },
    { text: "// ✓ Deploy successful", color: "text-green-400" },
  ],
  [
    { text: "async function deploy() {", color: "text-slate-400" },
    { text: "  const app = await build({", color: "text-cyan-400" },
    { text: "    framework: 'Next.js',", color: "text-cyan-400" },
    { text: "    db: 'PostgreSQL',", color: "text-purple-400" },
    { text: "    cache: 'Redis',", color: "text-purple-400" },
    { text: "  });", color: "text-slate-400" },
    { text: "  await app.deploy('vercel');", color: "text-slate-200" },
    { text: "  return app.url;", color: "text-green-400" },
    { text: "}", color: "text-slate-400" },
    { text: "", color: "" },
    { text: "// ✓ Live in 2.3s", color: "text-green-400" },
    { text: "// → anucha-dev.vercel.app", color: "text-slate-200" },
  ],
];

const TICK_MS = 80;
const LINE_PAUSE_TICKS = 5;
const RESTART_PAUSE_TICKS = 80;

export default function Terminal() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => clearInterval(id);
  }, []);

  // Calculate total ticks per set
  const setTicks = codeSets.map((lines) => {
    const chars = lines.reduce((sum, l) => sum + l.text.length, 0);
    return chars + (lines.length - 1) * LINE_PAUSE_TICKS + RESTART_PAUSE_TICKS;
  });
  const grandTotal = setTicks.reduce((a, b) => a + b, 0);
  const cycleTick = tick % grandTotal;

  // Find which set we're in
  let setIdx = 0;
  let remaining = cycleTick;
  for (let s = 0; s < codeSets.length; s++) {
    if (remaining < setTicks[s]) {
      setIdx = s;
      break;
    }
    remaining -= setTicks[s];
  }

  const codeLines = codeSets[setIdx];

  let lineIdx = 0;
  let charIdx = 0;

  for (let i = 0; i < codeLines.length; i++) {
    const lineLen = codeLines[i].text.length;
    if (remaining < lineLen) {
      lineIdx = i;
      charIdx = remaining;
      break;
    }
    remaining -= lineLen;
    if (remaining < LINE_PAUSE_TICKS) {
      lineIdx = i;
      charIdx = lineLen;
      break;
    }
    remaining -= LINE_PAUSE_TICKS;
    if (i === codeLines.length - 1) {
      lineIdx = i;
      charIdx = lineLen;
    }
  }

  return (
    <div className="terminal">
      <div className="terminal-header">
        <span className="terminal-dot" style={{ background: "#ff5f56" }} />
        <span className="terminal-dot" style={{ background: "#ffbd2e" }} />
        <span className="terminal-dot" style={{ background: "#27c93f" }} />
        <span className="ml-2 text-xs text-slate-400">~/aw-dev — zsh</span>
      </div>
      <div className="terminal-body" style={{ minHeight: `${codeLines.length * 1.7 + 1}rem` }}>
        {codeLines.map((line, i) => {
          if (i > lineIdx) return null;
          if (i < lineIdx) {
            return (
              <div key={i} className={line.color}>
                {line.text || "\u00A0"}
              </div>
            );
          }
          return (
            <div key={i} className={`${line.color} type-cursor`}>
              {line.text.slice(0, charIdx) || "\u00A0"}
            </div>
          );
        })}
      </div>
    </div>
  );
}
