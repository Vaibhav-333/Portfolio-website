// CrystalBackground.js — Animated crystal orb + particle sparkles
// Pure Canvas, zero new dependencies, GPU-composited animations only
import React, { useEffect, useRef } from "react";

const CrystalBackground = ({ theme }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let rafId;
    let t = 0;

    // ── Resize ─────────────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Crystal center — left portion of viewport ──────────
    const getCrystalCenter = () => ({
      x: Math.min(window.innerWidth * 0.14, 200),
      y: window.innerHeight * 0.50,
    });

    // ── Morphing blob radius function ──────────────────────
    // 7 sin-wave components → irregular crystal facet look
    const waveComponents = [
      { amp: 18, freq: 2, phase: 0.00, speed: 0.008 },
      { amp: 12, freq: 3, phase: 1.20, speed: 0.012 },
      { amp:  9, freq: 5, phase: 2.40, speed: 0.006 },
      { amp:  7, freq: 7, phase: 0.90, speed: 0.018 },
      { amp:  5, freq: 11, phase: 3.60, speed: 0.010 },
      { amp:  4, freq: 13, phase: 1.80, speed: 0.014 },
      { amp:  3, freq: 17, phase: 4.50, speed: 0.007 },
    ];
    const BASE_R = 85;

    const blobRadius = (angle, time) => {
      let r = BASE_R;
      for (const c of waveComponents) {
        r += c.amp * Math.sin(c.freq * angle + c.phase + time * c.speed);
      }
      return r;
    };

    // ── Build blob path ────────────────────────────────────
    const buildBlobPath = (cx, cy, time) => {
      const steps = 120;
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const angle = (i / steps) * Math.PI * 2;
        const r = blobRadius(angle, time);
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    // ── Particle system ─────────────────────────────────────
    const PARTICLE_COUNT = 185;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => {
      const angle  = Math.random() * Math.PI * 2;
      const dist   = 95 + Math.random() * 290;
      return {
        angle,
        dist,
        size:          0.5 + Math.random() * 2.2,
        opacity:       0.15 + Math.random() * 0.65,
        driftSpeed:    0.06 + Math.random() * 0.14,
        rotateSpeed:   (Math.random() - 0.5) * 0.003,
        flickerTimer:  Math.random() * Math.PI * 2,
        flickerSpeed:  0.04 + Math.random() * 0.06,
        isBlue:        Math.random() > 0.5,
      };
    });

    const updateParticles = () => {
      particles.forEach(p => {
        p.dist        += p.driftSpeed;
        p.angle       += p.rotateSpeed;
        p.flickerTimer += p.flickerSpeed;
        // reset near crystal
        if (p.dist > 430) {
          p.dist    = 92 + Math.random() * 30;
          p.angle   = Math.random() * Math.PI * 2;
          p.opacity = 0.15 + Math.random() * 0.65;
        }
      });
    };

    const drawParticles = (cx, cy) => {
      particles.forEach(p => {
        const flicker = 0.5 + 0.5 * Math.sin(p.flickerTimer);
        const alpha   = p.opacity * flicker;
        const x = cx + p.dist * Math.cos(p.angle);
        const y = cy + p.dist * Math.sin(p.angle);

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        if (p.isBlue) {
          ctx.fillStyle = `rgba(180,210,255,${alpha})`;
        } else {
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        }
        ctx.fill();
      });
    };

    // ── Draw glow halos ────────────────────────────────────
    const drawGlow = (cx, cy) => {
      // Outer purple halo
      const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 360);
      g1.addColorStop(0,   "rgba(124,58,237,0.10)");
      g1.addColorStop(0.5, "rgba(99,102,241,0.05)");
      g1.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 360, 0, Math.PI * 2);
      ctx.fillStyle = g1;
      ctx.fill();

      // Mid indigo-cyan glow
      const g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 210);
      g2.addColorStop(0,   "rgba(6,182,212,0.18)");
      g2.addColorStop(0.5, "rgba(99,102,241,0.10)");
      g2.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 210, 0, Math.PI * 2);
      ctx.fillStyle = g2;
      ctx.fill();

      // Close cyan glow
      const g3 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 130);
      g3.addColorStop(0,   "rgba(6,182,212,0.28)");
      g3.addColorStop(0.7, "rgba(124,58,237,0.12)");
      g3.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 130, 0, Math.PI * 2);
      ctx.fillStyle = g3;
      ctx.fill();
    };

    // ── Draw crystal body ──────────────────────────────────
    const drawCrystal = (cx, cy, time) => {
      buildBlobPath(cx, cy, time);

      // Body fill — gradient
      const bodyGrad = ctx.createRadialGradient(cx - 20, cy - 20, 5, cx, cy, BASE_R + 20);
      bodyGrad.addColorStop(0,    "rgba(220,240,255,0.32)");
      bodyGrad.addColorStop(0.45, "rgba(160,200,255,0.18)");
      bodyGrad.addColorStop(1,    "rgba(80,120,220,0.08)");
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // Crystal rim glow
      ctx.strokeStyle = "rgba(160,210,255,0.25)";
      ctx.lineWidth   = 1.5;
      ctx.stroke();

      // Specular highlights — ice glint
      const specs = [
        { ox: -22, oy: -28, r: 9,  a: 0.55 },
        { ox:  15, oy: -18, r: 6,  a: 0.38 },
        { ox: -10, oy:  25, r: 4,  a: 0.22 },
      ];
      specs.forEach(s => {
        const sg = ctx.createRadialGradient(cx+s.ox, cy+s.oy, 0, cx+s.ox, cy+s.oy, s.r);
        sg.addColorStop(0, `rgba(255,255,255,${s.a})`);
        sg.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.arc(cx + s.ox, cy + s.oy, s.r, 0, Math.PI * 2);
        ctx.fillStyle = sg;
        ctx.fill();
      });

      // Inner core
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 45);
      coreGrad.addColorStop(0,   "rgba(200,230,255,0.22)");
      coreGrad.addColorStop(0.6, "rgba(100,160,255,0.08)");
      coreGrad.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 45, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();
    };

    // ── Main draw loop ─────────────────────────────────────
    const draw = () => {
      const w  = canvas.width;
      const h  = canvas.height;
      const { x: cx, y: cy } = getCrystalCenter();

      ctx.clearRect(0, 0, w, h);

      updateParticles();
      drawGlow(cx, cy);
      drawParticles(cx, cy);
      drawCrystal(cx, cy, t);

      t  += 1;
      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "fixed",
        top:            0,
        left:           0,
        width:          "100vw",
        height:         "100vh",
        zIndex:         0,
        pointerEvents: "none",
        willChange:    "transform",
      }}
      aria-hidden="true"
    />
  );
};

export default CrystalBackground;
