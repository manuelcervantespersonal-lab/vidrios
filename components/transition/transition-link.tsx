"use client";

import { forwardRef, type MouseEvent, type AnchorHTMLAttributes } from "react";
import NextLink, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import { usePageTransition } from "@/components/transition/page-transition-context";

type TransitionLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    children?: React.ReactNode;
  };

/**
 * Drop-in replacement for next/link that plays the fragment cover/reveal
 * transition on internal navigations. Falls back to native <Link> behavior
 * for modified clicks (ctrl/cmd/shift/middle-click) and target="_blank" so
 * "open in new tab" etc. keep working normally.
 */
export const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  ({ href, onClick, target, ...props }, ref) => {
    const pathname = usePathname();
    const { startTransition } = usePageTransition();

    function handleClick(event: MouseEvent<HTMLAnchorElement>) {
      onClick?.(event);
      if (event.defaultPrevented) return;

      const isModifiedClick =
        event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
      if (isModifiedClick || target === "_blank") return;

      const targetHref = typeof href === "string" ? href : (href.pathname ?? "");
      if (!targetHref.startsWith("/")) return; // let external/anchor/mailto links behave natively

      const [targetPath] = targetHref.split("#");
      if (targetPath === pathname) return; // same page (maybe a same-page #anchor) — no transition

      event.preventDefault();
      startTransition(targetHref);
    }

    return (
      <NextLink ref={ref} href={href} target={target} onClick={handleClick} {...props} />
    );
  }
);
TransitionLink.displayName = "TransitionLink";
