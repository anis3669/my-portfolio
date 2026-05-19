import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "bastolaanis1230@gmail.com",
    href: "mailto:bastolaanis1230@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+977 9742319857",
    href: "tel:+9779742319857",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Madhyapur Thimi, Nepal",
    href: null,
  },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/anis3669" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/anis-bastola" },
  { icon: Mail, label: "Email", href: "mailto:bastolaanis1230@gmail.com" },
];

export function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.15 });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 600);
  };

  return (
    <section id="contact" ref={ref} className="py-32 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">05. Contact</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight" data-testid="contact-heading">
            Get In Touch
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl">
            I'm currently open to freelance projects and junior developer opportunities.
            If you'd like to collaborate or just say hi, my inbox is always open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card"
                data-testid={`contact-${item.label.toLowerCase()}`}
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-0.5">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-foreground font-medium hover:text-primary transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-foreground font-medium">{item.value}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Socials */}
            <div className="pt-4">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
                Find me online
              </div>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    data-testid={`social-${s.label.toLowerCase()}`}
                    className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                    aria-label={s.label}
                  >
                    <s.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div className="h-full flex items-center justify-center p-10 rounded-2xl border border-primary/30 bg-primary/5">
                <div className="text-center">
                  <CheckCircle size={48} className="text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thanks for reaching out. I'll get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-5 py-2.5 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      data-testid="input-name"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      data-testid="input-email"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    data-testid="input-subject"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or say hello..."
                    data-testid="input-message"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  data-testid="btn-submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 glow-sm"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
