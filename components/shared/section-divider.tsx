import { cn } from "@/lib/utils";

interface SectionDividerProps {
  /** Tailwind bg-* class matching the section ABOVE the divider. */
  bgClassName: string;
  /** Tailwind fill-* class matching the section BELOW the divider. */
  fillClassName: string;
  variant?: "diagonal" | "curve";
  flip?: boolean;
}

/**
 * A decorative seam between two stacked sections: a thin strip in the
 * color of the section above, with an SVG diagonal/curve shape in the
 * color of the section below cutting into it — avoids a hard, straight seam.
 */
export function SectionDivider({
  bgClassName,
  fillClassName,
  variant = "diagonal",
  flip = false,
}: SectionDividerProps) {
  const path =
    variant === "diagonal"
      ? "M0 48L1440 0V48H0Z"
      : "M0 24C240 48 480 0 720 8C960 16 1200 44 1440 24V48H0Z";

  return (
    <div
      aria-hidden="true"
      className={cn("relative h-8 w-full overflow-hidden md:h-12", bgClassName)}
    >
      <svg
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        className={cn("h-full w-full", flip && "-scale-y-100")}
      >
        <path d={path} className={fillClassName} />
      </svg>
    </div>
  );
}
