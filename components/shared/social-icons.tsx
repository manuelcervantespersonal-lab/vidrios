/**
 * lucide-react intentionally ships no brand/logo icons (trademark policy),
 * so these small inline glyphs cover the social links in the footer.
 */
import type { SVGProps } from "react";

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.25h4.5V23H.24V8.25zM8.4 8.25h4.31v2.02h.06c.6-1.13 2.06-2.33 4.25-2.33 4.55 0 5.39 3 5.39 6.9V23h-4.5v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.53 1.72-2.53 3.49V23H8.4V8.25z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M15.12 8.5H17V5.6c-.32-.04-1.43-.14-2.72-.14-2.69 0-4.53 1.66-4.53 4.7V13H7v3.25h2.75V23h3.28v-6.75h2.64l.42-3.25h-3.06V10.5c0-.94.26-1.58 1.79-1.58z" />
    </svg>
  );
}

export function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23 12s0-3.55-.45-5.26a2.86 2.86 0 0 0-2-2C18.88 4.3 12 4.3 12 4.3s-6.88 0-8.55.44a2.86 2.86 0 0 0-2 2C1 8.45 1 12 1 12s0 3.55.45 5.26a2.86 2.86 0 0 0 2 2C5.12 19.7 12 19.7 12 19.7s6.88 0 8.55-.44a2.86 2.86 0 0 0 2-2C23 15.55 23 12 23 12zM9.75 15.5v-7l6 3.5-6 3.5z" />
    </svg>
  );
}
