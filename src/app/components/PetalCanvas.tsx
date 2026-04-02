import { useEffect, useRef } from 'react';

type PetalType = 0 | 1 | 2;

interface Petal {
  x: number; y: number;
  size: number;
  rotation: number; rotSpeed: number;
  vy: number; vx: number;
  opacity: number;
  phase: number; wobbleSpeed: number;
  amplitude: number;
  type: PetalType;
  color1: string; color2: string;
  scaleX: number;
}

const PETAL_COLORS: [string, string][] = [
  ['rgba(235,180,170,0.9)', 'rgba(210,145,140,0.35)'],
  ['rgba(245,228,215,0.85)', 'rgba(220,193,175,0.3)'],
  ['rgba(205,158,158,0.75)', 'rgba(175,123,123,0.28)'],
  ['rgba(255,242,232,0.65)', 'rgba(232,202,188,0.22)'],
  ['rgba(183,133,148,0.82)', 'rgba(152,103,122,0.3)'],
  ['rgba(255,220,200,0.6)', 'rgba(230,180,160,0.2)'],
];

function createPetal(w: number, h: number, fromTop = false): Petal {
  const ci = Math.floor(Math.random() * PETAL_COLORS.length);
  return {
    x: Math.random() * w,
    y: fromTop ? -30 - Math.random() * 120 : Math.random() * h,
    size: Math.random() * 11 + 4,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.016,
    vy: Math.random() * 0.55 + 0.18,
    vx: (Math.random() - 0.5) * 0.25,
    opacity: Math.random() * 0.52 + 0.12,
    phase: Math.random() * Math.PI * 2,
    wobbleSpeed: Math.random() * 1.8 + 0.6,
    amplitude: Math.random() * 1.8 + 0.6,
    type: Math.floor(Math.random() * 3) as PetalType,
    color1: PETAL_COLORS[ci][0],
    color2: PETAL_COLORS[ci][1],
    scaleX: Math.random() * 0.45 + 0.38,
  };
}

function drawPetal(ctx: CanvasRenderingContext2D, p: Petal, t: number) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation + Math.sin(t * 0.001 * p.wobbleSpeed + p.phase) * 0.13);
  ctx.scale(p.scaleX, 1);
  ctx.globalAlpha = p.opacity;
  ctx.beginPath();

  if (p.type === 0) {
    // Rose petal – wide, rounded
    ctx.moveTo(0, -p.size);
    ctx.bezierCurveTo(p.size * 0.92, -p.size * 0.52, p.size * 0.92, p.size * 0.42, 0, p.size * 0.82);
    ctx.bezierCurveTo(-p.size * 0.92, p.size * 0.42, -p.size * 0.92, -p.size * 0.52, 0, -p.size);
  } else if (p.type === 1) {
    // Narrow elongated petal
    ctx.moveTo(0, -p.size);
    ctx.bezierCurveTo(p.size * 0.38, -p.size * 0.32, p.size * 0.38, p.size * 0.32, 0, p.size);
    ctx.bezierCurveTo(-p.size * 0.38, p.size * 0.32, -p.size * 0.38, -p.size * 0.32, 0, -p.size);
  } else {
    // Oval / teardrop petal
    ctx.moveTo(0, -p.size);
    ctx.bezierCurveTo(p.size * 0.65, -p.size * 0.6, p.size * 0.65, p.size * 0.6, 0, p.size);
    ctx.bezierCurveTo(-p.size * 0.65, p.size * 0.6, -p.size * 0.65, -p.size * 0.6, 0, -p.size);
  }

  const g = ctx.createLinearGradient(0, -p.size, 0, p.size);
  g.addColorStop(0, p.color1);
  g.addColorStop(1, p.color2);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.restore();
}

interface PetalCanvasProps {
  className?: string;
  count?: number;
}

export function PetalCanvas({ className = '', count = 72 }: PetalCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;
    let w = 0, h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    resize();
    window.addEventListener('resize', resize);

    const petals: Petal[] = Array.from({ length: count }, () => createPetal(w, h));

    const animate = () => {
      t++;
      ctx.clearRect(0, 0, w, h);
      petals.forEach((p, i) => {
        p.x += p.vx + Math.sin(t * 0.005 + p.phase) * p.amplitude * 0.045;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        if (p.x < -40) p.x = w + 40;
        if (p.x > w + 40) p.x = -40;
        if (p.y > h + 40) petals[i] = createPetal(w, h, true);
        drawPetal(ctx, p, t);
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ willChange: 'transform' }}
    />
  );
}