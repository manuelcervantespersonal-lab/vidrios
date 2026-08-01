"use client";

import { useRef } from "react";

import { HomeScene } from "@/components/three/home-scene";
import { Hero } from "@/components/home/hero";
import { StatsSection } from "@/components/home/stats-section";
import { ServicesSection } from "@/components/home/services-section";
import { AboutSection } from "@/components/home/about-section";
import { FeaturedProjectsSection } from "@/components/home/featured-projects-section";
import { NewsSection } from "@/components/home/news-section";
import { CtaSection } from "@/components/home/cta-section";
import { SectionDivider } from "@/components/shared/section-divider";

export function HomeContent() {
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);

  return (
    <>
      <HomeScene heroRef={heroRef} servicesRef={servicesRef} />

      <Hero sectionRef={heroRef} />
      <StatsSection />
      <ServicesSection sectionRef={servicesRef} />
      <SectionDivider bgClassName="bg-background" fillClassName="fill-secondary" variant="curve" />
      <AboutSection />
      <SectionDivider
        bgClassName="bg-secondary"
        fillClassName="fill-background"
        variant="diagonal"
        flip
      />
      <FeaturedProjectsSection />
      <SectionDivider
        bgClassName="bg-background"
        fillClassName="fill-secondary"
        variant="curve"
        flip
      />
      <NewsSection />
      <SectionDivider bgClassName="bg-secondary" fillClassName="fill-accent" variant="diagonal" />
      <CtaSection />
    </>
  );
}
