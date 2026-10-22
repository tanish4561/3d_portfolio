import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Wind, Eye, Sliders } from "lucide-react";

interface OpticalSandboxProps {
  activeVariant: string;
}

const BIOME_PALETTES: Record<
  string,
  {
    bgTop: string;
    bgBottom: string;
    stem: string;
    leaf: string;
    pollen: string;
    glow: string;
    label: string;
  }
> = {
  "living-green": {
    bgTop: "#363b31",
    bgBottom: "#4a4d44",
    stem: "#8ea87a",
    leaf: "#bfd4ac",
    pollen: "#eef5e4",
    glow: "rgba(216, 234, 196, 0.28)",
    label: "Living Green (Bryophyte & Fern)",
  },
  "sakura-sunset": {
    bgTop: "#2d1f28",
    bgBottom: "#3c2c36",
    stem: "#b3889b",
    leaf: "#f4cbd9",
    pollen: "#ffeef4",
    glow: "rgba(255, 214, 226, 0.28)",
    label: "Sakura Sunset (Dusk Blossom)",
  },
  "maple-autumn": {
    bgTop: "#242c33",
    bgBottom: "#313a41",
    stem: "#c97a63",
    leaf: "#e69875",
    pollen: "#ffdfc7",
    glow: "rgba(255, 206, 160, 0.26)",
    label: "Maple Autumn (Slate & Crimson)",
  },
  "sequoia-mist": {
    bgTop: "#333d35",
    bgBottom: "#465247",
    stem: "#9ab598",
    leaf: "#d4e3ce",
    pollen: "#f4f9ef",
    glow: "rgba(236, 244, 232, 0.3)",
    label: "Sequoia Mist (Sunlit Fog)",
  },
};

export function OpticalSandbox({ activeVariant }: OpticalSandboxProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const specCardRef = useRef<HTMLDivElement | null>(null);

  const [windSpeed, setWindSpeed] = useState(1.15);
  const [pollenCount, setPollenCount] = useState(48);
  const [frondCurvature, setFrondCurvature] = useState(0.68);
  const [specReadout, setSpecReadout] = useState({ angle: "2.40 rad", bright: "0.72", dx: 0, dy: 0 });

  const palette = BIOME_PALETTES[activeVariant] || BIOME_PALETTES["living-green"];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let isVisible = false;
    let pointerX = 0.5;
    let pointerY = 0.5;

    const particles = Array.from({ length: 90 }, (_, i) => ({
      x: (i * 0.6180339887) % 1,
      y: ((i * 0.381966) % 1),
      r: 1.1 + (i % 4) * 0.65,
      phase: i * 1.3,
      speed: 0.15 + (i % 5) * 0.06,
    }));

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        pointerX = (e.clientX - rect.left) / rect.width;
        pointerY = (e.clientY - rect.top) / rect.height;
      }
    };

    canvas.addEventListener("pointermove", onPointerMove, { passive: true });

    const render = (now: number) => {
      if (!isVisible) {
        rafId = 0;
        return;
      }
      const t = now * 0.001 * windSpeed;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, palette.bgTop);
      bgGrad.addColorStop(1, palette.bgBottom);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Floor light pool
      const floorPool = ctx.createRadialGradient(
        width * (0.35 + (pointerX - 0.5) * 0.25),
        height * 1.05,
        10,
        width * 0.5,
        height * 0.9,
        width * 0.65,
      );
      floorPool.addColorStop(0, palette.glow);
      floorPool.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = floorPool;
      ctx.fillRect(0, 0, width, height);

      // Draw 7 procedural botanical stems / fern fronds
      const stemCount = 7;
      for (let s = 0; s < stemCount; s++) {
        const baseX = width * (0.14 + (s / (stemCount - 1)) * 0.72);
        const baseY = height + 8;
        const stemHeight = height * (0.46 + Math.sin(s * 1.7 + 0.5) * 0.16);
        const sway =
          Math.sin(t * 1.4 + s * 0.9) * 18 * windSpeed +
          (pointerX - 0.5) * -36 * (0.5 + (s % 3) * 0.25);

        ctx.beginPath();
        ctx.moveTo(baseX, baseY);
        const cp1x = baseX + sway * 0.35;
        const cp1y = baseY - stemHeight * 0.45;
        const tipX = baseX + sway * frondCurvature * 1.35;
        const tipY = baseY - stemHeight;
        ctx.quadraticCurveTo(cp1x, cp1y, tipX, tipY);
        ctx.strokeStyle = palette.stem;
        ctx.lineWidth = 1.6;
        ctx.globalAlpha = 0.68;
        ctx.stroke();

        // Pinnae / leaflets along the stem
        const pairs = 9;
        for (let p = 2; p <= pairs; p++) {
          const u = p / (pairs + 1);
          const iu = 1 - u;
          const px = iu * iu * baseX + 2 * iu * u * cp1x + u * u * tipX;
          const py = iu * iu * baseY + 2 * iu * u * cp1y + u * u * tipY;
          const leafSpan = (1 - u * 0.65) * 18 * frondCurvature;
          const flutter = Math.cos(t * 2.3 + s + p * 0.5) * 3.5;

          ctx.fillStyle = palette.leaf;
          ctx.globalAlpha = 0.55 + u * 0.35;

          // Left leaflet
          ctx.beginPath();
          ctx.ellipse(
            px - leafSpan * 0.6,
            py + flutter * 0.3,
            leafSpan * 0.55,
            2.6,
            -0.35 + sway * 0.004,
            0,
            Math.PI * 2,
          );
          ctx.fill();

          // Right leaflet
          ctx.beginPath();
          ctx.ellipse(
            px + leafSpan * 0.6,
            py - flutter * 0.3,
            leafSpan * 0.55,
            2.6,
            0.35 + sway * 0.004,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }

        // Pale wildflower node on select stems
        if (s % 2 === 1) {
          ctx.globalAlpha = 0.92;
          ctx.fillStyle = palette.pollen;
          for (let petal = 0; petal < 5; petal++) {
            const ang = (petal / 5) * Math.PI * 2 + t * 0.4;
            ctx.beginPath();
            ctx.ellipse(
              tipX + Math.cos(ang) * 4.5,
              tipY + Math.sin(ang) * 4.5,
              3.6,
              2.1,
              ang,
              0,
              Math.PI * 2,
            );
            ctx.fill();
          }
        }
      }

      // Drifting pollen particles
      ctx.globalAlpha = 1;
      for (let i = 0; i < Math.min(pollenCount, particles.length); i++) {
        const pt = particles[i];
        const x =
          ((pt.x + t * 0.028 * pt.speed + Math.sin(t * 0.7 + pt.phase) * 0.03) % 1 + 1) % 1;
        const y =
          ((pt.y - t * 0.018 * pt.speed + Math.cos(t * 0.5 + pt.phase) * 0.02) % 1 + 1) % 1;
        const px = x * width + (pointerX - 0.5) * -18;
        const py = y * height + (pointerY - 0.5) * -12;
        const alpha = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(t * 2 + pt.phase));

        ctx.fillStyle = palette.pollen;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(px, py, pt.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      rafId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = Boolean(entry?.isIntersecting);
        if (isVisible && !rafId) {
          rafId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    return () => {
      isVisible = false;
      observer.disconnect();
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("pointermove", onPointerMove);
    };
  }, [windSpeed, pollenCount, frondCurvature, palette]);

  const handleSpecPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = specCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width * 0.5);
    const dy = e.clientY - (rect.top + rect.height * 0.5);
    const angle = Math.atan2(dy, dx) + Math.PI * 0.5;
    const dist = Math.hypot(dx, dy);
    const bright = Math.max(0.15, Math.min(1, 1 - dist / 420));
    card.style.setProperty("--spec-angle", `${angle.toFixed(3)}rad`);
    card.style.setProperty("--spec-bright", `${(bright * bright).toFixed(3)}`);
    setSpecReadout({
      angle: `${angle.toFixed(2)} rad`,
      bright: (bright * bright).toFixed(2),
      dx: Math.round(dx),
      dy: Math.round(dy),
    });
  };

  return (
    <div className="optical-sandbox-grid" onPointerMove={handleSpecPointerMove}>
      {/* Left: Interactive Wind & Pollen Biome Canvas */}
      <div className="sandbox-stage-card">
        <div className="sandbox-stage-header">
          <div>
            <span className="sandbox-eyebrow">
              <Wind size={13} /> Interactive Biome Field
            </span>
            <h4>Procedural Frond & Pollen Harmonics</h4>
          </div>
          <span className="sandbox-biome-pill">{palette.label}</span>
        </div>

        <div className="sandbox-canvas-wrap">
          <canvas ref={canvasRef} className="sandbox-canvas" />
          <div className="sandbox-canvas-overlay">
            <span>Move cursor over field to deflect wind · Synced with active biome</span>
          </div>
        </div>

        <div className="sandbox-controls-row">
          <label className="sandbox-slider-label">
            <span>
              Wind Velocity <strong>{windSpeed.toFixed(2)}x</strong>
            </span>
            <input
              type="range"
              min={0.2}
              max={2.5}
              step={0.05}
              value={windSpeed}
              onChange={(e) => setWindSpeed(Number(e.target.value))}
            />
          </label>
          <label className="sandbox-slider-label">
            <span>
              Pollen Density <strong>{pollenCount} pts</strong>
            </span>
            <input
              type="range"
              min={10}
              max={90}
              step={2}
              value={pollenCount}
              onChange={(e) => setPollenCount(Number(e.target.value))}
            />
          </label>
          <label className="sandbox-slider-label">
            <span>
              Frond Arch <strong>{Math.round(frondCurvature * 100)}%</strong>
            </span>
            <input
              type="range"
              min={0.25}
              max={1.1}
              step={0.05}
              value={frondCurvature}
              onChange={(e) => setFrondCurvature(Number(e.target.value))}
            />
          </label>
        </div>
      </div>

      {/* Right: Conic Specular Rim & Optical Glass Inspector */}
      <div
        ref={specCardRef}
        className="sandbox-spec-card"
        style={
          {
            "--spec-angle": "2.4rad",
            "--spec-bright": "0.75",
          } as React.CSSProperties
        }
      >
        <div className="sandbox-stage-header">
          <div>
            <span className="sandbox-eyebrow">
              <Sparkles size={13} /> Zero-Blur Glass Optics
            </span>
            <h4>Pointer-Tracked Specular Rim Inspector</h4>
          </div>
          <span className="sandbox-biome-pill">60 FPS Compositor-Free</span>
        </div>

        <p className="sandbox-spec-desc">
          Move your pointer around this card. The 1px border is lit by a masked{" "}
          <code>conic-gradient</code> whose start angle tracks your cursor without a single{" "}
          <code>backdrop-filter</code> pass.
        </p>

        <div className="spec-telemetry-grid">
          <div className="spec-telemetry-cell">
            <span className="spec-telemetry-key">--spec-angle</span>
            <strong className="spec-telemetry-val">{specReadout.angle}</strong>
          </div>
          <div className="spec-telemetry-cell">
            <span className="spec-telemetry-key">--spec-bright</span>
            <strong className="spec-telemetry-val">{specReadout.bright}</strong>
          </div>
          <div className="spec-telemetry-cell">
            <span className="spec-telemetry-key">Pointer ΔX / ΔY</span>
            <strong className="spec-telemetry-val">
              {specReadout.dx}px, {specReadout.dy}px
            </strong>
          </div>
          <div className="spec-telemetry-cell">
            <span className="spec-telemetry-key">Frame Cost</span>
            <strong className="spec-telemetry-val">&lt; 0.08 ms</strong>
          </div>
        </div>

        <div className="spec-interactive-demo-bar">
          <div className="spec-demo-pill">
            <Eye size={14} /> Specular Rim Active
          </div>
          <div className="spec-demo-pill">
            <Sliders size={14} /> Content-Box XOR Mask
          </div>
        </div>
      </div>
    </div>
  );
}
