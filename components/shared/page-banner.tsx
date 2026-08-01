import Image from "next/image";

import { SplitHeading } from "@/components/motion/split-heading";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  image: string;
  compact?: boolean;
}

export function PageBanner({ title, subtitle, image, compact }: PageBannerProps) {
  return (
    <section
      className={`relative flex items-end overflow-hidden bg-charcoal ${
        compact ? "h-[45vh] min-h-[320px]" : "h-[60vh] min-h-[420px]"
      }`}
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover opacity-60"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/20" />
      <div className="container-px relative mx-auto w-full max-w-7xl pb-12 md:pb-16">
        <SplitHeading as="h1" scrollTrigger={false} className="text-display max-w-4xl text-white">
          {title.toUpperCase()}
        </SplitHeading>
        {subtitle && (
          <p className="mt-5 max-w-xl font-body text-base normal-case tracking-normal text-white/60 md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
