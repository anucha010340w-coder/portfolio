"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "รับทำอะไรบ้าง?",
  "ราคาเริ่มต้นเท่าไร?",
  "ติดต่อยังไง?",
];

const IDLE_CHATS = [
  "มีปัญหาอะไรไหม? 👽",
  "สอบถามได้นะ!",
  "บินเล่นๆ~ 🛸",
  "มีอะไรให้ช่วยไหม?",
  "เบื่อจัง... คุยกันมั้ย?",
  "งานเยอะไหมวันนี้?",
  "อยากรู้เรื่องอะไรก็ถามได้นะ!",
  "สบายดีไหมครับ?",
  "มีโปรเจกต์ใหม่ๆ ไหม?",
  "🛸 บินผ่านมาทักทาย~",
  "พิมพ์ถามได้เลยนะ!",
  "ต้องการความช่วยเหลือไหม?",
  "ดูเว็บเพลินไหม? 😆",
  "มีคำถามอะไรก็ถามได้!",
  "🛸 พร้อมตอบทุกคำถาม!",
  "อยากรู้เรื่องราคาไหม?",
  "อยากเห็นผลงานไหม?",
  "ติดต่อง่ายๆ ถามผมได้เลย!",
  "👽 สวัสดีชาวโลก!",
  "เดินทางมาไกล... มีอะไรให้ช่วย?",
];

export default function WalkingAvatar() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "สวัสดีชาวโลก! ผมคือ UFO ผู้ช่วยของ AW Dev มีอะไรให้ช่วยไหมครับ? 🛸",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);
  const [beaming, setBeaming] = useState(false);
  const [attacking, setAttacking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const ufoRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openRef = useRef(false);
  const bubbleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    openRef.current = open;
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Show random speech bubble frequently
  useEffect(() => {
    function showRandomBubble() {
      if (openRef.current) {
        const nextDelay = 3000 + Math.random() * 2000;
        bubbleTimerRef.current = setTimeout(showRandomBubble, nextDelay);
        return;
      }
      const msg = IDLE_CHATS[Math.floor(Math.random() * IDLE_CHATS.length)];
      setBubble(msg);
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
      bubbleTimerRef.current = setTimeout(() => {
        setBubble(null);
        const nextDelay = 3000 + Math.random() * 4000;
        bubbleTimerRef.current = setTimeout(showRandomBubble, nextDelay);
      }, 3000);
    }

    const initialDelay = 1500 + Math.random() * 1500;
    bubbleTimerRef.current = setTimeout(showRandomBubble, initialDelay);

    return () => {
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    };
  }, []);

  // Floating logic — free roam, avoid UI zones
  useEffect(() => {
    const ufo = ufoRef.current;
    if (!ufo) return;

    const ufoSize = 80;
    const margin = 20;

    let vw = window.innerWidth;
    let vh = window.innerHeight;

    function getAvoidZones(): Array<{ x: number; y: number; w: number; h: number }> {
      const zones: Array<{ x: number; y: number; w: number; h: number }> = [];
      zones.push({ x: 0, y: 0, w: vw, h: 70 });
      zones.push({ x: vw - 80, y: vh - 200, w: 80, h: 200 });
      zones.push({ x: 0, y: vh - 60, w: vw, h: 60 });
      return zones;
    }

    function isInAvoidZone(px: number, py: number): boolean {
      const zones = getAvoidZones();
      return zones.some(
        (z) => px + ufoSize > z.x && px < z.x + z.w && py + ufoSize > z.y && py < z.y + z.h
      );
    }

    let x = vw * 0.3;
    let y = vh * 0.4;
    let targetX = x;
    let targetY = y;
    let walking = false;
    let pauseTimer = 0;
    let walkTimer = 0;
    let raf = 0;
    let lastTime = performance.now();
    let bobPhase = 0;
    let pauseDuration = 2;
    let beamCooldown = 3 + Math.random() * 5;
    let beamTimer = 0;
    let beamActive = false;
    let beamDuration = 0;
    let attackCooldown = 8 + Math.random() * 12;
    let attackTimer = 0;
    let attackActive = false;
    const attackDuration = 3.5;

    function pickNewTarget() {
      const maxX = vw - ufoSize - margin;
      const maxY = vh - ufoSize - margin;
      let attempts = 0;
      do {
        targetX = margin + Math.random() * (maxX - margin);
        targetY = margin + Math.random() * (maxY - margin);
        attempts++;
      } while (isInAvoidZone(targetX, targetY) && attempts < 10);
      walking = true;
      walkTimer = 0;
    }

    pauseTimer = 0.5;

    function update(now: number) {
      raf = requestAnimationFrame(update);
      if (!ufo) return;
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Floating bob (always)
      bobPhase += dt * 2;
      const bobY = Math.sin(bobPhase) * 4;

      if (openRef.current) {
        ufo.style.transform = `translate(${x}px, ${y + bobY}px)`;
        return;
      }

      const speed = 50;
      const maxX = vw - ufoSize - margin;
      const maxY = vh - ufoSize - margin;

      // Beam cooldown always counts down
      if (!beamActive) beamCooldown -= dt;
      if (!attackActive) attackCooldown -= dt;

      if (walking && !attackActive) {
        const dx = targetX - x;
        const dy = targetY - y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 5) {
          walking = false;
          pauseTimer = 0;
          pauseDuration = 2 + Math.random() * 3;
          // Check if beam should trigger immediately on arrival (not during attack)
          if (beamCooldown <= 0 && !attackActive) {
            beamActive = true;
            beamDuration = 3 + Math.random() * 2;
            beamTimer = 0;
            setBeaming(true);
          }
        } else {
          const vx = (dx / dist) * speed * dt;
          const vy = (dy / dist) * speed * dt;
          x += vx;
          y += vy;
        }

        walkTimer += dt;
        if (walkTimer > 8) pickNewTarget();
      } else {
        pauseTimer += dt;

        // Beam logic — activate when parked and cooldown ready (not during attack)
        if (!beamActive && !attackActive && beamCooldown <= 0 && pauseTimer > 0.3) {
          beamActive = true;
          beamDuration = 3 + Math.random() * 2;
          beamTimer = 0;
          setBeaming(true);
        }

        if (beamActive) {
          beamTimer += dt;
          if (beamTimer > beamDuration) {
            beamActive = false;
            beamCooldown = 4 + Math.random() * 6;
            setBeaming(false);
          }
        }

        // Don't pick new target during beam or attack
        if (pauseTimer > pauseDuration && !beamActive && !attackActive) {
          pickNewTarget();
        }

        // Attack logic — occasionally spawn enemy and shoot it (not during beam)
        if (!attackActive && !beamActive && attackCooldown <= 0 && pauseTimer > 0.3) {
          attackActive = true;
          attackTimer = 0;
          setAttacking(true);
        }

        if (attackActive) {
          attackTimer += dt;
          if (attackTimer > attackDuration) {
            attackActive = false;
            attackCooldown = 12 + Math.random() * 18;
            setAttacking(false);
          }
        }
      }

      x = Math.max(margin, Math.min(x, maxX));
      y = Math.max(margin, Math.min(y, maxY));

      ufo.style.transform = `translate(${x}px, ${y + bobY}px)`;
    }

    raf = requestAnimationFrame(update);

    function onResize() {
      vw = window.innerWidth;
      vh = window.innerHeight;
      const maxX = vw - ufoSize - margin;
      const maxY = vh - ufoSize - margin;
      if (x > maxX) x = maxX;
      if (y > maxY) y = maxY;
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  async function send(text?: string) {
    const content = text ?? input.trim();
    if (!content || loading) return;

    setInput("");
    const userMsg: Message = { role: "user", content };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: allMessages.slice(-10).map((m) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      const reply: Message = {
        role: "assistant",
        content: data.reply || data.error || "บี๊บ! ลองใหม่อีกครั้งนะครับ",
      };
      setMessages((prev) => [...prev, reply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "บี๊บ... เกิดข้อผิดพลาด ลองใหม่อีกครั้งนะครับ" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating UFO */}
      <div
        ref={ufoRef}
        onClick={() => setOpen(true)}
        className="fixed left-0 top-0 z-[60] cursor-pointer"
        style={{ willChange: "transform", pointerEvents: "auto" }}
        role="button"
        aria-label="เปิดแชต"
      >
        {/* Speech bubble — outside scaleX so text never mirrors */}
        {bubble && (
          <div
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl bg-white px-3 py-1.5 text-center text-xs font-medium text-gray-700 shadow-lg"
            style={{ animation: "bubble-pop 0.3s ease-out" }}>
            {bubble}
            <div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2"
              style={{
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "6px solid white",
              }}
            />
          </div>
        )}

        <div className="relative" style={{ width: 80, height: 80, overflow: "visible" }}>

          {/* Glow under UFO */}
          <div
            className="absolute"
            style={{
              bottom: -6,
              left: "50%",
              transform: "translateX(-50%)",
              width: 60,
              height: 10,
              background: "radial-gradient(ellipse, rgba(99,179,237,0.4) 0%, transparent 70%)",
              borderRadius: "50%",
              filter: "blur(4px)",
            }}
          />

          {/* UFO SVG — classic flying saucer */}
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="ufo-float" style={{ overflow: "visible", position: "absolute", left: 0, top: 0 }}>
            <defs>
              <linearGradient id="beam-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c7d2fe" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#a5b4fc" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Light beam underneath — always visible, intensifies when beaming */}
            <path
              d="M26 48 L16 78 L64 78 L54 48 Z"
              fill="url(#beam-gradient)"
              opacity={beaming ? 0.95 : 0.5}
              style={beaming ? { animation: "beam-pulse 0.3s ease-in-out infinite alternate" } : undefined}
            />

            {/* Extra glow ring on ground when beaming */}
            {beaming && (
              <ellipse cx="40" cy="78" rx="20" ry="3" fill="#a5b4fc" opacity="0.4">
                <animate attributeName="rx" values="14;22;14" dur="0.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0.5;0.2" dur="0.8s" repeatCount="indefinite" />
              </ellipse>
            )}

            {/* Beam particles — floating up dots when beaming */}
            {beaming && (
              <g>
                <circle cx="32" cy="76" r="2.5" fill="#c7d2fe">
                  <animate attributeName="cy" values="78;48" dur="1.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite" />
                  <animate attributeName="r" values="3;1" dur="1.2s" repeatCount="indefinite" />
                </circle>
                <circle cx="48" cy="76" r="2" fill="#a5b4fc">
                  <animate attributeName="cy" values="78;46" dur="1s" repeatCount="indefinite" begin="0.3s" />
                  <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" begin="0.3s" />
                  <animate attributeName="r" values="2.5;0.8" dur="1s" repeatCount="indefinite" begin="0.3s" />
                </circle>
              </g>
            )}

            {/* Top dome (smaller, more proportional) */}
            <ellipse cx="40" cy="28" rx="13" ry="11" fill="#a5b4fc" opacity="0.85" />
            <ellipse cx="40" cy="28" rx="13" ry="11" fill="none" stroke="#818cf8" strokeWidth="1.2" />

            {/* Dome shine */}
            <ellipse cx="36" cy="23" rx="4" ry="3" fill="#fff" opacity="0.5" />

            {/* Alien head inside dome */}
            <circle cx="40" cy="27" r="4.5" fill="#86efac" />
            <ellipse cx="38.5" cy="26" rx="1" ry="1.5" fill="#1e293b" />
            <ellipse cx="41.5" cy="26" rx="1" ry="1.5" fill="#1e293b" />
            <path d="M38.5 28.5 Q40 29.5 41.5 28.5" stroke="#1e293b" strokeWidth="0.5" fill="none" />

            {/* Antenna on top */}
            <line x1="40" y1="17" x2="40" y2="11" stroke="#818cf8" strokeWidth="1.2" />
            <circle cx="40" cy="10" r="1.8" fill="#fbbf24">
              <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
            </circle>

            {/* Saucer upper deck (dome base) */}
            <ellipse cx="40" cy="38" rx="28" ry="6" fill="#94a3b8" />

            {/* Saucer main body — wide and flat */}
            <ellipse cx="40" cy="42" rx="32" ry="8" fill="#64748b" />
            <ellipse cx="40" cy="40" rx="32" ry="6" fill="#94a3b8" />

            {/* Middle band (darker ring) */}
            <ellipse cx="40" cy="42" rx="32" ry="3" fill="#475569" />

            {/* Highlight on top of saucer */}
            <ellipse cx="40" cy="38" rx="24" ry="3" fill="#cbd5e1" opacity="0.5" />

            {/* Bottom of saucer (darker) */}
            <ellipse cx="40" cy="45" rx="28" ry="5" fill="#475569" />

            {/* Lights — evenly spaced around the rim */}
            <circle className="ufo-light" cx="14" cy="43" r="2" fill="#fbbf24" style={{ animationDelay: "0s" }} />
            <circle className="ufo-light" cx="24" cy="46" r="2" fill="#34d399" style={{ animationDelay: "0.3s" }} />
            <circle className="ufo-light" cx="40" cy="47" r="2" fill="#f472b6" style={{ animationDelay: "0.6s" }} />
            <circle className="ufo-light" cx="56" cy="46" r="2" fill="#60a5fa" style={{ animationDelay: "0.9s" }} />
            <circle className="ufo-light" cx="66" cy="43" r="2" fill="#fbbf24" style={{ animationDelay: "1.2s" }} />
          </svg>

          {/* === ATTACK SEQUENCE — separate SVG to avoid viewBox clipping === */}
          {attacking && (
            <svg
              width="200"
              height="80"
              viewBox="0 0 200 80"
              fill="none"
              style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none", zIndex: 10 }}
            >
              {/* Enemy ship — appears to the right of UFO, facing left toward UFO */}
              <g style={{ animation: "enemy-appear 1s ease-out forwards, enemy-destroy 3.5s forwards" }}>
                {/* Enemy fighter — nose points left toward UFO */}
                {/* Main body — nose at left (125), tail at right (165) */}
                <path d="M165 30 L135 22 L125 30 L135 38 Z" fill="#dc2626" />
                {/* Wings — swept back toward right */}
                <path d="M155 28 L170 18 L160 28 Z" fill="#991b1b" />
                <path d="M155 32 L170 42 L160 32 Z" fill="#991b1b" />
                {/* Cockpit */}
                <ellipse cx="140" cy="29" rx="6" ry="3" fill="#fca5a5" opacity="0.8" />
                <ellipse cx="140" cy="28" rx="4" ry="1.5" fill="#fee2e2" opacity="0.6" />
                {/* Nose tip — pointing left toward UFO */}
                <circle cx="125" cy="30" r="2" fill="#fca5a5" />
                {/* Engine glow at back (right side) */}
                <circle cx="165" cy="30" r="2.5" fill="#fbbf24">
                  <animate attributeName="opacity" values="1;0.4;1" dur="0.4s" repeatCount="indefinite" />
                  <animate attributeName="r" values="2.5;3.5;2.5" dur="0.4s" repeatCount="indefinite" />
                </circle>
                {/* Engine trail — going right (away from UFO) */}
                <path d="M165 30 L178 30" stroke="#f97316" strokeWidth="2.5" opacity="0.5" strokeLinecap="round" />
                <path d="M165 30 L172 30" stroke="#fbbf24" strokeWidth="1.5" opacity="0.7" strokeLinecap="round" />
                {/* Blinking red light on top */}
                <circle cx="145" cy="24" r="1.5" fill="#ef4444">
                  <animate attributeName="opacity" values="1;0.2;1" dur="0.5s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* Laser beam — UFO fires at enemy */}
              <g>
                {/* Targeting crosshair — locks on before firing */}
                <g opacity="0">
                  <animate attributeName="opacity" values="0;0;1;1;0;0;0" keyTimes="0;0.15;0.2;0.28;0.3;0.66;1" dur="3.5s" repeatCount="1" />
                  {/* Corner brackets */}
                  <path d="M134 22 L128 22 L128 28" stroke="#ef4444" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  <path d="M154 22 L160 22 L160 28" stroke="#ef4444" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  <path d="M134 38 L128 38 L128 32" stroke="#ef4444" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  <path d="M154 38 L160 38 L160 32" stroke="#ef4444" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  {/* Center dot */}
                  <circle cx="144" cy="30" r="1" fill="#ef4444" />
                  {/* Scan line */}
                  <line x1="128" y1="30" x2="160" y2="30" stroke="#ef4444" strokeWidth="0.5" opacity="0.5">
                    <animate attributeName="opacity" values="0.2;0.8;0.2" dur="0.3s" repeatCount="indefinite" />
                  </line>
                </g>
                {/* Outer glow beam */}
                <line x1="58" y1="38" x2="144" y2="30" stroke="#22d3ee" strokeWidth="4" opacity="0" strokeLinecap="round">
                  <animate attributeName="opacity" values="0;0;0;0.7;0.7;0;0" keyTimes="0;0.25;0.28;0.3;0.6;0.66;1" dur="3.5s" repeatCount="1" />
                </line>
                {/* Inner bright beam */}
                <line x1="58" y1="38" x2="144" y2="30" stroke="#ffffff" strokeWidth="2" opacity="0" strokeLinecap="round">
                  <animate attributeName="opacity" values="0;0;0;1;1;0;0" keyTimes="0;0.25;0.28;0.3;0.6;0.66;1" dur="3.5s" repeatCount="1" />
                </line>
                {/* Charge glow at UFO tip */}
                <circle cx="58" cy="38" r="0" fill="#22d3ee">
                  <animate attributeName="r" values="0;0;4;0;0;0;0" keyTimes="0;0.25;0.28;0.3;0.6;0.66;1" dur="3.5s" repeatCount="1" />
                  <animate attributeName="opacity" values="0;0;1;0;0;0;0" keyTimes="0;0.25;0.28;0.3;0.6;0.66;1" dur="3.5s" repeatCount="1" />
                </circle>
              </g>

              {/* Explosion — flash + expanding ring + particles */}
              <g>
                {/* Flash */}
                <circle cx="145" cy="30" r="0" fill="#fff">
                  <animate attributeName="r" values="0;0;0;16;0;0" keyTimes="0;0.6;0.63;0.68;0.75;1" dur="3.5s" repeatCount="1" />
                  <animate attributeName="opacity" values="0;0;0;1;0;0" keyTimes="0;0.6;0.63;0.68;0.75;1" dur="3.5s" repeatCount="1" />
                </circle>
                {/* Expanding ring */}
                <circle cx="145" cy="30" r="0" fill="none" stroke="#f97316" strokeWidth="2">
                  <animate attributeName="r" values="0;0;0;2;22;28" keyTimes="0;0.6;0.63;0.68;0.85;1" dur="3.5s" repeatCount="1" />
                  <animate attributeName="opacity" values="0;0;0;1;0.3;0" keyTimes="0;0.6;0.63;0.68;0.85;1" dur="3.5s" repeatCount="1" />
                </circle>
                {/* Explosion particles flying outward */}
                <circle cx="145" cy="30" r="3" fill="#fbbf24">
                  <animate attributeName="cx" values="145;145;145;145;125;118" keyTimes="0;0.6;0.63;0.68;0.85;1" dur="3.5s" repeatCount="1" />
                  <animate attributeName="cy" values="30;30;30;30;16;8" keyTimes="0;0.6;0.63;0.68;0.85;1" dur="3.5s" repeatCount="1" />
                  <animate attributeName="opacity" values="0;0;0;1;0.5;0" keyTimes="0;0.6;0.63;0.68;0.85;1" dur="3.5s" repeatCount="1" />
                </circle>
                <circle cx="145" cy="30" r="2.5" fill="#f97316">
                  <animate attributeName="cx" values="145;145;145;145;162;170" keyTimes="0;0.6;0.63;0.68;0.85;1" dur="3.5s" repeatCount="1" />
                  <animate attributeName="cy" values="30;30;30;30;18;12" keyTimes="0;0.6;0.63;0.68;0.85;1" dur="3.5s" repeatCount="1" />
                  <animate attributeName="opacity" values="0;0;0;1;0.4;0" keyTimes="0;0.6;0.63;0.68;0.85;1" dur="3.5s" repeatCount="1" />
                </circle>
                <circle cx="145" cy="30" r="3" fill="#ef4444">
                  <animate attributeName="cx" values="145;145;145;145;125;118" keyTimes="0;0.6;0.63;0.68;0.85;1" dur="3.5s" repeatCount="1" />
                  <animate attributeName="cy" values="30;30;30;30;46;54" keyTimes="0;0.6;0.63;0.68;0.85;1" dur="3.5s" repeatCount="1" />
                  <animate attributeName="opacity" values="0;0;0;1;0.4;0" keyTimes="0;0.6;0.63;0.68;0.85;1" dur="3.5s" repeatCount="1" />
                </circle>
              </g>
            </svg>
          )}
        </div>
      </div>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-[60] flex h-[460px] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center justify-between border-b border-border bg-background/50 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-lg">🛸</div>
              <div>
                <div className="text-sm font-semibold">UFO ผู้ช่วย AW Dev</div>
                <div className="flex items-center gap-1 text-xs text-muted">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  ออนไลน์
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 text-muted transition-colors hover:bg-background hover:text-foreground">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${m.role === "user" ? "rounded-br-md bg-accent text-white" : "rounded-bl-md bg-background text-foreground"}`}>
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-background px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted" />
                  </div>
                </div>
              </div>
            )}

            {messages.length <= 1 && !loading && (
              <div className="flex flex-wrap gap-2 pt-2">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted transition-all hover:border-accent/50 hover:text-accent">
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-border p-3">
            <div className="flex items-center gap-2">
              <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") send(); }} placeholder="พิมพ์ข้อความ..." className="flex-1 rounded-full bg-background px-4 py-2.5 text-sm outline-none placeholder:text-muted" disabled={loading} />
              <button onClick={() => send()} disabled={loading || !input.trim()} aria-label="ส่ง" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-all hover:scale-105 disabled:opacity-40">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M2 12l20-9-9 20-2-7-9-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
