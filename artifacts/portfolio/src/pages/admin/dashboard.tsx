import { useEffect, useState } from "react";
import { Link } from "wouter";
import { api } from "@/lib/api";
import { FolderOpen, Wrench, Briefcase, User, ArrowRight, Loader2, Plus } from "lucide-react";

interface Stats {
  projects: number;
  skills: number;
  experiences: number;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get<any[]>("/projects"),
      api.get<any[]>("/skills"),
      api.get<any[]>("/experiences"),
    ]).then(([projects, skills, experiences]) => {
      setStats({ projects: projects.length, skills: skills.length, experiences: experiences.length });
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await api.post("/seed", {});
      window.location.reload();
    } catch (e) {
      alert("Seed failed: " + e);
    } finally {
      setSeeding(false);
    }
  };

  const cards = [
    { label: "Projects", value: stats?.projects, icon: FolderOpen, href: "/admin/projects", color: "amber" },
    { label: "Skills", value: stats?.skills, icon: Wrench, href: "/admin/skills", color: "blue" },
    { label: "Experiences", value: stats?.experiences, icon: Briefcase, href: "/admin/experience", color: "green" },
    { label: "Profile", value: "1", icon: User, href: "/admin/profile", color: "violet" },
  ];

  const colorMap: Record<string, string> = {
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    violet: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">Dashboard</h2>
          <p className="text-sm text-zinc-400 mt-1">Manage your portfolio content from here.</p>
        </div>
        <button
          onClick={handleSeed}
          disabled={seeding}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 text-sm font-medium transition-all disabled:opacity-50"
        >
          {seeding ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
          Seed Default Data
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href}>
            <div className="group p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/60 hover:border-zinc-700 transition-all cursor-pointer">
              <div className={`w-9 h-9 rounded-lg border flex items-center justify-center mb-4 ${colorMap[card.color]}`}>
                <card.icon size={16} />
              </div>
              <div className="text-2xl font-black text-white mb-1">
                {loading ? <Loader2 size={18} className="animate-spin text-zinc-600" /> : card.value}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">{card.label}</span>
                <ArrowRight size={12} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "Add New Project", href: "/admin/projects", icon: FolderOpen },
            { label: "Add New Skill", href: "/admin/skills", icon: Wrench },
            { label: "Update Profile", href: "/admin/profile", icon: User },
          ].map((action) => (
            <Link key={action.label} href={action.href}>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all cursor-pointer group">
                <action.icon size={15} className="text-zinc-500 group-hover:text-amber-400 transition-colors flex-shrink-0" />
                <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">{action.label}</span>
                <ArrowRight size={12} className="ml-auto text-zinc-600 group-hover:text-amber-400 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
