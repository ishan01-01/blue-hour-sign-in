import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";

interface FloatingFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  id: string;
  label: string;
  error?: string;
  trailing?: ReactNode;
}

/** Glass input with a floating label, animated focus underline and inline error. */
export const FloatingField = forwardRef<HTMLInputElement, FloatingFieldProps>(
  ({ id, label, error, trailing, className, ...props }, ref) => {
    const errorId = `${id}-error`;
    return (
      <div>
        <div className="group relative">
          <input
            ref={ref}
            id={id}
            placeholder=" "
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "peer block h-[3.5rem] w-full rounded-xl border bg-glass px-4 pb-2 pt-6 text-[15px] text-foreground outline-hidden transition-all duration-200",
              "border-glass-border hover:border-foreground/20 hover:bg-glass-strong",
              "focus:border-brand-to/70 focus:bg-glass-strong focus:ring-4 focus:ring-brand-to/15",
              error &&
                "border-destructive/70 hover:border-destructive focus:border-destructive focus:ring-destructive/15",
              trailing ? "pr-12" : undefined,
              className,
            )}
            {...props}
          />
          <label
            htmlFor={id}
            className={cn(
              "pointer-events-none absolute left-4 top-[1.1rem] origin-left text-[15px] text-subtle transition-all duration-200",
              "peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:tracking-wide peer-focus:text-brand-to",
              "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:tracking-wide",
              error && "peer-focus:text-destructive text-destructive/90",
            )}
          >
            {label}
          </label>
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-4 bottom-0 h-px origin-center scale-x-0 bg-gradient-brand transition-transform duration-300 peer-focus:scale-x-100",
              error && "hidden",
            )}
          />
          {trailing && <div className="absolute inset-y-0 right-2 flex items-center">{trailing}</div>}
        </div>
        <AnimatePresence initial={false}>
          {error && (
            <motion.p
              id={errorId}
              role="alert"
              initial={{ opacity: 0, height: 0, y: -4 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -4 }}
              className="flex items-center gap-1.5 overflow-hidden pl-1 pt-1.5 text-xs font-medium text-destructive"
            >
              <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
FloatingField.displayName = "FloatingField";
