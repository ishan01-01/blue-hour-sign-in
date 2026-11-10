import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid size-10 place-items-center overflow-hidden rounded-xl bg-gradient-brand font-display text-lg font-extrabold text-primary-foreground shadow-glow",
        className,
      )}
    >
      <span className="absolute inset-0 bg-linear-to-b from-foreground/25 to-transparent" />
      <span className="relative">P</span>
    </span>
  );
}
