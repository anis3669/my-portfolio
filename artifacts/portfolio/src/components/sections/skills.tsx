import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import {
  SiPhp, SiLaravel, SiVuedotjs, SiTailwindcss, SiAlpinedotjs,
  SiJavascript, SiTypescript, SiMysql, SiPostgresql, SiGit,
  SiDocker, SiLinux, SiHtml5, SiCss, SiComposer
} from "react-icons/si";
import { Zap } from "lucide-react"; // Fix #5: neutral icon for Livewire (no official react-icon exists)

// Fix #6: added Filament (the #1 specialty) to Backend; Livewire now uses a distinct icon
const skillCategories = [
  {
    title: "Backend",
    skills: [
      { name: "PHP", icon: SiPhp, level: 85 },
      { name: "Laravel", icon: SiLaravel, level: 88 },
      { name: "Livewire", icon: null, level: 80 },   // uses custom SVG below
      { name: "Filament", icon: null, level: 82 },   // uses custom SVG below
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "Vue.js", icon: SiVuedotjs, level: 78 },
      { name: "Alpine.js", icon: SiAlpinedotjs, level: 75 },
      { name: "JavaScript", icon: SiJavascript, level: 80 },
      { name: "TypeScript", icon: SiTypescript, level: 65 },
      { name: "Tailwind CSS", icon: SiTailwindcss, level: 90 },
      { name: "HTML", icon: SiHtml5, level: 92 },
      { name: "CSS", icon: SiCss, level: 88 },
    ],
  },
  {
    title: "Database & DevOps",
    skills: [
      { name: "MySQL", icon: SiMysql, level: 80 },
      { name: "PostgreSQL", icon: SiPostgresql, level: 70 },
      { name: "Git", icon: SiGit, level: 85 },
      { name: "Docker", icon: SiDocker, level: 60 },
      { name: "Linux", icon: SiLinux, level: 72 },
      { name: "Composer", icon: SiComposer, level: 82 },
    ],
  },
];

/** Inline SVG for Livewire — distinctive pink lightning bolt from their brand */
function LivewireIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
    </svg>
  );
}

/** Inline SVG for Filament — simplified "F" panel icon */
function FilamentIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7 8h10M7 12h6M7 16h4" />
    </svg>
  );
}

// Fix #18: removed "as any" cast — Framer Motion accepts string ease values natively
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.05 },
  }),
};

function SkillIcon({ skill, size = 28 }: { skill: { name: string; icon: any | null }; size?: number }) {
  if (skill.name === "Livewire") return <LivewireIcon size={size} />;
  if (skill.name === "Filament") return <FilamentIcon size={size} />;
  if (skill.icon) {
    const Icon = skill.icon;
    return <Icon size={size} />;
  }
  return <Zap size={size} />;
}

export function SkillsSection() {
  const { ref, inView } = useInView({ threshold: 0.15 });

  return (
    <section id="skills" ref={ref} className="py-32 relative">
      {/* Subtle divider gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">02. Skills</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight" data-testid="skills-heading">
            My Tech Stack
          </h2>
        </motion.div>

        <div className="space-y-16">
          {skillCategories.map((category, catIdx) => (
            <div key={category.title}>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-8 flex items-center gap-3"
              >
                <span className="w-8 h-px bg-primary inline-block" />
                {category.title}
              </motion.h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    custom={i + catIdx * 4}
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="group p-5 rounded-2xl border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-default"
                    data-testid={`skill-${skill.name.toLowerCase().replace(/[\s.]/g, '-')}`}
                  >
                    <div className="text-muted-foreground group-hover:text-primary transition-colors duration-300 mb-3">
                      <SkillIcon skill={skill} size={28} />
                    </div>
                    <div className="text-sm font-medium text-foreground mb-3">{skill.name}</div>
                    {/* Skill bar */}
                    <div className="h-1 rounded-full bg-border overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 + i * 0.04 }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-blue-400"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
