import { motion, useAnimationControls, type Variants } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { cleanPastedEmail } from "@/lib/auth-schemas";
import { FloatingField } from "./FloatingField";
import { PrimaryButton } from "./PrimaryButton";
import { SocialButtons } from "./SocialButtons";
import type { UseLoginReturn } from "./useLogin";

export const itemVariants: Variants = {
  initial: { opacity: 0, y: 16, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const listVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  exit: { opacity: 0, y: -8, filter: "blur(6px)", transition: { duration: 0.2 } },
};

export function useShake(trigger: number) {
  const controls = useAnimationControls();
  useEffect(() => {
    if (trigger > 0) void controls.start({ x: [0, -10, 10, -7, 7, -3, 0], transition: { duration: 0.45 } });
  }, [trigger, controls]);
  return controls;
}

export function LoginForm({ auth }: { auth: UseLoginReturn }) {
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const shake = useShake(auth.shakeKey);

  // Focus the first empty field once the remembered email (if any) has loaded.
  useEffect(() => {
    const t = setTimeout(() => {
      if (!emailRef.current?.value) emailRef.current?.focus();
      else passwordRef.current?.focus();
    }, 350);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.form
      key="login"
      variants={listVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onSubmit={auth.handleLogin}
      noValidate
      className="space-y-5"
    >
      <fieldset disabled={auth.isLoading} className="space-y-5">
        <legend className="sr-only">Sign in to Platerea</legend>
        <motion.div variants={itemVariants}>
          <motion.div animate={shake} className="space-y-4">
            <FloatingField
              ref={emailRef}
              id="email"
              type="email"
              label="Email address"
              autoComplete="email"
              inputMode="email"
              value={auth.email}
              error={auth.errors.email}
              onChange={(e) => {
                auth.setEmail(e.target.value);
                auth.clearFieldError("email");
              }}
              onPaste={(e) => {
                e.preventDefault();
                auth.setEmail(cleanPastedEmail(e.clipboardData.getData("text")));
                auth.clearFieldError("email");
              }}
            />
            <FloatingField
              ref={passwordRef}
              id="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              autoComplete="current-password"
              value={auth.password}
              error={auth.errors.password}
              onChange={(e) => {
                auth.setPassword(e.target.value);
                auth.clearFieldError("password");
              }}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="grid size-9 place-items-center rounded-lg text-subtle transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              }
            />
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <label className="flex cursor-pointer select-none items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <Checkbox
              checked={auth.rememberMe}
              onCheckedChange={(v) => auth.setRememberMe(v === true)}
              className="size-[18px] rounded-[5px] border-foreground/25 bg-glass data-[state=checked]:border-transparent data-[state=checked]:bg-gradient-brand"
            />
            Remember me
          </label>
          <button
            type="button"
            onClick={() => auth.setView("forgot")}
            className="group relative text-sm font-semibold text-brand-to transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring rounded-sm active:scale-[0.98]"
          >
            Forgot password?
            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
          </button>
        </motion.div>

        <motion.div variants={itemVariants}>
          <PrimaryButton loading={auth.isLoading}>{auth.isLoading ? "Signing in" : "Sign in"}</PrimaryButton>
        </motion.div>
      </fieldset>

      <motion.div variants={itemVariants} className="flex items-center gap-4" aria-hidden="true">
        <span className="h-px flex-1 bg-linear-to-r from-transparent to-border" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-subtle">or</span>
        <span className="h-px flex-1 bg-linear-to-l from-transparent to-border" />
      </motion.div>

      <motion.div variants={itemVariants}>
        <SocialButtons onGoogle={auth.handleGoogleLogin} disabled={auth.isLoading} />
      </motion.div>
    </motion.form>
  );
}
