import { toast } from "sonner";

export function AuthFooter() {
  return (
    <div className="space-y-6 text-center">
      <p className="text-sm text-muted-foreground">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => toast("Sign up is coming soon")}
          className="rounded-sm font-semibold text-foreground underline-offset-4 transition-colors hover:text-brand-to hover:underline focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
        >
          Create one
        </button>
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-subtle">
        <span>© 2026 Platerea</span>
        <span aria-hidden="true">·</span>
        <span>Terms</span>
        <span aria-hidden="true">·</span>
        <span>Privacy</span>
        <span className="rounded-full glass-panel px-2 py-0.5 font-mono text-[10px]">v2.4.0</span>
      </div>
    </div>
  );
}
