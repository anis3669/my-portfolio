import { Github, Linkedin, Mail, Heart } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6 md:px-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-lg font-black tracking-tight mb-1">
              ANIS<span className="text-primary">.</span>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              Built with <Heart size={10} className="text-red-400 fill-current" /> using React & Tailwind CSS
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/anis3669"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all"
              aria-label="GitHub"
            >
              <Github size={15} />
            </a>
            <a
              href="https://linkedin.com/in/anis-bastola"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="mailto:bastolaanis1230@gmail.com"
              className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all"
              aria-label="Email"
            >
              <Mail size={15} />
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            &copy; {year} Anis Bastola. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
