import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { Code2, Lightbulb, Rocket, Terminal } from "lucide-react";

const stats = [
  { value: "1+", label: "Year Experience" },
  { value: "10+", label: "Projects Built" },
  { value: "15+", label: "Technologies" },
  { value: "100%", label: "Passion Driven" },
];

const traits = [
  {
    icon: Code2,
    title: "Clean Code Advocate",
    desc: "I write readable, maintainable code with SOLID principles and Laravel best practices at the core.",
  },
  {
    icon: Lightbulb,
    title: "Problem Solver",
    desc: "I enjoy breaking complex problems into elegant, minimal solutions — whether backend logic or UI flows.",
  },
  {
    icon: Rocket,
    title: "Always Learning",
    desc: "The PHP/Laravel ecosystem moves fast — I stay current with new releases, packages, and patterns.",
  },
  {
    icon: Terminal,
    title: "Admin Panel Specialist",
    desc: "I specialize in building powerful Filament admin panels that make managing content a pleasure.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.15 });

  return (
    <section id="about" ref={ref} className="py-32 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 md:px-16">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-20"
        >
          <motion.p variants={fadeUp} className="text-primary font-mono text-xs tracking-widest uppercase mb-3">
            01. About Me
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black tracking-tight" data-testid="about-heading">
            Who I Am
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Bio — 3 columns */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-3 space-y-5"
          >
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed text-base" data-testid="about-bio-1">
              I'm <span className="text-foreground font-semibold">Anis Bastola</span>, a Junior Full Stack Developer from
              Madhyapur Thimi, Nepal. I build web applications that are not just functional, but crafted with
              attention to detail, performance, and user experience.
            </motion.p>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed text-base" data-testid="about-bio-2">
              My primary expertise is in the <span className="text-foreground font-semibold">TALL stack</span> — Tailwind CSS,
              Alpine.js, Laravel, and Livewire. I also have strong experience with <span className="text-foreground font-semibold">Filament</span>,
              the powerful admin panel framework for Laravel that I use to build elegant, feature-rich management interfaces.
            </motion.p>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed text-base" data-testid="about-bio-3">
              On the frontend, I complement my backend work with <span className="text-foreground font-semibold">Vue.js</span> for more
              complex SPAs. I care deeply about clean architecture, proper validation, and writing code that future
              developers (including myself) will appreciate reading.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 mt-4 border-t border-border"
            >
              {stats.map((stat) => (
                <div key={stat.label} data-testid={`stat-${stat.label.toLowerCase().replace(/ /g, '-')}`}>
                  <div className="text-3xl font-black gradient-text leading-none mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Traits — 2 columns */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-2 space-y-3"
          >
            {traits.map((trait) => (
              <motion.div
                key={trait.title}
                variants={fadeUp}
                className="p-5 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
                data-testid={`trait-${trait.title.toLowerCase().replace(/ /g, '-')}`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors mt-0.5">
                    <trait.icon size={16} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">{trait.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{trait.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
