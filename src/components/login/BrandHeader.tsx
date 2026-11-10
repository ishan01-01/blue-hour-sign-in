import { motion } from "framer-motion";

import { itemVariants } from "./LoginForm";
import type { AuthView } from "./useLogin";

const COPY: Record<AuthView, { title: string; sub: string }> = {
  login: { title: "Welcome back", sub: "Sign in to your dashboard, AI tools, website builder and payments." },
  forgot: { title: "Forgot it? No stress", sub: "We'll get you back into your workspace in a minute." },
  success: { title: "Welcome back", sub: "Your workspace is ready." },
};

export function BrandHeader({ view }: { view: AuthView }) {
  return (
    <motion.div variants={itemVariants} className="space-y-4">
      <span className="inline-flex items-center gap-2 rounded-full glass-panel px-3 py-1 text-xs font-medium text-muted-foreground">
        <span className="size-1.5 rounded-full bg-brand-to shadow-[0_0_10px_var(--brand-to)]" />
        All-in-one business OS for Nepal
      </span>
      <h1 className="font-display text-[clamp(2.1rem,4vw,3.4rem)] font-extrabold leading-[1.02] tracking-tight">
        Launch faster with <span className="text-gradient-brand">Platerea</span>
      </h1>
      <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">{COPY[view].sub}</p>
    </motion.div>
  );
}
