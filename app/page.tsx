import { Hero } from "@/components/home/hero";
import { StatsSection } from "@/components/home/stats-section";
import { ServicesSection } from "@/components/home/services-section";
import { AboutSection } from "@/components/home/about-section";
import { FeaturedProjectsSection } from "@/components/home/featured-projects-section";
import { NewsSection } from "@/components/home/news-section";
import { CtaSection } from "@/components/home/cta-section";
import { SectionDivider } from "@/components/shared/section-divider";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <SectionDivider bgClassName="bg-primary" fillClassName="fill-white" variant="diagonal" />
      <ServicesSection />
      <SectionDivider bgClassName="bg-white" fillClassName="fill-secondary" variant="curve" />
      <AboutSection />
      <SectionDivider
        bgClassName="bg-secondary"
        fillClassName="fill-white"
        variant="diagonal"
        flip
      />
      <FeaturedProjectsSection />
      <SectionDivider bgClassName="bg-white" fillClassName="fill-secondary" variant="curve" flip />
      <NewsSection />
      <SectionDivider bgClassName="bg-secondary" fillClassName="fill-accent" variant="diagonal" />
      <CtaSection />
      <SectionDivider bgClassName="bg-accent" fillClassName="fill-charcoal" variant="curve" />
    </>
  );
}
