import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5"
      aria-label={`${siteConfig.name} - Ir al inicio`}
    >
      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center bg-accent">
        <span className="absolute inset-[3px] border border-white/70" />
      </span>
      <span
        className={cn(
          "font-heading text-xl font-semibold uppercase tracking-widest",
          variant === "dark" ? "text-primary" : "text-white"
        )}
      >
        {siteConfig.name}
      </span>
    </Link>
  );
}
