import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { BedDouble, CreditCard, ShieldCheck, Sparkles, TrendingUp, Utensils } from "lucide-react";
import { useEffect, useState } from "react";

import { BrandMark } from "./BrandMark";

const BARS = [28, 42, 22, 55, 70, 46, 82, 64, 38, 74, 92, 68];

const FEED = [
  { icon: BedDouble, title: "Deluxe Room Booking", order: "#393", amount: 8500 },
  { icon: Utensils, title: "Table 4 · Chicken Momo", order: "#392", amount: 1200 },
  { icon: CreditCard, title: "Online Payment · eSewa", order: "#391", amount: 3450 },
  { icon: Utensils, title: "Table 9 · Thakali Set", order: "#390", amount: 2100 },
  { icon: BedDouble, title: "Suite Upgrade", order: "#389", amount: 12000 },
];

function CountUp({ to, delay = 0 }: { to: number; delay?: number }) {
  const v = useMotionValue(0);
  const text = useTransform(v, (n) => Math.round(n).toLocaleString("en-IN"));
  useEffect(() => {
    const c = animate(v, to, { duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] });
    return () => c.stop();
  }, [to, delay, v]);
  return <motion.span>{text}</motion.span>;
}

export function DashboardMockup() {
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setOffset((o) => (o + 1) % FEED.length), 3800);
    return () => clearInterval(t);
  }, [reduce]);

  const items = [0, 1, 2].map((i) => FEED[(offset + i) % FEED.length]!);
  const ago = ["Just now", "2m ago", "6m ago"];

  return (
    <div className="relative w-full max-w-[560px]" aria-hidden="true">
      {/* Floating chips */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        className="absolute -left-12 -top-7 z-20"
      >
        <div className="animate-float glass-card flex items-center gap-3 rounded-2xl px-4 py-3">
          <span className="grid size-9 place-items-center rounded-xl bg-success/15 text-success">
            <TrendingUp className="size-4" />
          </span>
          <div>
            <p className="text-[11px] text-muted-foreground">Payment received</p>
            <p className="text-sm font-bold tabular-nums">+NPR 8,500</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 0.7 }}
        className="absolute -bottom-6 -right-6 z-20"
      >
        <div
          className="animate-float glass-card flex items-center gap-2.5 rounded-full py-2 pl-2 pr-4"
          style={{ animationDelay: "-3s" }}
        >
          <span className="grid size-7 place-items-center rounded-full bg-gradient-brand text-primary-foreground">
            <ShieldCheck className="size-3.5" />
          </span>
          <span className="text-xs font-semibold">256-bit encrypted</span>
        </div>
      </motion.div>

      <div className="glass-card border-gradient rounded-[28px] p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-5">
          <div className="flex items-center gap-3">
            <BrandMark className="size-9 text-base" />
            <div>
              <p className="font-display font-bold leading-tight">Dashboard</p>
              <p className="text-[11px] text-subtle">Himalayan Boutique Hotel</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full glass-panel px-3 py-1.5">
            <span className="relative flex size-2">
              <span className="animate-ping-slow absolute inset-0 rounded-full bg-success" />
              <span className="relative size-2 rounded-full bg-success" />
            </span>
            <span className="text-[11px] font-semibold text-muted-foreground">Live</span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="glass-panel relative overflow-hidden rounded-2xl p-5">
            <div className="absolute -right-8 -top-8 size-24 rounded-full bg-brand-to/10 blur-2xl" />
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">Revenue today</p>
              <TrendingUp className="size-4 text-brand-to" />
            </div>
            <p className="mt-3 flex items-baseline gap-1.5">
              <span className="text-xs font-semibold text-subtle">NPR</span>
              <span className="text-[28px] font-extrabold tracking-tight tabular-nums">
                <CountUp to={42500} delay={0.6} />
              </span>
            </p>
            <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-success/12 px-2.5 py-1 text-[11px] font-semibold text-success">
              ↗ +12.5% vs yesterday
            </span>
          </div>
          <div className="glass-panel rounded-2xl p-5">
            <p className="text-xs font-medium text-muted-foreground">Website visitors</p>
            <p className="mt-3 text-[28px] font-extrabold tracking-tight tabular-nums">
              <CountUp to={1284} delay={0.8} />
            </p>
            <div className="mt-3 flex h-12 items-end gap-1">
              {BARS.map((h, i) => (
                <motion.span
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.8 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 rounded-t-[3px] bg-linear-to-t from-brand-from/40 to-brand-to"
                />
              ))}
            </div>
          </div>
        </div>

        {/* AI insight */}
        <div className="relative mt-4 overflow-hidden rounded-2xl border border-brand-to/20 bg-linear-to-r from-brand-from/12 via-brand-to/6 to-transparent p-4">
          <span className="animate-shimmer absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-foreground/6 to-transparent" />
          <div className="relative flex items-center gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-brand text-primary-foreground shadow-glow">
              <Sparkles className="size-5" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-to">AI analyst insight</p>
              <p className="text-sm font-semibold">Weekend sales up 18% — restock momo inventory by Friday.</p>
            </div>
          </div>
        </div>

        {/* Live activity */}
        <div className="mt-5">
          <p className="mb-3 text-xs font-semibold text-muted-foreground">Live activity</p>
          <div className="relative space-y-2.5">
            <AnimatePresence initial={false} mode="popLayout">
              {items.map((item, i) => (
                <motion.div
                  layout
                  key={item.order}
                  initial={{ opacity: 0, y: -16, scale: 0.97 }}
                  animate={{ opacity: i === 2 ? 0.55 : 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-panel flex items-center gap-3 rounded-xl px-4 py-3"
                >
                  <span className="grid size-9 place-items-center rounded-lg bg-glass-strong text-muted-foreground">
                    <item.icon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{item.title}</p>
                    <p className="text-[11px] text-subtle">
                      Order {item.order} · {ago[i]}
                    </p>
                  </div>
                  <p className="text-sm font-bold tabular-nums">
                    NPR {item.amount.toLocaleString("en-IN")}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
