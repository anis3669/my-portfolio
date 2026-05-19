import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Plus, Pencil, Trash2, Loader2, Star, X, ChevronDown, ChevronUp } from "lucide-react";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  highlight: string | null;
  adminFeatures: string[];
  order: number;
}

const emptyForm: Omit<Project, "id"> = {
  title: "", subtitle: "", description: "", technologies: [], githubUrl: "", liveUrl: "",
  featured: false, highlight: "", adminFeatures: [], order: 0,
};

export function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<null | "create" | "edit">(null);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [adminFeatInput, setAdminFeatInput] = useState("");

  const load = () => {
    setLoading(true);
    api.get<Project[]>("/projects").then(setProjects).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setTechInput("");
    setAdminFeatInput("");
    setEditing(null);
    setModal("create");
  };

  const openEdit = (p: Project) => {
    setForm({ title: p.title, subtitle: p.subtitle, description: p.description, technologies: p.technologies,
      githubUrl: p.githubUrl ?? "", liveUrl: p.liveUrl ?? "", featured: p.featured,
      highlight: p.highlight ?? "", adminFeatures: p.adminFeatures, order: p.order });
    setTechInput("");
    setAdminFeatInput("");
    setEditing(p);
    setModal("edit");
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        githubUrl: form.githubUrl || null,
        liveUrl: form.liveUrl || null,
        highlight: form.highlight || null,
      };
      if (modal === "create") {
        await api.post("/projects", payload);
      } else if (editing) {
        await api.put(`/projects/${editing.id}`, payload);
      }
      setModal(null);
      load();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this project?")) return;
    await api.delete(`/projects/${id}`);
    load();
  };

  const addTech = () => {
    if (techInput.trim()) {
      setForm((f) => ({ ...f, technologies: [...f.technologies, techInput.trim()] }));
      setTechInput("");
    }
  };

  const addAdminFeat = () => {
    if (adminFeatInput.trim()) {
      setForm((f) => ({ ...f, adminFeatures: [...f.adminFeatures, adminFeatInput.trim()] }));
      setAdminFeatInput("");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Projects</h2>
          <p className="text-sm text-zinc-400 mt-1">{projects.length} project{projects.length !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-black font-semibold text-sm hover:bg-amber-400 transition-all">
          <Plus size={15} /> New Project
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="animate-spin text-zinc-600" />
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p.id} className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/60 hover:border-zinc-700 transition-all">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-white text-sm truncate">{p.title}</h3>
                  {p.featured && <Star size={11} className="text-amber-400 fill-amber-400 flex-shrink-0" />}
                </div>
                <p className="text-xs text-zinc-500 line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {p.technologies.slice(0, 4).map((t) => (
                    <span key={t} className="px-1.5 py-0.5 rounded text-xs bg-zinc-800 text-zinc-400 border border-zinc-700">{t}</span>
                  ))}
                  {p.technologies.length > 4 && <span className="text-xs text-zinc-600">+{p.technologies.length - 4}</span>}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(p)} className="w-8 h-8 rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-all">
                  <Pencil size={13} />
                </button>
                <button onClick={() => handleDelete(p.id)} className="w-8 h-8 rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-red-400 hover:border-red-500/30 transition-all">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="w-full max-w-lg bg-[#13151e] border border-zinc-800 rounded-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <h3 className="font-bold text-white">{modal === "create" ? "New Project" : "Edit Project"}</h3>
              <button onClick={() => setModal(null)} className="text-zinc-500 hover:text-white"><X size={16} /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: "Title", key: "title", placeholder: "Project name" },
                { label: "Subtitle", key: "subtitle", placeholder: "e.g. Full-Stack Laravel Application" },
                { label: "GitHub URL", key: "githubUrl", placeholder: "https://github.com/..." },
                { label: "Live URL", key: "liveUrl", placeholder: "https://..." },
                { label: "Display Order", key: "order", placeholder: "1", type: "number" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">{field.label}</label>
                  <input
                    type={field.type ?? "text"}
                    value={(form as any)[field.key]}
                    onChange={(e) => setForm((f) => ({ ...f, [field.key]: field.type === "number" ? Number(e.target.value) : e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-all"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-all resize-none"
                  placeholder="Project description..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Technologies</label>
                <div className="flex gap-2 mb-2">
                  <input value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                    placeholder="Add technology..." className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-all" />
                  <button onClick={addTech} className="px-3 py-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 text-sm hover:bg-amber-500/20 transition-all"><Plus size={14} /></button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {form.technologies.map((t, i) => (
                    <span key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {t} <button onClick={() => setForm((f) => ({ ...f, technologies: f.technologies.filter((_, j) => j !== i) }))} className="text-zinc-500 hover:text-red-400"><X size={10} /></button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Admin Panel Features (optional)</label>
                <div className="flex gap-2 mb-2">
                  <input value={adminFeatInput} onChange={(e) => setAdminFeatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addAdminFeat())}
                    placeholder="e.g. Projects CRUD with uploads..." className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-all" />
                  <button onClick={addAdminFeat} className="px-3 py-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 text-sm hover:bg-amber-500/20 transition-all"><Plus size={14} /></button>
                </div>
                <div className="space-y-1">
                  {form.adminFeatures.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-400">
                      <span className="w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span className="flex-1">{f}</span>
                      <button onClick={() => setForm((form) => ({ ...form, adminFeatures: form.adminFeatures.filter((_, j) => j !== i) }))} className="text-zinc-600 hover:text-red-400"><X size={10} /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                  className="w-4 h-4 accent-amber-500 rounded" />
                <label htmlFor="featured" className="text-sm text-zinc-400">Featured project</label>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-zinc-800">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white text-sm font-medium transition-all">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-amber-500 text-black font-semibold text-sm hover:bg-amber-400 transition-all disabled:opacity-60">
                {saving ? <Loader2 size={14} className="animate-spin" /> : null}
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
