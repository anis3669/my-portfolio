import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Loader2, Save, CheckCircle } from "lucide-react";

interface Profile {
  id?: number;
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  cvUrl: string;
}

const emptyProfile: Profile = {
  name: "", title: "", email: "", phone: "", location: "",
  bio: "", githubUrl: "", linkedinUrl: "", cvUrl: "",
};

export function AdminProfile() {
  const [form, setForm] = useState<Profile>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get<Profile | null>("/profile").then((data) => {
      if (data) setForm(data);
    }).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/profile", form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  const field = (label: string, key: keyof Profile, placeholder = "", type = "text") => (
    <div key={key}>
      <label className="block text-xs font-medium text-zinc-400 mb-1.5">{label}</label>
      <input
        type={type}
        value={form[key] as string}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-all"
      />
    </div>
  );

  if (loading) {
    return <div className="flex items-center justify-center py-32"><Loader2 size={24} className="animate-spin text-zinc-600" /></div>;
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-black text-white">Profile</h2>
        <p className="text-sm text-zinc-400 mt-1">Your personal information shown on the portfolio.</p>
      </div>

      <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-white mb-4">Personal Info</h3>
        {field("Full Name", "name", "Anis Bastola")}
        {field("Professional Title", "title", "Junior Full Stack Developer")}
        {field("Email", "email", "bastolaanis1230@gmail.com", "email")}
        {field("Phone", "phone", "+977 97XXXXXXXX")}
        {field("Location", "location", "Madhyapur Thimi, Nepal")}
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5">Bio</label>
          <textarea
            value={form.bio}
            onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
            rows={4}
            placeholder="A short bio about yourself..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-all resize-none"
          />
        </div>
      </div>

      <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-white mb-4">Links</h3>
        {field("GitHub URL", "githubUrl", "https://github.com/anis3669")}
        {field("LinkedIn URL", "linkedinUrl", "https://linkedin.com/in/anis-bastola")}
        {field("CV / Resume URL", "cvUrl", "https://...")}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500 text-black font-semibold text-sm hover:bg-amber-400 active:scale-[0.98] transition-all disabled:opacity-60"
      >
        {saving ? <Loader2 size={15} className="animate-spin" /> : saved ? <CheckCircle size={15} /> : <Save size={15} />}
        {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
      </button>
    </div>
  );
}
