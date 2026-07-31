import { cn } from "@/lib/utils";

/**
 * Subtle dot-grid pattern used behind text blocks (e.g. "Sobre Nosotros")
 * to add depth without competing with photography.
 */
export function DecorativePattern({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute", className)}
      width="360"
      height="360"
      viewBox="0 0 360 360"
      fill="none"
    >
      <defs>
        <pattern id="dot-grid" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.6" className="fill-accent/30" />
        </pattern>
      </defs>
      <rect width="360" height="360" fill="url(#dot-grid)" />
    </svg>
  );
}
