import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";

import {
  collectErrors,
  forgotSchema,
  loginSchema,
  type FieldErrors,
  type LoginInput,
} from "@/lib/auth-schemas";

export type AuthView = "login" | "forgot" | "success";

export const STATUS_MESSAGES = [
  "Securing database tunnel…",
  "Verifying credentials…",
  "Loading your workspace…",
  "Almost there…",
];

const REMEMBER_KEY = "platerea:remembered-email";
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * All login-page behaviour in one place. Auth calls are simulated until a real
 * backend is connected — swap `fakeAuth` for the real request.
 */
export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [view, setView] = useState<AuthView>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const [errors, setErrors] = useState<FieldErrors<LoginInput>>({});
  const [shakeKey, setShakeKey] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Remembered email is browser-only: read it after hydration.
  useEffect(() => {
    const saved = window.localStorage.getItem(REMEMBER_KEY);
    if (saved) {
      setEmail(saved);
      setRememberMe(true);
    }
  }, []);

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  const fail = useCallback((next: FieldErrors<LoginInput>) => {
    setErrors(next);
    setShakeKey((k) => k + 1);
  }, []);

  const clearFieldError = useCallback((field: keyof LoginInput) => {
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
  }, []);

  const ensureOnline = () => {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      toast.error("You're offline", { description: "Check your connection and try again." });
      return false;
    }
    return true;
  };

  const handleLogin = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (isLoading) return;
      const parsed = loginSchema.safeParse({ email, password, rememberMe });
      if (!parsed.success) return fail(collectErrors(parsed));
      if (!ensureOnline()) return;

      setErrors({});
      setIsLoading(true);
      setIsExpanding(true);
      setStatusIndex(0);
      timer.current = setInterval(
        () => setStatusIndex((i) => Math.min(i + 1, STATUS_MESSAGES.length - 1)),
        750,
      );

      await wait(3000);

      if (timer.current) clearInterval(timer.current);
      if (rememberMe) window.localStorage.setItem(REMEMBER_KEY, parsed.data.email);
      else window.localStorage.removeItem(REMEMBER_KEY);

      setIsExpanding(false);
      setIsLoading(false);
      setPassword("");
      setView("success");
    },
    [email, password, rememberMe, isLoading, fail],
  );

  const handleForgotPassword = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (isLoading) return;
      const parsed = forgotSchema.safeParse({ email });
      if (!parsed.success) return fail(collectErrors(parsed));
      if (!ensureOnline()) return;
      setErrors({});
      setIsLoading(true);
      await wait(1200);
      setIsLoading(false);
      toast.success("Reset link sent", {
        description: `If ${parsed.data.email} has an account, a reset link is on its way.`,
      });
      setView("login");
    },
    [email, isLoading, fail],
  );

  const handleGoogleLogin = useCallback(() => {
    toast("Google sign-in isn't connected yet", {
      description: "It will work once accounts are set up for Platerea.",
    });
  }, []);

  const switchView = useCallback((v: AuthView) => {
    setErrors({});
    setView(v);
  }, []);

  return {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    view,
    setView: switchView,
    isLoading,
    isExpanding,
    statusMessage: STATUS_MESSAGES[statusIndex],
    statusIndex,
    errors,
    shakeKey,
    clearFieldError,
    handleLogin,
    handleForgotPassword,
    handleGoogleLogin,
  };
}

export type UseLoginReturn = ReturnType<typeof useLogin>;
