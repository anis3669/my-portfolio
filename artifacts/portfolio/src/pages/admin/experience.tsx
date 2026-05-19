import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Plus, Pencil, Trash2, Loader2, X, MapPin, Calendar } from "lucide-react";

interface Experience {
  id: number;
  company: string;
  position: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
  order: number;
}

const emptyForm = { company: "", position: "", period: "", location: "", description: "", technologies: [], order: 0 };

export function AdminExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<null | "create" | "edit">(null);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [form, setForm] = useState<Omit<Experience, "id">>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [techInput, setTechInput] = useState("");

  const load = () => { setLoading(true); api.get<Experience[]>("/experiences").then(setExperiences).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditing(null); setTechInput(""); setModal("create"); };
  const openEdit = (e: Experience) => {
    setForm({ company: e.company, position: e.position, period: e.period, location: e.location,
      description: e.description, technologies: e.technologies, order: e.order });
    setEditing(e); setTechInput(""); setModal("edit");
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (modal === "create") await api.post("/experiences", form);
      else if (editing) await api.put(`/experiences/${editing.id}`, form);
      setModal(null); load();
    } catch (e: any) { alert(e.message); } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this experience?")) return;
    await api.delete(`/experiences/${id}`); load();
  };

  const addTech = () => {
    if (techInput.trim()) { setForm((f) => ({ ...f, technologies: [...f.technologies, techInput.trim()] })); setTechInput(""); }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Experience</h2>
          <p className="text-sm text-zinc-400 mt-1">{experiences.length} entr{experiences.length !== 1 ? "ies" : "y"}</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-black font-semibold text-sm hover:bg-amber-400 transition-all">
          <Plus size={15} /> New Entry
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-zinc-600" /></div>
      ) : (
        <div className="space-y-3">
          {experiences.map((exp) => (
            <div key={exp.id} className="flex items-start gap-4 p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white text-sm">{exp.position}</h3>
                <div className="text-xs text-amber-400 font-medium mt-0.5">{exp.company}</div>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-zinc-500">
                  <span className="flex items-center gap-1"><Calendar size={10} />{exp.period}</span>
                  {exp.location && <span className="flex items-center gap-1"><MapPin size={10} />{exp.location}</span>}
                </div>
                <p className="text-xs text-zinc-500 line-clamp-2 mt-2">{exp.description}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(exp)} className="w-8 h-8 rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-all">
                  <Pencil size={13} />
                </button>
                <button onClick={() => handleDelete(exp.id)} className="w-8 h-8 rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-red-400 hover:border-red-500/30 transition-all">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="w-full max-w-lg bg-[#13151e] border border-zinc-800 rounded-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <h3 className="font-bold text-white">{modal === "create" ? "New Experience" : "Edit Experience"}</h3>
              <button onClick={() => setModal(null)} className="text-zinc-500 hover:text-white"><X size={16} /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: "Company", key: "company", placeholder: "Company name" },
                { label: "Position", key: "position", placeholder: "Your role" },
                { label: "Period", key: "period", placeholder: "e.g. 2023 – Present" },
                { label: "Location", key: "location", placeholder: "e.g. Remote, Nepal" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">{field.label}</label>
                  <input value={(form as any)[field.key]} onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                    placeholder={field.placeholder} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-all" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Description</label>
                <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-all resize-none" placeholder="What did you do here..." />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Technologies</label>
                <div className="flex gap-2 mb-2">
                  <input value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                    placeholder="Add tech..." className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-all" />
                  <button onClick={addTech} className="px-3 py-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all"><Plus size={14} /></button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {form.technologies.map((t, i) => (
                    <span key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {t} <button onClick={() => setForm((f) => ({ ...f, technologies: f.technologies.filter((_, j) => j !== i) }))} className="text-zinc-500 hover:text-red-400"><X size={10} /></button>
                    </span>
                  ))}
                </div>
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
