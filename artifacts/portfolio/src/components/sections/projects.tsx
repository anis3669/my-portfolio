import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { ExternalLink, Github, Shield, Star, Layers } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Portfolio CMS with Filament Admin Panel",
    subtitle: "Full-Stack Laravel Application",
    description:
      "A production-grade portfolio management system built with Laravel 11 and Filament 3. The Filament-powered admin panel provides a beautiful, intuitive interface to manage every aspect of the portfolio — including projects (with image uploads, screenshots, tech tags, featured flags), skills (with icons and ordering), experiences (with timeline reordering), and profile data. Features Spatie Media Library for file management, rich text editing, and drag-and-drop reordering.",
    technologies: ["Laravel 11", "Filament 3", "PHP 8.3", "MySQL", "Spatie Media Library", "Tailwind CSS"],
    github: "https://github.com/anis3669/my-portfolio",
    live: null,
    featured: true,
    highlight: "filament",
    adminFeatures: [
      "Projects CRUD with image uploads",
      "Skills management with Font Awesome icons",
      "Experience timeline with drag-drop",
      "Profile & social links manager",
    ],
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    subtitle: "Laravel + Vue.js",
    description:
      "A full-stack e-commerce application with product catalog, shopping cart, user authentication, order management, payment integration, and an admin dashboard. Built with Laravel on the backend and Vue.js for a dynamic, reactive frontend with real-time cart updates.",
    technologies: ["Laravel", "Vue.js", "Tailwind CSS", "MySQL", "Stripe"],
    github: "https://github.com/anis3669",
    live: null,
    featured: true,
    highlight: null,
    adminFeatures: [],
  },
  {
    id: 3,
    title: "Task Management App",
    subtitle: "Laravel Livewire",
    description:
      "A real-time collaborative task manager with Kanban boards, task assignment, deadlines, and priority labels. Built entirely with Laravel Livewire — zero JavaScript frameworks, all reactivity handled server-side. Features real-time updates, filtering, and team workspaces.",
    technologies: ["Laravel", "Livewire", "Alpine.js", "Tailwind CSS", "PostgreSQL"],
    github: "https://github.com/anis3669",
    live: null,
    featured: true,
    highlight: null,
    adminFeatures: [],
  },
  {
    id: 4,
    title: "Blog Platform",
    subtitle: "Laravel + Filament",
    description:
      "A feature-rich blog platform with Markdown editing, category/tag system, SEO meta management, comment threading, and a Filament-powered admin panel with media management.",
    technologies: ["Laravel", "Filament", "Livewire", "Tailwind CSS", "MySQL"],
    github: "https://github.com/anis3669",
    live: null,
    featured: false,
    highlight: null,
    adminFeatures: [],
  },
  {
    id: 5,
    title: "Student Result System",
    subtitle: "Laravel + Blade",
    description:
      "An academic result management system for schools. Faculty can enter grades, generate PDF report cards, and track progress across semesters. Includes role-based access control for admin, teacher, and student roles.",
    technologies: ["Laravel", "Blade", "Tailwind CSS", "MySQL", "DomPDF"],
    github: "https://github.com/anis3669",
    live: null,
    featured: false,
    highlight: null,
    adminFeatures: [],
  },
  {
    id: 6,
    title: "REST API Service",
    subtitle: "Laravel Sanctum",
    description:
      "A clean, documented RESTful API backend with token-based auth, rate limiting, resource transformers, and versioning. Full API documentation generated with Scribe.",
    technologies: ["Laravel", "Sanctum", "Scribe", "MySQL", "PHP"],
    github: "https://github.com/anis3669",
    live: null,
    featured: false,
    highlight: null,
    adminFeatures: [],
  },
];

const techColors: Record<string, string> = {
  "Laravel 11": "bg-red-500/10 text-red-400 border-red-500/20",
  "Laravel": "bg-red-500/10 text-red-400 border-red-500/20",
  "Filament 3": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Filament": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "PHP 8.3": "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "PHP": "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "Livewire": "bg-pink-500/10 text-pink-400 border-pink-500/20",
  "Vue.js": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Alpine.js": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  "Tailwind CSS": "bg-sky-500/10 text-sky-400 border-sky-500/20",
  "MySQL": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "PostgreSQL": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Stripe": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  "Sanctum": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Scribe": "bg-teal-500/10 text-teal-400 border-teal-500/20",
  "Blade": "bg-red-400/10 text-red-300 border-red-400/20",
  "DomPDF": "bg-gray-500/10 text-gray-400 border-gray-500/20",
  "Spatie Media Library": "bg-green-500/10 text-green-400 border-green-500/20",
};

export function ProjectsSection() {
  const { ref, inView } = useInView({ threshold: 0.08 });

  return (
    <section id="projects" ref={ref} className="py-32 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-primary font-mono text-xs tracking-widest uppercase mb-3">03. Projects</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4" data-testid="projects-heading">
            Things I've Built
          </h2>
          <p className="text-muted-foreground max-w-xl">
            A selection of projects showcasing my expertise in Laravel, Filament admin panels, Livewire, and modern full-stack development.
          </p>
        </motion.div>

        {/* Featured projects */}
        <div className="space-y-6 mb-8">
          {projects.filter((p) => p.featured).map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 ${
                project.highlight === "filament"
                  ? "border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-card to-card hover:border-amber-500/50"
                  : "border-border bg-card hover:border-primary/30"
              }`}
              data-testid={`project-card-${project.id}`}
            >
              {project.highlight === "filament" && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
              )}

              <div className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Left */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      {project.highlight === "filament" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/25">
                          <Star size={10} className="fill-current" />
                          Featured Project
                        </span>
                      )}
                      <span className="text-xs font-mono text-muted-foreground">{project.subtitle}</span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* Admin features list for Filament project */}
                    {project.adminFeatures.length > 0 && (
                      <div className="mb-5">
                        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">
                          <Shield size={10} />
                          Admin Panel Features
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                          {project.adminFeatures.map((feat) => (
                            <li key={feat} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                              {feat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-2.5 py-1 rounded-md text-xs font-medium border ${techColors[tech] ?? "bg-muted/50 text-muted-foreground border-border"}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right — links */}
                  <div className="flex md:flex-col gap-3 md:items-end flex-shrink-0">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`project-github-${project.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all"
                    >
                      <Github size={14} />
                      GitHub
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`project-live-${project.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 text-sm hover:bg-primary hover:text-primary-foreground transition-all"
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Grid projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.filter((p) => !p.featured).map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
              className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 flex flex-col"
              data-testid={`project-card-${project.id}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Layers size={16} className="text-primary" />
                </div>
                <div className="flex gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github size={15} />
                  </a>
                </div>
              </div>
              <div className="text-xs font-mono text-primary mb-1">{project.subtitle}</div>
              <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className={`px-2 py-0.5 rounded-md text-xs font-medium border ${techColors[tech] ?? "text-muted-foreground bg-muted/30 border-border"}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-14"
        >
          <a
            href="https://github.com/anis3669"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-github-all"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all text-sm font-medium"
          >
            <Github size={15} />
            View all on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
