import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, MapPin, Download, ExternalLink } from "lucide-react";

const ROLES = [
  "Junior Full Stack Developer",
  "Laravel & Filament Expert",
  "Vue.js & Livewire Builder",
  "TALL Stack Specialist",
];

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number; y: number; vx: number; vy: number; size: number; opacity: number;
    }> = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(258, 80%, 68%, ${p.opacity})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(258, 80%, 68%, ${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animate();
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/4 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-blue-500/4 blur-[100px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 md:px-16 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left — text */}
          <div>
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5 text-sm font-medium"
              data-testid="hero-badge"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400">Available for opportunities</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-5"
              data-testid="hero-name"
            >
              Hi, I'm{" "}
              <span className="block gradient-text">Anis Bastola</span>
            </motion.h1>

            {/* Animated role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-7 mb-6 overflow-hidden"
            >
              <motion.p
                key={roleIndex}
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -28, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="text-lg text-primary font-mono font-medium"
                data-testid="hero-role"
              >
                {ROLES[roleIndex]}
              </motion.p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-muted-foreground text-base leading-relaxed mb-3 max-w-lg"
              data-testid="hero-description"
            >
              I craft clean, production-ready web applications using <span className="text-foreground font-medium">Laravel, Filament, Livewire</span>, and <span className="text-foreground font-medium">Vue.js</span> — with a strong focus on elegant admin panels and seamless user experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="flex items-center gap-2 text-sm text-muted-foreground mb-10"
            >
              <MapPin size={13} className="text-primary flex-shrink-0" />
              Madhyapur Thimi, Nepal
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <button
                onClick={() => scrollTo("projects")}
                data-testid="btn-view-work"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                View My Work
                <ExternalLink size={14} />
              </button>
              <button
                onClick={() => scrollTo("contact")}
                data-testid="btn-contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-semibold text-sm hover:border-primary/40 hover:bg-primary/5 active:scale-95 transition-all duration-200"
              >
                Contact Me
                <Mail size={14} />
              </button>
              <a
                href="#"
                data-testid="btn-download-cv"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-muted-foreground font-semibold text-sm hover:border-primary/40 hover:bg-primary/5 active:scale-95 transition-all duration-200"
              >
                Download CV
                <Download size={14} />
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="flex items-center gap-4"
            >
              <a
                href="https://github.com/anis3669"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-github"
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href="https://linkedin.com/in/anis-bastola"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-linkedin"
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="mailto:bastolaanis1230@gmail.com"
                data-testid="link-email"
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </motion.div>
          </div>

          {/* Right — profile visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-blue-500/10 blur-2xl scale-110" />

              {/* Card */}
              <div className="relative w-[360px] rounded-3xl border border-border bg-card overflow-hidden">
                {/* Profile top */}
                <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent h-24 relative">
                  <div className="absolute inset-0 grid-bg opacity-20" />
                </div>

                {/* Avatar */}
                <div className="px-8 pb-8 -mt-10">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white text-2xl font-black mb-4 border-4 border-card">
                    AB
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Anis Bastola</h3>
                  <p className="text-sm text-primary font-mono mt-0.5 mb-4">Junior Full Stack Developer</p>

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                      <MapPin size={11} className="text-primary flex-shrink-0" />
                      Madhyapur Thimi, Nepal
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                      <Mail size={11} className="text-primary flex-shrink-0" />
                      bastolaanis1230@gmail.com
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                      <Github size={11} className="text-primary flex-shrink-0" />
                      github.com/anis3669
                    </div>
                  </div>

                  <div className="mt-5 pt-5 border-t border-border">
                    <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">Core Stack</div>
                    <div className="flex flex-wrap gap-1.5">
                      {["Laravel", "Filament", "Livewire", "Vue.js", "Tailwind", "PHP"].map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-md text-xs bg-primary/10 text-primary border border-primary/20 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stat badges */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -top-4 -right-8 px-3 py-2 rounded-xl border border-border bg-card shadow-lg text-xs font-medium"
              >
                <div className="text-foreground font-bold text-sm">10+</div>
                <div className="text-muted-foreground">Projects</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -left-8 px-3 py-2 rounded-xl border border-border bg-card shadow-lg text-xs font-medium"
              >
                <div className="text-green-400 font-bold text-sm">Open</div>
                <div className="text-muted-foreground">to work</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground cursor-pointer"
          onClick={() => scrollTo("about")}
          data-testid="scroll-indicator"
        >
          <span className="text-xs tracking-widest uppercase font-mono">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}>
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
