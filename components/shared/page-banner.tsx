import Image from "next/image";

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
        compact ? "h-[45vh] min-h-[320px]" : "h-[55vh] min-h-[400px]"
      }`}
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/20" />
      <div className="container-px relative mx-auto w-full max-w-7xl pb-12 md:pb-16">
        <h1 className="max-w-3xl text-4xl font-semibold text-white md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-xl font-body text-base normal-case tracking-normal text-white/80 md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
