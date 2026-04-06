import { useState, ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAdmin } from "@/contexts/admin-context";
import {
  LayoutDashboard, FolderOpen, Wrench, Briefcase, User, LogOut, Menu, X, ExternalLink, ChevronRight
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/skills", label: "Skills", icon: Wrench },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/profile", label: "Profile", icon: User },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const { logout } = useAdmin();
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f1117] flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-[#13151e] border-r border-zinc-800/60 flex flex-col transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-zinc-800/60">
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
            <span className="text-amber-400 text-xs font-black">AB</span>
          </div>
          <div>
            <div className="text-sm font-bold text-white leading-none">Portfolio</div>
            <div className="text-xs text-amber-400 font-mono mt-0.5">Admin Panel</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <div className="text-xs font-mono text-zinc-600 uppercase tracking-widest px-2 mb-3">Management</div>
          {navItems.map((item) => {
            const active = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                  active
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                }`}
              >
                <item.icon size={15} className={active ? "text-amber-400" : "text-zinc-500 group-hover:text-zinc-300"} />
                {item.label}
                {active && <ChevronRight size={12} className="ml-auto text-amber-400" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-zinc-800/60 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all"
          >
            <ExternalLink size={15} className="text-zinc-500" />
            View Portfolio
          </a>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            <LogOut size={15} className="text-zinc-500" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center gap-3 px-5 py-3 bg-[#0f1117]/90 backdrop-blur border-b border-zinc-800/60">
          <button
            className="lg:hidden w-8 h-8 rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
          <div className="flex-1">
            <h1 className="text-sm font-semibold text-white">
              {navItems.find((n) => n.href === location)?.label ?? "Admin"}
            </h1>
          </div>
          <span className="text-xs text-zinc-600 font-mono">Anis Bastola</span>
        </header>

        {/* Content */}
        <main className="flex-1 p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
