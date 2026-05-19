import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "About", href: "about" },
  { name: "Skills", href: "skills" },
  { name: "Projects", href: "projects" },
  { name: "Experience", href: "experience" },
  { name: "Contact", href: "contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
      const sections = navItems.map((item) => item.href);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-background/90 backdrop-blur-xl border-b border-border/60"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 md:px-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          className="text-lg font-black tracking-tight text-foreground hover:text-primary transition-colors"
        >
          ANIS<span className="text-primary">.</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollTo(item.href)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeSection === item.href
                  ? "text-primary bg-primary/8"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="ml-3 px-5 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-95 transition-all duration-200"
          >
            Hire Me
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollTo(item.href)}
                  className={`text-left px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    activeSection === item.href
                      ? "text-primary bg-primary/8"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="mt-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm"
              >
                Hire Me
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
