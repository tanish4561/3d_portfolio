import React, { useEffect, useRef, useState } from "react";
import type { SylvaLivingWorldVariant } from "./shaders/sylva-living-world/SylvaLivingWorldScene";
import { SYLVA_VARIANT_META } from "./portfolioData";

/* ──────────────────────────────────────────────────────────────────────────
   1. 3D Perspective Tilt Card Wrapper with Specular Spotlight
   ────────────────────────────────────────────────────────────────────────── */
export function Tilt3DCard({
  children,
  className = "",
  onClick,
  intensity = 8,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const px = (clientX - rect.left) / rect.width;
      const py = (clientY - rect.top) / rect.height;
      const rotY = (px - 0.5) * intensity * 2;
      const rotX = (0.5 - py) * intensity * 2;
      el.style.transform = `perspective(1100px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(4px)`;
      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(circle at ${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%, rgba(255,255,255,0.16), transparent 62%)`;
      }
    });
  };

  const handleLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (ref.current) {
      ref.current.style.transform =
        "perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }
    if (glareRef.current) {
      glareRef.current.style.background =
        "radial-gradient(circle at 50% 50%, rgba(255,255,255,0), transparent 62%)";
    }
  };

  return (
    <div
      ref={ref}
      className={`tilt-3d-card ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
    >
      <div ref={glareRef} className="tilt-3d-glare" />
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   2. SIH 2025 Winner — Interactive 3D Disaster Command Orbital Globe
   ────────────────────────────────────────────────────────────────────────── */
const SIH_MODULES = [
  "01 · Trainee Auth (50+)",
  "02 · Admin Control (5)",
  "03 · Scenario Simulation",
  "04 · Live Telemetry (55+)",
  "05 · Instant Eval (-60%)",
  "06 · Workflow Auto (-40%)",
];

export function SIHCommandGlobe3D({ onInspectCaseStudy }: { onInspectCaseStudy: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeMod, setActiveMod] = useState(0);
  const pulseRef = useRef(0);
  const dragRef = useRef({ active: false, lastX: 0, lastY: 0, rotY: 0.4, rotX: 0.28 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let isVisible = false;
    let time = 0;

    // 55 concurrent user nodes on sphere
    const nodes = Array.from({ length: 56 }, (_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / 56);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return {
        phi,
        theta,
        isAdmin: i < 5,
        phase: Math.random() * Math.PI * 2,
      };
    });

    const render = () => {
      if (!isVisible) {
        raf = 0;
        return;
      }
      time += 0.016;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.clientWidth || 520;
      const h = canvas.clientHeight || 380;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.52;
      const radius = Math.min(w, h) * 0.31;

      if (!dragRef.current.active) {
        dragRef.current.rotY += 0.0065;
      }
      const ry = dragRef.current.rotY;
      const rx = dragRef.current.rotX;

      // Ambient radial glow
      const bgGrad = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius * 1.55);
      bgGrad.addColorStop(0, "rgba(197, 217, 178, 0.18)");
      bgGrad.addColorStop(0.55, "rgba(116, 168, 122, 0.06)");
      bgGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Pulse wave if triggered
      if (pulseRef.current > 0.01) {
        pulseRef.current *= 0.95;
        const pRad = radius * (1 + (1 - pulseRef.current) * 0.85);
        ctx.strokeStyle = `rgba(197, 217, 178, ${pulseRef.current * 0.65})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, pRad, 0, Math.PI * 2);
        ctx.stroke();
      }

      const project = (x: number, y: number, z: number) => {
        // Rotate Y
        const x1 = x * Math.cos(ry) - z * Math.sin(ry);
        const z1 = x * Math.sin(ry) + z * Math.cos(ry);
        // Rotate X
        const y2 = y * Math.cos(rx) - z1 * Math.sin(rx);
        const z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
        const scale = 420 / (420 - z2 * radius);
        return {
          sx: cx + x1 * radius * scale,
          sy: cy + y2 * radius * scale,
          z: z2,
          scale,
        };
      };

      // Wireframe latitude/longitude rings
      ctx.lineWidth = 0.8;
      for (let lat = -60; lat <= 60; lat += 30) {
        const phi = (lat * Math.PI) / 180;
        ctx.beginPath();
        for (let lon = 0; lon <= 360; lon += 12) {
          const theta = (lon * Math.PI) / 180;
          const x = Math.cos(phi) * Math.cos(theta);
          const y = Math.sin(phi);
          const z = Math.cos(phi) * Math.sin(theta);
          const p = project(x, y, z);
          if (lon === 0) ctx.moveTo(p.sx, p.sy);
          else ctx.lineTo(p.sx, p.sy);
        }
        ctx.strokeStyle = "rgba(197, 217, 178, 0.13)";
        ctx.stroke();
      }

      // 6 Orbital Module Rings & Satellites
      SIH_MODULES.forEach((label, idx) => {
        const angle = (idx / 6) * Math.PI * 2 + time * 0.45;
        const orbitR = 1.32 + (idx % 2) * 0.14;
        const tilt = ((idx - 2.5) * 0.22);
        const ox = Math.cos(angle) * orbitR;
        const oy = Math.sin(angle) * Math.sin(tilt) * orbitR;
        const oz = Math.sin(angle) * Math.cos(tilt) * orbitR;
        const p = project(ox, oy, oz);

        // Connection beam to core
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(p.sx, p.sy);
        ctx.strokeStyle = idx === activeMod ? "rgba(244, 203, 217, 0.55)" : "rgba(197, 217, 178, 0.14)";
        ctx.lineWidth = idx === activeMod ? 1.6 : 0.8;
        ctx.stroke();

        // Satellite node
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, idx === activeMod ? 6.5 : 4.2, 0, Math.PI * 2);
        ctx.fillStyle = idx === activeMod ? "#f4cbd9" : "#c5d9b2";
        ctx.fill();

        if (idx === activeMod || p.z > 0.15) {
          ctx.font = `${idx === activeMod ? "500 11px" : "400 10px"} Lexend, sans-serif`;
          ctx.fillStyle = idx === activeMod ? "#ffffff" : "rgba(255,255,255,0.68)";
          ctx.fillText(label, p.sx + 9, p.sy + 3);
        }
      });

      // Render 55+ Trainee & 5 Admin Nodes on sphere
      const projectedNodes = nodes
        .map((n) => {
          const x = Math.sin(n.phi) * Math.cos(n.theta);
          const y = Math.cos(n.phi);
          const z = Math.sin(n.phi) * Math.sin(n.theta);
          return { ...n, ...project(x, y, z) };
        })
        .sort((a, b) => a.z - b.z);

      projectedNodes.forEach((n) => {
        const alpha = 0.25 + 0.75 * ((n.z + 1) * 0.5);
        const pulse = 0.8 + 0.35 * Math.sin(time * 3 + n.phase);
        const r = (n.isAdmin ? 4.4 : 2.5) * n.scale * pulse;
        ctx.beginPath();
        ctx.arc(n.sx, n.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = n.isAdmin
          ? `rgba(245, 200, 120, ${alpha})`
          : `rgba(197, 217, 178, ${alpha})`;
        ctx.fill();
      });

      // Top HUD overlay inside canvas
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "400 10.5px Lexend, sans-serif";
      ctx.fillText("DRAG TO ROTATE · 55+ CONCURRENT USERS (50 TRAINEES · 5 ADMINS)", 18, 24);

      ctx.restore();
      raf = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = Boolean(entry?.isIntersecting);
        if (isVisible && !raf) {
          raf = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    return () => {
      isVisible = false;
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [activeMod]);

  return (
    <div className="sih-3d-command-card">
      <div className="sih-3d-canvas-wrap">
        <canvas
          ref={canvasRef}
          className="sih-3d-canvas"
          onPointerDown={(e) => {
            dragRef.current.active = true;
            dragRef.current.lastX = e.clientX;
            dragRef.current.lastY = e.clientY;
          }}
          onPointerMove={(e) => {
            if (!dragRef.current.active) return;
            const dx = e.clientX - dragRef.current.lastX;
            const dy = e.clientY - dragRef.current.lastY;
            dragRef.current.rotY += dx * 0.008;
            dragRef.current.rotX = Math.max(-1.1, Math.min(1.1, dragRef.current.rotX + dy * 0.008));
            dragRef.current.lastX = e.clientX;
            dragRef.current.lastY = e.clientY;
          }}
          onPointerUp={() => {
            dragRef.current.active = false;
          }}
          onPointerLeave={() => {
            dragRef.current.active = false;
          }}
        />
        <div className="sih-3d-controls-overlay">
          <div className="sih-module-pills">
            {SIH_MODULES.map((m, i) => (
              <button
                key={m}
                type="button"
                className={`sih-mod-pill ${activeMod === i ? "is-active" : ""}`}
                onClick={() => {
                  setActiveMod(i);
                  pulseRef.current = 1;
                }}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="sih-3d-bottom-bar">
            <button
              type="button"
              className="sih-pulse-btn"
              onClick={() => {
                pulseRef.current = 1;
                setActiveMod((m) => (m + 1) % SIH_MODULES.length);
              }}
            >
              ⚡ Simulate Instant Report (-60% Eval Effort)
            </button>
            <button type="button" className="sih-case-btn" onClick={onInspectCaseStudy}>
              Inspect 10-Point Case Study →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   3. Live 3D Mini-Scenes for Project Cards (NDRF, AI PDF Parser, Bank API)
   ────────────────────────────────────────────────────────────────────────── */
export function Project3DVisualizer({ mode }: { mode: "ndrf" | "pdf" | "bank" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let isVisible = false;
    let t = 0;

    const render = () => {
      if (!isVisible) {
        raf = 0;
        return;
      }
      t += 0.02;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.clientWidth || 360;
      const h = canvas.clientHeight || 200;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.5 + mouseRef.current.x * 14;
      const cy = h * 0.52 + mouseRef.current.y * 10;

      if (mode === "ndrf") {
        // 3D Radar Dome + 6 Orbital Rings
        for (let r = 1; r <= 4; r++) {
          ctx.beginPath();
          ctx.ellipse(cx, cy + 12, r * 28, r * 13, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(197, 217, 178, ${0.12 + r * 0.05})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
        // Rotating scan cone
        const scanAngle = t * 1.4;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 28);
        ctx.lineTo(cx + Math.cos(scanAngle) * 110, cy + 12 + Math.sin(scanAngle) * 48);
        ctx.lineTo(cx + Math.cos(scanAngle + 0.5) * 110, cy + 12 + Math.sin(scanAngle + 0.5) * 48);
        ctx.closePath();
        ctx.fillStyle = "rgba(197, 217, 178, 0.22)";
        ctx.fill();

        // 6 Floating 3D Module Nodes
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2 + t * 0.6;
          const nx = cx + Math.cos(a) * 86;
          const ny = cy - 6 + Math.sin(a) * 34;
          ctx.beginPath();
          ctx.moveTo(cx, cy - 28);
          ctx.lineTo(nx, ny);
          ctx.strokeStyle = "rgba(197, 217, 178, 0.28)";
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(nx, ny, 5, 0, Math.PI * 2);
          ctx.fillStyle = i === 0 ? "#f4cbd9" : "#c5d9b2";
          ctx.fill();
        }
        // Core node
        ctx.beginPath();
        ctx.arc(cx, cy - 28, 7, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      } else if (mode === "pdf") {
        // 3D Volumetric Document Stack + Laser NLP Scanner
        const layers = 7;
        const scanPos = (Math.sin(t * 1.6) + 1) * 0.5; // 0..1
        for (let i = 0; i < layers; i++) {
          const prog = i / (layers - 1);
          const ly = cy - 46 + i * 15;
          const dist = Math.abs(prog - scanPos);
          const active = dist < 0.18;
          const pw = 74;
          const ph = 18;
          ctx.beginPath();
          ctx.moveTo(cx, ly - ph);
          ctx.lineTo(cx + pw, ly);
          ctx.lineTo(cx, ly + ph);
          ctx.lineTo(cx - pw, ly);
          ctx.closePath();
          ctx.fillStyle = active ? "rgba(244, 203, 217, 0.28)" : "rgba(197, 217, 178, 0.07)";
          ctx.strokeStyle = active ? "#f4cbd9" : "rgba(197, 217, 178, 0.28)";
          ctx.lineWidth = active ? 1.8 : 1;
          ctx.fill();
          ctx.stroke();

          if (active) {
            // Extracted NLP heading particles
            for (let k = 0; k < 4; k++) {
              const px = cx + 88 + k * 14;
              const py = ly - 6 + Math.sin(t * 4 + k) * 4;
              ctx.fillStyle = "#f4cbd9";
              ctx.fillRect(px, py, 8, 3);
            }
          }
        }
      } else {
        // 3D Rotating Relational Cube + 12 API Orbitals
        const size = 42;
        const verts = [
          [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
          [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
        ].map(([x, y, z]) => {
          const rx = t * 0.7;
          const ry = t * 0.95;
          const x1 = x * Math.cos(ry) - z * Math.sin(ry);
          const z1 = x * Math.sin(ry) + z * Math.cos(ry);
          const y2 = y * Math.cos(rx) - z1 * Math.sin(rx);
          const z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
          const s = 220 / (220 - z2 * size);
          return [cx + x1 * size * s, cy + y2 * size * s];
        });
        const edges = [
          [0, 1], [1, 2], [2, 3], [3, 0],
          [4, 5], [5, 6], [6, 7], [7, 4],
          [0, 4], [1, 5], [2, 6], [3, 7],
        ];
        ctx.strokeStyle = "#e89b79";
        ctx.lineWidth = 1.4;
        edges.forEach(([a, b]) => {
          ctx.beginPath();
          ctx.moveTo(verts[a][0], verts[a][1]);
          ctx.lineTo(verts[b][0], verts[b][1]);
          ctx.stroke();
        });
        // 12 REST API Endpoint satellites
        for (let i = 0; i < 12; i++) {
          const a = (i / 12) * Math.PI * 2 - t * 0.8;
          const ox = cx + Math.cos(a) * 92;
          const oy = cy + Math.sin(a) * 36;
          ctx.beginPath();
          ctx.arc(ox, oy, 3.2, 0, Math.PI * 2);
          ctx.fillStyle = i % 3 === 0 ? "#ffffff" : "#c5d9b2";
          ctx.fill();
        }
      }

      ctx.restore();
      raf = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = Boolean(entry?.isIntersecting);
        if (isVisible && !raf) {
          raf = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    return () => {
      isVisible = false;
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [mode]);

  return (
    <div
      className="project-3d-stage"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseRef.current = {
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        };
      }}
      onMouseLeave={() => {
        mouseRef.current = { x: 0, y: 0 };
      }}
    >
      <canvas ref={canvasRef} className="project-3d-canvas" />
      <span className="project-3d-tag">
        {mode === "ndrf"
          ? "MERN FULL-STACK · 55+ USERS"
          : mode === "pdf"
            ? "PYTHON + NLP · 500+ PAGES"
            : "PYTHON + SQL · 12 REST APIS"}
      </span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   4. Interactive 3D Skill Constellation Sphere
   ────────────────────────────────────────────────────────────────────────── */
const SKILL_NODES = [
  { label: "React.js", group: "Frameworks", project: "NDRF Dashboard" },
  { label: "TypeScript", group: "Languages", project: "Xebia Certified" },
  { label: "JavaScript ES6+", group: "Languages", project: "NDRF & Web" },
  { label: "Node.js", group: "Frameworks", project: "NDRF & Bank API" },
  { label: "Express", group: "Frameworks", project: "MERN Stack" },
  { label: "Python", group: "Languages", project: "AI PDF Parser" },
  { label: "NLP", group: "Core", project: "92% Heading Accuracy" },
  { label: "Docker", group: "Cloud", project: "Containerized Parser" },
  { label: "SQL / MySQL", group: "Languages", project: "Bank Management" },
  { label: "Vue.js", group: "Frameworks", project: "Frontend UI" },
  { label: "Django", group: "Frameworks", project: "Great Learning Cert" },
  { label: "Framer Motion", group: "Frameworks", project: "Interactive Motion" },
  { label: "AWS", group: "Cloud", project: "Cloud Workflows" },
  { label: "Linux CLI", group: "Cloud", project: "DevOps & Runtime" },
  { label: "Git & CI/CD", group: "Cloud", project: "Version Control" },
  { label: "DSA (300+)", group: "Core", project: "LeetCode & GFG" },
  { label: "RESTful APIs", group: "Core", project: "12 Bank Endpoints" },
  { label: "UI/UX Design", group: "Core", project: "6 Dashboard Modules" },
  { label: "Perf Opt", group: "Core", project: "<10s PDF / <200ms API" },
  { label: "HTML5 & CSS3", group: "Languages", project: "Responsive UI" },
];

export function SkillConstellation3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeGroup, setActiveGroup] = useState<string>("All");
  const [selectedSkill, setSelectedSkill] = useState(SKILL_NODES[0]);
  const rotRef = useRef({ x: 0.2, y: 0.3, dragging: false, lx: 0, ly: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let isVisible = false;
    const N = SKILL_NODES.length;
    const coords = SKILL_NODES.map((item, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return {
        ...item,
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta),
      };
    });

    const render = () => {
      if (!isVisible) {
        raf = 0;
        return;
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.clientWidth || 500;
      const h = canvas.clientHeight || 360;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      if (!rotRef.current.dragging) {
        rotRef.current.y += 0.0055;
      }
      const ry = rotRef.current.y;
      const rx = rotRef.current.x;
      const cx = w * 0.5;
      const cy = h * 0.5;
      const rad = Math.min(w, h) * 0.35;

      const pts = coords.map((c) => {
        const x1 = c.x * Math.cos(ry) - c.z * Math.sin(ry);
        const z1 = c.x * Math.sin(ry) + c.z * Math.cos(ry);
        const y2 = c.y * Math.cos(rx) - z1 * Math.sin(rx);
        const z2 = c.y * Math.sin(rx) + z1 * Math.cos(rx);
        const s = 400 / (400 - z2 * rad);
        return {
          ...c,
          sx: cx + x1 * rad * s,
          sy: cy + y2 * rad * s,
          z: z2,
          s,
        };
      });

      // Draw constellation lines between nearby nodes
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dz = pts[i].z - pts[j].z;
          if (dx * dx + dy * dy + dz * dz < 0.95) {
            ctx.beginPath();
            ctx.moveTo(pts[i].sx, pts[i].sy);
            ctx.lineTo(pts[j].sx, pts[j].sy);
            ctx.strokeStyle = "rgba(197, 217, 178, 0.13)";
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      pts
        .sort((a, b) => a.z - b.z)
        .forEach((p) => {
          const match = activeGroup === "All" || p.group === activeGroup;
          const alpha = (0.3 + 0.7 * ((p.z + 1) * 0.5)) * (match ? 1 : 0.22);
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, (match ? 5 : 3) * p.s, 0, Math.PI * 2);
          ctx.fillStyle =
            p.group === "Languages"
              ? `rgba(197, 217, 178, ${alpha})`
              : p.group === "Frameworks"
                ? `rgba(244, 203, 217, ${alpha})`
                : p.group === "Cloud"
                  ? `rgba(232, 155, 121, ${alpha})`
                  : `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();

          ctx.font = `${match ? "500 11.5px" : "300 10px"} Lexend, sans-serif`;
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fillText(p.label, p.sx + 8, p.sy + 4);
        });

      ctx.restore();
      raf = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = Boolean(entry?.isIntersecting);
        if (isVisible && !raf) {
          raf = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    return () => {
      isVisible = false;
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [activeGroup]);

  return (
    <div className="skill-constellation-shell">
      <div className="skill-constellation-stage">
        <div className="skill-filter-bar">
          {["All", "Languages", "Frameworks", "Cloud", "Core"].map((g) => (
            <button
              key={g}
              type="button"
              className={`skill-filter-btn ${activeGroup === g ? "is-active" : ""}`}
              onClick={() => setActiveGroup(g)}
            >
              {g === "Core" ? "Core CS & DSA" : g === "Cloud" ? "Cloud & DevOps" : g}
            </button>
          ))}
        </div>
        <canvas
          ref={canvasRef}
          className="skill-constellation-canvas"
          onPointerDown={(e) => {
            rotRef.current.dragging = true;
            rotRef.current.lx = e.clientX;
            rotRef.current.ly = e.clientY;
          }}
          onPointerMove={(e) => {
            if (!rotRef.current.dragging) return;
            rotRef.current.y += (e.clientX - rotRef.current.lx) * 0.008;
            rotRef.current.x = Math.max(
              -1.1,
              Math.min(1.1, rotRef.current.x + (e.clientY - rotRef.current.ly) * 0.008),
            );
            rotRef.current.lx = e.clientX;
            rotRef.current.ly = e.clientY;
          }}
          onPointerUp={() => {
            rotRef.current.dragging = false;
          }}
          onPointerLeave={() => {
            rotRef.current.dragging = false;
          }}
        />
        <div className="skill-constellation-caption">
          <span>Drag to rotate · Click any skill chip on the right to inspect project context</span>
          <strong>
            {selectedSkill.label} → {selectedSkill.project}
          </strong>
        </div>
      </div>

      <div className="skill-bento-cards">
        {[
          {
            title: "Languages",
            badge: "6 Core",
            items: SKILL_NODES.filter((s) => s.group === "Languages"),
          },
          {
            title: "Frameworks & Libraries",
            badge: "MERN · Vue · Django",
            items: SKILL_NODES.filter((s) => s.group === "Frameworks"),
          },
          {
            title: "Cloud & DevOps",
            badge: "Docker · AWS · CI/CD",
            items: SKILL_NODES.filter((s) => s.group === "Cloud"),
          },
          {
            title: "Core Competencies",
            badge: "300+ DSA · REST · Perf",
            items: SKILL_NODES.filter((s) => s.group === "Core"),
          },
        ].map((group) => (
          <Tilt3DCard key={group.title} className="skill-bento-card" intensity={6}>
            <div className="skill-bento-top">
              <h4>{group.title}</h4>
              <span>{group.badge}</span>
            </div>
            <div className="skill-bento-chips">
              {group.items.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={`skill-interactive-chip ${
                    selectedSkill.label === item.label ? "is-selected" : ""
                  }`}
                  onClick={() => setSelectedSkill(item)}
                >
                  <strong>{item.label}</strong>
                  <small>{item.project}</small>
                </button>
              ))}
            </div>
          </Tilt3DCard>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   5. Interactive 3D Biome Art Portal (60fps 3D Seasonal Canopy & Petal Sim)
   ────────────────────────────────────────────────────────────────────────── */
export function Biome3DArtPortal({
  activeVariant,
  onSelectVariant,
}: {
  activeVariant: SylvaLivingWorldVariant;
  onSelectVariant: (variant: SylvaLivingWorldVariant) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let isVisible = false;
    let t = 0;

    const palette =
      activeVariant === "sakura-sunset"
        ? {
            bg1: "#3c2c36",
            bg2: "#241820",
            leaf1: "#f9c6d6",
            leaf2: "#ffffff",
            wood: "#4a323b",
            glow: "rgba(255, 210, 224, 0.22)",
          }
        : activeVariant === "maple-autumn"
          ? {
              bg1: "#313a41",
              bg2: "#1c2328",
              leaf1: "#e89b79",
              leaf2: "#d95b38",
              wood: "#3b2e2a",
              glow: "rgba(255, 196, 148, 0.22)",
            }
          : activeVariant === "sequoia-mist"
            ? {
                bg1: "#4e5c52",
                bg2: "#2a332d",
                leaf1: "#d4e3ce",
                leaf2: "#8fb388",
                wood: "#3d312a",
                glow: "rgba(220, 236, 216, 0.26)",
              }
            : {
                bg1: "#383b34",
                bg2: "#21241e",
                leaf1: "#c5d9b2",
                leaf2: "#89b86c",
                wood: "#2d3027",
                glow: "rgba(197, 217, 178, 0.22)",
              };

    const petals = Array.from({ length: 85 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.3 + Math.random() * 0.7,
      speed: 0.15 + Math.random() * 0.35,
      phase: i * 1.3,
      size: 3 + Math.random() * 5.5,
    }));

    const render = () => {
      if (!isVisible) {
        raf = 0;
        return;
      }
      t += 0.016;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.clientWidth || 800;
      const h = canvas.clientHeight || 400;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
      ctx.save();
      ctx.scale(dpr, dpr);

      // Background gradient
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, palette.bg1);
      bg.addColorStop(1, palette.bg2);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Sun/Moon volumetric bloom
      const gx = w * (0.5 + pointerRef.current.x * 0.12);
      const gy = h * (0.58 + pointerRef.current.y * 0.1);
      const bloom = ctx.createRadialGradient(gx, gy, 10, gx, gy, Math.max(w, h) * 0.48);
      bloom.addColorStop(0, palette.glow);
      bloom.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, w, h);

      // Recursive 3D-projected botanical branches
      const drawBranch = (
        x: number,
        y: number,
        len: number,
        angle: number,
        depth: number,
        width: number,
      ) => {
        if (depth === 0) return;
        const sway = Math.sin(t * 1.4 + depth * 0.7) * 0.035 + pointerRef.current.x * 0.06;
        const a = angle + sway;
        const nx = x + Math.cos(a) * len;
        const ny = y + Math.sin(a) * len;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = palette.wood;
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.stroke();

        if (depth <= 3) {
          // Foliage / Blossom cluster at branch nodes
          ctx.beginPath();
          ctx.arc(nx, ny, (4 - depth) * 6.5, 0, Math.PI * 2);
          ctx.fillStyle = depth % 2 === 0 ? palette.leaf1 : palette.leaf2;
          ctx.globalAlpha = 0.78;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        drawBranch(nx, ny, len * 0.74, a - 0.42, depth - 1, width * 0.68);
        drawBranch(nx, ny, len * 0.72, a + 0.38, depth - 1, width * 0.68);
      };

      drawBranch(w * 0.25, h + 10, h * 0.27, -Math.PI / 2 + 0.18, 6, 12);
      drawBranch(w * 0.74, h + 10, h * 0.25, -Math.PI / 2 - 0.16, 6, 11);

      // Drifting 3D Petals / Autumn Leaves / Forest Spores
      petals.forEach((p) => {
        const py = ((p.y + t * p.speed * 0.12) % 1) * h;
        const px =
          ((p.x + Math.sin(t * 0.8 + p.phase) * 0.08 + pointerRef.current.x * 0.15 * p.z + 1) %
            1) *
          w;
        const rot = t * 1.8 + p.phase;
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(rot);
        ctx.scale(1, 0.55 + 0.45 * Math.sin(t * 2.5 + p.phase));
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * p.z, p.size * 0.6 * p.z, 0, 0, Math.PI * 2);
        ctx.fillStyle = p.phase % 2 > 1 ? palette.leaf1 : palette.leaf2;
        ctx.globalAlpha = 0.45 + 0.5 * p.z;
        ctx.fill();
        ctx.restore();
      });

      ctx.restore();
      raf = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = Boolean(entry?.isIntersecting);
        if (isVisible && !raf) {
          raf = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    return () => {
      isVisible = false;
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [activeVariant]);

  return (
    <div className="biome-portal-shell">
      <div className="biome-portal-controls">
        {(
          Object.entries(SYLVA_VARIANT_META) as Array<
            [SylvaLivingWorldVariant, (typeof SYLVA_VARIANT_META)[SylvaLivingWorldVariant]]
          >
        ).map(([key, meta]) => (
          <button
            key={key}
            type="button"
            className={`biome-portal-btn ${activeVariant === key ? "is-active" : ""}`}
            onClick={() => onSelectVariant(key)}
          >
            <span className="biome-portal-swatch" style={{ background: meta.swatch }}>
              <i style={{ background: meta.accent }} />
            </span>
            <div>
              <strong>{meta.label}</strong>
              <small>{meta.season}</small>
            </div>
          </button>
        ))}
      </div>
      <div
        className="biome-portal-stage"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          pointerRef.current = {
            x: (e.clientX - rect.left) / rect.width - 0.5,
            y: (e.clientY - rect.top) / rect.height - 0.5,
          };
        }}
      >
        <canvas ref={canvasRef} className="biome-portal-scene" />
        <div className="biome-portal-badge">
          <span>
            SEASONAL CANOPY · {SYLVA_VARIANT_META[activeVariant].label.toUpperCase()}
          </span>
          <small>{SYLVA_VARIANT_META[activeVariant].atmosphere}</small>
        </div>
        <button
          type="button"
          className="biome-jump-hero-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to Top ↑
        </button>
      </div>
    </div>
  );
}
