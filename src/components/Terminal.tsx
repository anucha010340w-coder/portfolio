"use client";

import { useEffect, useState } from "react";

const codeLines = [
  { text: "const dev = {", color: "text-muted" },
  { text: "  name: 'AW Dev',", color: "text-accent" },
  { text: "  role: 'Full-Stack Developer',", color: "text-accent" },
  { text: "  stack: ['Next.js', 'React',", color: "text-accent-2" },
  { text: "    'TypeScript', 'Node'],", color: "text-accent-2" },
  { text: "  available: true,", color: "text-green-400" },
  { text: "};", color: "text-muted" },
  { text: "", color: "" },
  { text: "dev.build('your-project');", color: "text-foreground" },
  { text: "// ✓ Deploy successful", color: "text-green-400" },
];

const TICK_MS = 50;
const LINE_PAUSE_TICKS = 5;
const RESTART_PAUSE_TICKS = 80;

export default function Terminal() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => clearInterval(id);
  }, []);

  const totalChars = codeLines.reduce((sum, l) => sum + l.text.length, 0);
  const totalTicks = totalChars + (codeLines.length - 1) * LINE_PAUSE_TICKS + RESTART_PAUSE_TICKS;
  const cycleTick = tick % totalTicks;

  let remaining = cycleTick;
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
    <div className="terminal animate-glow-pulse">
      <div className="terminal-header">
        <span className="terminal-dot" style={{ background: "#ff5f56" }} />
        <span className="terminal-dot" style={{ background: "#ffbd2e" }} />
        <span className="terminal-dot" style={{ background: "#27c93f" }} />
        <span className="ml-2 text-xs text-muted">~/aw-dev — zsh</span>
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
