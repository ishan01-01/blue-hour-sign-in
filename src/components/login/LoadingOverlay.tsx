import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

import { BrandMark } from "./BrandMark";
import { STATUS_MESSAGES } from "./useLogin";

interface LoadingOverlayProps {
  open: boolean;
  statusIndex: number;
}

/** Full-screen radial reveal that masks sign-in latency with rotating status. */
export function LoadingOverlay({ open, statusIndex }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ clipPath: "circle(0% at 50% 55%)" }}
          animate={{ clipPath: "circle(150% at 50% 55%)" }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 grid place-items-center bg-background"
        >
          <div className="grid-pattern absolute inset-0" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="animate-blob absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-to opacity-15 blur-[120px]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative flex w-full max-w-xs flex-col items-center gap-8 px-6"
          >
            <div className="relative grid size-24 place-items-center">
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-transparent border-r-brand-from border-t-brand-to"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
              />
              <span className="absolute inset-2 rounded-full border border-glass-border" />
              <BrandMark className="size-12 text-xl" />
            </div>

            <div className="h-6 text-center" role="status" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.p
                  key={statusIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="font-mono text-sm text-foreground"
                >
                  {STATUS_MESSAGES[statusIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <ol className="w-full space-y-2.5">
              {STATUS_MESSAGES.map((msg, i) => {
                const done = i < statusIndex;
                const active = i === statusIndex;
                return (
                  <li
                    key={msg}
                    className={`flex items-center gap-3 text-xs transition-colors duration-300 ${
                      done ? "text-muted-foreground" : active ? "text-foreground" : "text-subtle/60"
                    }`}
                  >
                    <span
                      className={`grid size-4 place-items-center rounded-full border transition-all duration-300 ${
                        done
                          ? "border-transparent bg-gradient-brand text-primary-foreground"
                          : active
                            ? "border-brand-to"
                            : "border-glass-border"
                      }`}
                    >
                      {done && <Check className="size-2.5" strokeWidth={4} />}
                      {active && <span className="size-1.5 animate-pulse rounded-full bg-brand-to" />}
                    </span>
                    {msg.replace("…", "")}
                  </li>
                );
              })}
            </ol>

            <div className="h-1 w-full overflow-hidden rounded-full bg-glass-strong">
              <motion.div
                className="h-full rounded-full bg-gradient-brand"
                initial={{ width: "4%" }}
                animate={{ width: `${((statusIndex + 1) / STATUS_MESSAGES.length) * 100}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
