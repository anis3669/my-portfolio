import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { GraduationCap, Briefcase } from "lucide-react";

const timeline = [
  {
    type: "education",
    role: "Bachelor's in Computer Application",
    organization: "Tribhuvan University",
    location: "Kathmandu, Nepal",
    start: "2022",
    end: "Present",
    description:
      "Pursuing a Bachelor's degree in Computer Application, covering data structures, algorithms, web technologies, database systems, and software engineering fundamentals.",
    tags: ["Algorithms", "Data Structures", "Web Tech", "DBMS"],
  },
  {
    type: "work",
    role: "Freelance Full Stack Developer",
    organization: "Self-Employed",
    location: "Remote",
    start: "2023",
    end: "Present",
    description:
      "Designed and developed custom web applications for small businesses and individuals using Laravel, Livewire, Vue.js, and Tailwind CSS. Delivered complete solutions including admin panels, e-commerce sites, and management systems.",
    tags: ["Laravel", "Vue.js", "Livewire", "Tailwind CSS"],
  },
  {
    type: "education",
    role: "+2 Science (HSEB)",
    organization: "Higher Secondary Education Board",
    location: "Bhaktapur, Nepal",
    start: "2020",
    end: "2022",
    description:
      "Completed higher secondary education with a focus on science and mathematics, building a strong analytical foundation for software development.",
    tags: ["Science", "Mathematics"],
  },
];

export function ExperienceSection() {
  const { ref, inView } = useInView({ threshold: 0.15 });

  return (
    <section id="experience" ref={ref} className="py-32 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">04. Experience</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight" data-testid="experience-heading">
            My Journey
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-border to-transparent hidden md:block" />

          <div className="space-y-10">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative flex gap-10 md:pl-16"
                data-testid={`experience-item-${i}`}
              >
                {/* Icon dot */}
                <div className="hidden md:flex absolute left-0 top-1 w-12 h-12 rounded-full border-2 border-primary/30 bg-card items-center justify-center flex-shrink-0">
                  {item.type === "work" ? (
                    <Briefcase size={18} className="text-primary" />
                  ) : (
                    <GraduationCap size={18} className="text-primary" />
                  )}
                </div>

                {/* Card */}
                <div className="flex-1 p-6 md:p-8 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <span className="text-xs font-mono text-primary uppercase tracking-widest">
                        {item.type === "work" ? "Work" : "Education"}
                      </span>
                      <h3 className="text-lg font-bold text-foreground mt-1">{item.role}</h3>
                      <p className="text-primary font-medium">{item.organization}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono text-foreground bg-primary/10 px-3 py-1.5 rounded-full">
                        {item.start} – {item.end}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{item.location}</div>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-xs text-muted-foreground bg-muted/50 border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
