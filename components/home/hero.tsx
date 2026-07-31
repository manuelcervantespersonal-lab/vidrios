"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen min-h-[640px] w-full items-center overflow-hidden bg-charcoal"
    >
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <Image
          src="/images/hero/hero-facade-01.jpg"
          alt="Fachada de vidrio vista desde abajo con reflejos de cielo en un edificio corporativo de gran altura"
          fill
          priority
          className="scale-110 object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 via-transparent to-transparent" />

      <motion.div
        className="container-px relative mx-auto w-full max-w-7xl"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.span
            variants={item}
            className="mb-5 inline-block border-l-2 border-accent pl-4 font-heading text-sm uppercase tracking-[0.25em] text-white/80"
          >
            Fachadas y sistemas de vidrio
          </motion.span>
          <motion.h1
            variants={item}
            className="text-5xl font-semibold leading-[1.05] text-white sm:text-6xl md:text-7xl"
          >
            Construimos la piel de los proyectos más ambiciosos
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 max-w-xl font-body text-base normal-case tracking-normal text-white/80 md:text-lg"
          >
            Diseñamos, fabricamos e instalamos ventanería, muros cortina y
            sistemas de vidrio para hoteles, aeropuertos, hospitales y casinos
            en toda Latinoamérica.
          </motion.p>
          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="group">
              <Link href="/servicios">
                Qué hacemos
                <ChevronDown className="h-4 w-4 -rotate-90 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white">
              <Link href="/proyectos">Ver proyectos</Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" aria-hidden="true" />
      </motion.div>
    </section>
  );
}
