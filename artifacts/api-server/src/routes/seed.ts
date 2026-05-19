import { Router } from "express";
import bcrypt from "bcryptjs";
import { db, adminTable, projectsTable, skillsTable, experiencesTable, profileTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.post("/seed", async (_req, res) => {
  try {
    const [existingAdmin] = await db.select().from(adminTable).where(eq(adminTable.username, "admin"));
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash("admin123", 10);
      await db.insert(adminTable).values({ username: "admin", passwordHash });
    }

    const existingProfile = await db.select().from(profileTable).limit(1);
    if (existingProfile.length === 0) {
      await db.insert(profileTable).values({
        name: "Anis Bastola",
        title: "Junior Full Stack Developer",
        email: "bastolaanis1230@gmail.com",
        phone: "9742319857",
        location: "Madhyapur Thimi, Nepal",
        bio: "I build clean, purposeful software using Laravel, Vue.js, Livewire, and Tailwind CSS. Passionate about creating web applications that are both powerful and a joy to use.",
        githubUrl: "https://github.com/anis3669",
        linkedinUrl: "https://linkedin.com/in/anis-bastola",
        cvUrl: "",
      });
    }

    const existingProjects = await db.select().from(projectsTable).limit(1);
    if (existingProjects.length === 0) {
      await db.insert(projectsTable).values([
        {
          title: "Portfolio CMS with Filament Admin Panel",
          subtitle: "Full-Stack Laravel Application",
          description: "A production-grade portfolio management system built with Laravel 11 and Filament 3. The Filament-powered admin panel provides a beautiful, intuitive interface to manage every aspect of the portfolio.",
          technologies: ["Laravel 11", "Filament 3", "PHP 8.3", "MySQL", "Spatie Media Library", "Tailwind CSS"],
          githubUrl: "https://github.com/anis3669/my-portfolio",
          liveUrl: null,
          featured: true,
          highlight: "filament",
          adminFeatures: ["Projects CRUD with image uploads", "Skills management with Font Awesome icons", "Experience timeline with drag-drop", "Profile & social links manager"],
          order: 1,
        },
        {
          title: "E-Commerce Platform",
          subtitle: "Laravel + Vue.js",
          description: "A full-stack e-commerce application with product catalog, shopping cart, user authentication, order management, payment integration, and an admin dashboard.",
          technologies: ["Laravel", "Vue.js", "Tailwind CSS", "MySQL", "Stripe"],
          githubUrl: "https://github.com/anis3669",
          liveUrl: null,
          featured: true,
          highlight: null,
          adminFeatures: [],
          order: 2,
        },
        {
          title: "Task Management App",
          subtitle: "Laravel Livewire",
          description: "A real-time collaborative task manager with Kanban boards, task assignment, deadlines, and priority labels. Built entirely with Laravel Livewire.",
          technologies: ["Laravel", "Livewire", "Alpine.js", "Tailwind CSS", "PostgreSQL"],
          githubUrl: "https://github.com/anis3669",
          liveUrl: null,
          featured: true,
          highlight: null,
          adminFeatures: [],
          order: 3,
        },
        {
          title: "Blog Platform",
          subtitle: "Laravel + Filament",
          description: "A feature-rich blog platform with Markdown editing, category/tag system, SEO meta management, comment threading, and a Filament-powered admin panel.",
          technologies: ["Laravel", "Filament", "Livewire", "Tailwind CSS", "MySQL"],
          githubUrl: "https://github.com/anis3669",
          liveUrl: null,
          featured: false,
          highlight: null,
          adminFeatures: [],
          order: 4,
        },
        {
          title: "Student Result System",
          subtitle: "Laravel + Blade",
          description: "An academic result management system for schools. Faculty can enter grades, generate PDF report cards, and track progress across semesters.",
          technologies: ["Laravel", "Blade", "Tailwind CSS", "MySQL", "DomPDF"],
          githubUrl: "https://github.com/anis3669",
          liveUrl: null,
          featured: false,
          highlight: null,
          adminFeatures: [],
          order: 5,
        },
        {
          title: "REST API Service",
          subtitle: "Laravel Sanctum",
          description: "A clean, documented RESTful API backend with token-based auth, rate limiting, resource transformers, and versioning.",
          technologies: ["Laravel", "Sanctum", "Scribe", "MySQL", "PHP"],
          githubUrl: "https://github.com/anis3669",
          liveUrl: null,
          featured: false,
          highlight: null,
          adminFeatures: [],
          order: 6,
        },
      ]);
    }

    const existingSkills = await db.select().from(skillsTable).limit(1);
    if (existingSkills.length === 0) {
      await db.insert(skillsTable).values([
        { name: "Laravel", category: "Backend", iconKey: "SiLaravel", level: 90, order: 1 },
        { name: "PHP", category: "Backend", iconKey: "SiPhp", level: 88, order: 2 },
        { name: "Filament", category: "Backend", iconKey: "SiLaravel", level: 85, order: 3 },
        { name: "Livewire", category: "Backend", iconKey: "SiLaravel", level: 82, order: 4 },
        { name: "MySQL", category: "Database", iconKey: "SiMysql", level: 80, order: 5 },
        { name: "Vue.js", category: "Frontend", iconKey: "SiVuedotjs", level: 75, order: 6 },
        { name: "Alpine.js", category: "Frontend", iconKey: "SiAlpinedotjs", level: 80, order: 7 },
        { name: "Tailwind CSS", category: "Frontend", iconKey: "SiTailwindcss", level: 90, order: 8 },
        { name: "JavaScript", category: "Frontend", iconKey: "SiJavascript", level: 75, order: 9 },
        { name: "Git", category: "Tools", iconKey: "SiGit", level: 80, order: 10 },
        { name: "Composer", category: "Tools", iconKey: "SiComposer", level: 85, order: 11 },
        { name: "Linux", category: "Tools", iconKey: "SiLinux", level: 70, order: 12 },
      ]);
    }

    const existingExp = await db.select().from(experiencesTable).limit(1);
    if (existingExp.length === 0) {
      await db.insert(experiencesTable).values([
        {
          company: "Freelance",
          position: "Full Stack Developer",
          period: "2023 – Present",
          location: "Remote",
          description: "Building custom web applications for clients using Laravel, Filament, Livewire, and Vue.js. Delivered multiple portfolio, e-commerce, and admin panel projects.",
          technologies: ["Laravel", "Filament", "Livewire", "Vue.js", "Tailwind CSS"],
          order: 1,
        },
        {
          company: "Personal Projects",
          position: "Open Source Contributor",
          period: "2022 – 2023",
          location: "Madhyapur Thimi, Nepal",
          description: "Developed personal projects to deepen understanding of the TALL stack. Built reusable Livewire components, Filament plugins, and contributed to the Laravel community.",
          technologies: ["PHP", "Laravel", "Alpine.js", "MySQL", "Git"],
          order: 2,
        },
      ]);
    }

    res.json({ success: true, message: "Database seeded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: String(err) });
  }
});

export default router;
