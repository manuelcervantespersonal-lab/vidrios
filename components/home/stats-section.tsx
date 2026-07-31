import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { companyStats } from "@/data/site";

export function StatsSection() {
  return (
    <section className="bg-primary section-py">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {companyStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1} className="text-center md:text-left">
              <div className="font-heading text-5xl font-semibold text-white md:text-6xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-3 font-heading text-sm uppercase tracking-wide text-white/60">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
