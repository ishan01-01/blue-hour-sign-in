import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { LifeBuoy } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { AuthFooter } from "@/components/login/AuthFooter";
import { Background } from "@/components/login/Background";
import { BrandHeader } from "@/components/login/BrandHeader";
import { BrandMark } from "@/components/login/BrandMark";
import { DashboardMockup } from "@/components/login/DashboardMockup";
import { ForgotForm } from "@/components/login/ForgotForm";
import { LoadingOverlay } from "@/components/login/LoadingOverlay";
import { itemVariants, LoginForm } from "@/components/login/LoginForm";
import { SuccessView } from "@/components/login/SuccessView";
import { useLogin } from "@/components/login/useLogin";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Platerea" },
      {
        name: "description",
        content: "Sign in to Platerea to manage your dashboard, AI tools, website builder, analytics and payments.",
      },
      { property: "og:title", content: "Sign in — Platerea" },
      {
        property: "og:description",
        content: "Your all-in-one business workspace: bookings, orders, payments and AI insights.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

const page = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

function LoginPage() {
  const auth = useLogin();
  const cardRef = useRef<HTMLDivElement>(null);

  // ⌘/Ctrl + Enter submits the visible form; Escape dismisses toasts.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") toast.dismiss();
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        cardRef.current?.querySelector("form")?.requestSubmit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Background />
      <LoadingOverlay open={auth.isExpanding} statusIndex={auth.statusIndex} />

      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <main className="flex flex-col px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] sm:px-10 lg:px-16">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BrandMark />
              <span className="font-display text-xl font-bold tracking-tight">Platerea</span>
            </div>
            <button
              type="button"
              onClick={() => toast("Support", { description: "Email help@platerea.com — we reply within an hour." })}
              className="inline-flex items-center gap-1.5 rounded-full glass-panel px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            >
              <LifeBuoy className="size-3.5" aria-hidden="true" /> Need help?
            </button>
          </header>

          <motion.div
            variants={page}
            initial="initial"
            animate="animate"
            className="mx-auto flex w-full max-w-[480px] flex-1 flex-col justify-center gap-8 py-12"
          >
            <BrandHeader view={auth.view} />

            <motion.div
              ref={cardRef}
              variants={itemVariants}
              layout
              className="glass-card border-gradient rounded-2xl p-6 sm:p-8"
            >
              <AnimatePresence mode="wait" initial={false}>
                {auth.view === "login" && <LoginForm key="login" auth={auth} />}
                {auth.view === "forgot" && <ForgotForm key="forgot" auth={auth} />}
                {auth.view === "success" && <SuccessView key="success" auth={auth} />}
              </AnimatePresence>
              {auth.view !== "success" && (
                <p className="mt-6 hidden items-center justify-center gap-1.5 text-[11px] text-subtle sm:flex">
                  Press
                  <kbd className="rounded-md glass-panel px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                    ⌘ / Ctrl
                  </kbd>
                  <kbd className="rounded-md glass-panel px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                    ↵
                  </kbd>
                  to submit
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <AuthFooter />
            </motion.div>
          </motion.div>
        </main>

        <aside className="relative hidden items-center justify-center overflow-hidden border-l border-border px-16 py-12 lg:flex">
          <div className="absolute inset-0 bg-linear-to-br from-glass to-transparent" aria-hidden="true" />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex w-full flex-col items-center gap-10"
          >
            <DashboardMockup />
            <div className="max-w-md text-center">
              <p className="font-display text-lg font-bold">Bookings, orders and payments — one place.</p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Trusted by 2,000+ hotels, restaurants and shops across Nepal.
              </p>
            </div>
          </motion.div>
        </aside>
      </div>
    </div>
  );
}
