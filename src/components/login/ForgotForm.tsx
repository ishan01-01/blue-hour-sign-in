import { motion } from "framer-motion";
import { ArrowLeft, KeyRound } from "lucide-react";

import { cleanPastedEmail } from "@/lib/auth-schemas";
import { FloatingField } from "./FloatingField";
import { itemVariants, listVariants, useShake } from "./LoginForm";
import { PrimaryButton } from "./PrimaryButton";
import type { UseLoginReturn } from "./useLogin";

export function ForgotForm({ auth }: { auth: UseLoginReturn }) {
  const shake = useShake(auth.shakeKey);
  return (
    <motion.form
      key="forgot"
      variants={listVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onSubmit={auth.handleForgotPassword}
      noValidate
      className="space-y-5"
    >
      <motion.div variants={itemVariants} className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl glass-panel text-brand-to">
          <KeyRound className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-display text-lg font-bold">Reset your password</h2>
          <p className="text-sm text-muted-foreground">
            Enter your email and we'll send you a secure reset link.
          </p>
        </div>
      </motion.div>
      <fieldset disabled={auth.isLoading} className="space-y-5">
        <legend className="sr-only">Reset password</legend>
        <motion.div variants={itemVariants} animate={shake}>
          <FloatingField
            id="reset-email"
            type="email"
            label="Email address"
            autoComplete="email"
            autoFocus
            value={auth.email}
            error={auth.errors.email}
            onChange={(e) => {
              auth.setEmail(e.target.value);
              auth.clearFieldError("email");
            }}
            onPaste={(e) => {
              e.preventDefault();
              auth.setEmail(cleanPastedEmail(e.clipboardData.getData("text")));
            }}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <PrimaryButton loading={auth.isLoading}>
            {auth.isLoading ? "Sending link" : "Send reset link"}
          </PrimaryButton>
        </motion.div>
      </fieldset>
      <motion.div variants={itemVariants} className="text-center">
        <button
          type="button"
          onClick={() => auth.setView("login")}
          className="inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> Back to sign in
        </button>
      </motion.div>
    </motion.form>
  );
}
