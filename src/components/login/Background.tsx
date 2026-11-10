import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

/** Mesh gradient blobs + parallax grid + slow particle field. */
export function Background() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 40, damping: 20 });
  const y = useSpring(my, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * -40);
      my.set((e.clientY / window.innerHeight - 0.5) * -40);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  return (
    <div aria-hidden="true" className="noise pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="animate-blob absolute -left-[15%] -top-[20%] h-[60vmax] w-[60vmax] rounded-full bg-brand-from opacity-[0.16] blur-[120px]" />
      <div
        className="animate-blob absolute -right-[10%] top-[10%] h-[50vmax] w-[50vmax] rounded-full bg-brand-to opacity-[0.12] blur-[120px]"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="animate-blob absolute -bottom-[25%] left-[30%] h-[45vmax] w-[45vmax] rounded-full bg-brand-from opacity-[0.1] blur-[120px]"
        style={{ animationDelay: "-13s" }}
      />
      <motion.div style={{ x, y }} className="grid-pattern absolute -inset-10" />
      {!reduce && <Particles />}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-background to-transparent" />
    </div>
  );
}

function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const color = getComputedStyle(document.documentElement).getPropertyValue("--brand-to").trim();
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: 36 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18 * dpr,
      vy: (Math.random() - 0.5) * 0.18 * dpr,
      r: (Math.random() * 1.4 + 0.4) * dpr,
      a: Math.random() * 0.5 + 0.15,
    }));

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x = (d.x + d.vx + w) % w;
        d.y = (d.y + d.vy + h) % h;
        ctx.globalAlpha = d.a;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}
