import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import type { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  loading?: boolean;
  type?: "submit" | "button";
  onClick?: () => void;
}

export function PrimaryButton({ children, loading, type = "submit", onClick }: PrimaryButtonProps) {
  const reduce = useReducedMotion();
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={loading}
      aria-busy={loading}
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="group relative flex h-[3.25rem] w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-brand text-[15px] font-bold text-primary-foreground shadow-glow outline-hidden transition-shadow duration-300 hover:shadow-[0_24px_50px_-12px_color-mix(in_oklab,var(--brand-to)_60%,transparent)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-wait disabled:opacity-80"
    >
      <span className="absolute inset-0 bg-linear-to-b from-foreground/20 to-transparent opacity-60" />
      <span className="animate-shimmer absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-foreground/35 to-transparent" />
      <span className="relative z-10 flex items-center gap-2">
        {loading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
        {children}
        {!loading && (
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        )}
      </span>
    </motion.button>
  );
}
