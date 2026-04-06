import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Plus, Pencil, Trash2, Loader2, X } from "lucide-react";

interface Skill {
  id: number;
  name: string;
  category: string;
  iconKey: string;
  level: number;
  order: number;
}

const CATEGORIES = ["Backend", "Frontend", "Database", "Tools", "DevOps", "Other"];

const emptyForm = { name: "", category: "Backend", iconKey: "", level: 80, order: 0 };

export function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<null | "create" | "edit">(null);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api.get<Skill[]>("/skills").then(setSkills).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const grouped = CATEGORIES.reduce((acc, cat) => {
    const catSkills = skills.filter((s) => s.category === cat);
    if (catSkills.length) acc[cat] = catSkills;
    return acc;
  }, {} as Record<string, Skill[]>);

  const openCreate = () => { setForm(emptyForm); setEditing(null); setModal("create"); };
  const openEdit = (s: Skill) => {
    setForm({ name: s.name, category: s.category, iconKey: s.iconKey, level: s.level, order: s.order });
    setEditing(s); setModal("edit");
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (modal === "create") await api.post("/skills", form);
      else if (editing) await api.put(`/skills/${editing.id}`, form);
      setModal(null); load();
    } catch (e: any) { alert(e.message); } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this skill?")) return;
    await api.delete(`/skills/${id}`); load();
  };

  const levelColor = (level: number) => level >= 80 ? "bg-emerald-500" : level >= 60 ? "bg-amber-500" : "bg-blue-500";

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Skills</h2>
          <p className="text-sm text-zinc-400 mt-1">{skills.length} skill{skills.length !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-black font-semibold text-sm hover:bg-amber-400 transition-all">
          <Plus size={15} /> New Skill
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-zinc-600" /></div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([cat, catSkills]) => (
            <div key={cat}>
              <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">{cat}</h3>
              <div className="space-y-2">
                {catSkills.map((s) => (
                  <div key={s.id} className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white text-sm">{s.name}</span>
                        <span className="text-xs text-zinc-500">{s.level}%</span>
                      </div>
                      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${levelColor(s.level)}`} style={{ width: `${s.level}%` }} />
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => openEdit(s)} className="w-7 h-7 rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-all">
                        <Pencil size={12} />
                      </button>
                      <button onClick={() => handleDelete(s.id)} className="w-7 h-7 rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-red-400 hover:border-red-500/30 transition-all">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="w-full max-w-sm bg-[#13151e] border border-zinc-800 rounded-2xl">
            <div className="flex items-center justify-between p-5 border-b border-zinc-800">
              <h3 className="font-bold text-white">{modal === "create" ? "New Skill" : "Edit Skill"}</h3>
              <button onClick={() => setModal(null)} className="text-zinc-500 hover:text-white"><X size={16} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Name</label>
                <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="e.g. Laravel"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Category</label>
                <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-all">
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Proficiency Level ({form.level}%)</label>
                <input type="range" min={0} max={100} value={form.level} onChange={(e) => setForm((f) => ({ ...f, level: Number(e.target.value) }))}
                  className="w-full accent-amber-500" />
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden mt-2">
                  <div className={`h-full rounded-full ${levelColor(form.level)}`} style={{ width: `${form.level}%` }} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Display Order</label>
                <input type="number" value={form.order} onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-all" />
              </div>
            </div>
            <div className="flex gap-3 p-5 border-t border-zinc-800">
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
