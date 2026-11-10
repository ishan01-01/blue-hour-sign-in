import { motion } from "framer-motion";
import { Check, LogOut } from "lucide-react";

import { itemVariants, listVariants } from "./LoginForm";
import { PrimaryButton } from "./PrimaryButton";
import type { UseLoginReturn } from "./useLogin";

export function SuccessView({ auth }: { auth: UseLoginReturn }) {
  return (
    <motion.div
      key="success"
      variants={listVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-6 text-center"
    >
      <motion.div variants={itemVariants} className="relative mx-auto grid size-16 place-items-center">
        <span className="animate-ping-slow absolute inset-0 rounded-full bg-success/30" />
        <span className="relative grid size-16 place-items-center rounded-full bg-success text-foreground shadow-[0_0_40px_-6px_var(--success)]">
          <Check className="size-8" strokeWidth={3} aria-hidden="true" />
        </span>
      </motion.div>
      <motion.div variants={itemVariants} className="space-y-1.5">
        <h2 className="font-display text-2xl font-bold">You're in</h2>
        <p className="text-sm text-muted-foreground">
          Signed in as <span className="font-semibold text-foreground">{auth.email}</span>
        </p>
      </motion.div>
      <motion.div variants={itemVariants}>
        <PrimaryButton type="button" onClick={() => auth.setView("login")}>
          Open dashboard
        </PrimaryButton>
      </motion.div>
      <motion.div variants={itemVariants}>
        <button
          type="button"
          onClick={() => auth.setView("login")}
          className="inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          <LogOut className="size-4" aria-hidden="true" /> Sign out
        </button>
      </motion.div>
    </motion.div>
  );
}
