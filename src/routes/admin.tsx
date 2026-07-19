import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { SiteShell } from "@/components/site/SiteShell";
import {
  adminDeleteGallery,
  adminDeleteTeam,
  adminListGallery,
  adminListTeam,
  adminLogin,
  adminLogout,
  adminStatus,
  adminUpsertGallery,
  adminUpsertTeam,
} from "@/lib/admin.functions";
import type { TeamCategory } from "@/lib/site-data.functions";
import { Trash2, Plus, LogOut, Save, X } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin · अvinya 2.0" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const CATS: { value: TeamCategory; label: string }[] = [
  { value: "faculty_coordinator", label: "Faculty Coordinator" },
  { value: "mentor", label: "Mentor" },
  { value: "head", label: "Fest Head" },
  { value: "creative", label: "Creative Team" },
  { value: "event_management", label: "Event Management" },
  { value: "literary", label: "Literary Team" },
  { value: "social_media", label: "Social Media" },
  { value: "anchoring", label: "Anchoring Team" },
];

const field =
  "w-full glass-panel px-3 py-2 text-sm focus:outline-none focus:border-primary/60";

function AdminPage() {
  const navigate = useNavigate();
  const status = useServerFn(adminStatus);
  const login = useServerFn(adminLogin);
  const [checking, setChecking] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    status().then((r) => {
      setUnlocked(r.unlocked);
      setChecking(false);
    });
  }, [status]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await login({ data: { password } });
      if (r.ok) {
        setUnlocked(true);
        toast.success("Welcome, admin.");
      } else {
        toast.error("Incorrect password");
      }
    } catch {
      toast.error("Login failed");
    } finally {
      setLoading(false);
      setPassword("");
    }
  }

  if (checking) {
    return (
      <SiteShell>
        <div className="pt-40 pb-24 text-center text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Loading…
        </div>
      </SiteShell>
    );
  }

  if (!unlocked) {
    return (
      <SiteShell>
        <section className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center">
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md glass-panel-strong p-8"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary mb-2">
              Restricted
            </p>
            <h1 className="text-3xl font-bold mb-6">Admin Console</h1>
            <input
              type="password"
              autoFocus
              autoComplete="current-password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={field}
            />
            <button
              type="submit"
              disabled={loading || !password}
              className="mt-4 w-full px-6 py-3 bg-primary text-primary-foreground font-bold uppercase text-xs tracking-[0.25em] hover:brightness-110 disabled:opacity-60"
            >
              {loading ? "Verifying…" : "Enter"}
            </button>
            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              className="mt-3 w-full text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-primary"
            >
              ← Back to site
            </button>
          </motion.form>
        </section>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <Dashboard onLogout={() => setUnlocked(false)} />
    </SiteShell>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const logout = useServerFn(adminLogout);
  const [tab, setTab] = useState<"team" | "gallery">("team");

  return (
    <div className="pt-28 pb-24 px-6 md:px-10 max-w-6xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary mb-1">
            Admin
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Console</h1>
        </div>
        <button
          onClick={async () => {
            await logout();
            toast.success("Signed out");
            onLogout();
          }}
          className="inline-flex items-center gap-2 glass-panel px-4 py-2 text-xs font-mono uppercase tracking-widest hover:bg-white/5"
        >
          <LogOut className="size-3.5" /> Logout
        </button>
      </div>

      <div className="flex gap-2 mb-8 border-b border-white/5">
        {(["team", "gallery"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-[0.25em] border-b-2 -mb-px transition-colors ${
              tab === t
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "team" ? "Team & Staff" : "Gallery"}
          </button>
        ))}
      </div>

      {tab === "team" ? <TeamManager /> : <GalleryManager />}
    </div>
  );
}

type TeamRow = {
  id: string;
  name: string;
  role: string | null;
  category: TeamCategory;
  image_url: string | null;
  bio: string | null;
  sort_order: number;
  published: boolean;
};

function TeamManager() {
  const qc = useQueryClient();
  const list = useServerFn(adminListTeam);
  const upsert = useServerFn(adminUpsertTeam);
  const del = useServerFn(adminDeleteTeam);
  const { data } = useQuery({
    queryKey: ["admin-team"],
    queryFn: () => list() as Promise<TeamRow[]>,
  });
  const [editing, setEditing] = useState<Partial<TeamRow> | null>(null);

  async function save(form: Partial<TeamRow>) {
    try {
      await upsert({
        data: {
          id: form.id,
          name: form.name || "",
          role: form.role || null,
          category: (form.category || "creative") as TeamCategory,
          image_url: form.image_url || null,
          bio: form.bio || null,
          sort_order: Number(form.sort_order ?? 0),
          published: form.published !== false,
        },
      });
      toast.success("Saved");
      setEditing(null);
      qc.invalidateQueries({ queryKey: ["admin-team"] });
      qc.invalidateQueries({ queryKey: ["team-members"] });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this member?")) return;
    await del({ data: { id } });
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["admin-team"] });
    qc.invalidateQueries({ queryKey: ["team-members"] });
  }

  const grouped = CATS.map((c) => ({
    ...c,
    rows: (data ?? []).filter((r) => r.category === c.value),
  }));

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button
          onClick={() =>
            setEditing({ category: "creative", sort_order: 0, published: true })
          }
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-mono uppercase tracking-widest hover:brightness-110"
        >
          <Plus className="size-3.5" /> Add Member
        </button>
      </div>

      {editing && <MemberForm value={editing} onCancel={() => setEditing(null)} onSave={save} />}

      <div className="space-y-8">
        {grouped.map((g) => (
          <div key={g.value}>
            <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              {g.label} · {g.rows.length}
            </h3>
            <div className="grid gap-2">
              {g.rows.length === 0 && (
                <p className="text-xs text-muted-foreground/60 font-mono">Empty</p>
              )}
              {g.rows.map((r) => (
                <div
                  key={r.id}
                  className="glass-panel p-3 flex items-center gap-4"
                >
                  <div className="size-12 shrink-0 overflow-hidden bg-white/5">
                    {r.image_url && (
                      <img src={r.image_url} alt="" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{r.name}</p>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground truncate">
                      {r.role || "—"} · order {r.sort_order}
                      {!r.published && " · draft"}
                    </p>
                  </div>
                  <button
                    onClick={() => setEditing(r)}
                    className="text-xs font-mono uppercase tracking-widest text-primary hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(r.id)}
                    className="p-2 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MemberForm({
  value,
  onSave,
  onCancel,
}: {
  value: Partial<TeamRow>;
  onSave: (v: Partial<TeamRow>) => void;
  onCancel: () => void;
}) {
  const [v, setV] = useState<Partial<TeamRow>>(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel-strong p-6 mb-8 space-y-3"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">{v.id ? "Edit member" : "New member"}</h3>
        <button onClick={onCancel} className="p-1 hover:text-primary">
          <X className="size-4" />
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <label className="text-xs">
          <span className="mb-1 block text-muted-foreground uppercase tracking-widest text-[10px] font-mono">
            Name
          </span>
          <input
            className={field}
            value={v.name ?? ""}
            onChange={(e) => setV({ ...v, name: e.target.value })}
          />
        </label>
        <label className="text-xs">
          <span className="mb-1 block text-muted-foreground uppercase tracking-widest text-[10px] font-mono">
            Role / Designation
          </span>
          <input
            className={field}
            value={v.role ?? ""}
            onChange={(e) => setV({ ...v, role: e.target.value })}
          />
        </label>
        <label className="text-xs">
          <span className="mb-1 block text-muted-foreground uppercase tracking-widest text-[10px] font-mono">
            Category
          </span>
          <select
            className={field}
            value={v.category ?? "creative"}
            onChange={(e) => setV({ ...v, category: e.target.value as TeamCategory })}
          >
            {CATS.map((c) => (
              <option key={c.value} value={c.value} className="bg-background">
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs">
          <span className="mb-1 block text-muted-foreground uppercase tracking-widest text-[10px] font-mono">
            Sort order
          </span>
          <input
            type="number"
            className={field}
            value={v.sort_order ?? 0}
            onChange={(e) => setV({ ...v, sort_order: Number(e.target.value) })}
          />
        </label>
        <label className="md:col-span-2 text-xs">
          <span className="mb-1 block text-muted-foreground uppercase tracking-widest text-[10px] font-mono">
            Image URL
          </span>
          <input
            className={field}
            placeholder="https://…"
            value={v.image_url ?? ""}
            onChange={(e) => setV({ ...v, image_url: e.target.value })}
          />
        </label>
        <label className="md:col-span-2 text-xs">
          <span className="mb-1 block text-muted-foreground uppercase tracking-widest text-[10px] font-mono">
            Short bio (optional)
          </span>
          <textarea
            className={field}
            rows={2}
            value={v.bio ?? ""}
            onChange={(e) => setV({ ...v, bio: e.target.value })}
          />
        </label>
        <label className="text-xs inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={v.published !== false}
            onChange={(e) => setV({ ...v, published: e.target.checked })}
          />
          <span className="text-muted-foreground uppercase tracking-widest text-[10px] font-mono">
            Published
          </span>
        </label>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(v)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-mono uppercase tracking-widest hover:brightness-110"
        >
          <Save className="size-3.5" /> Save
        </button>
      </div>
    </motion.div>
  );
}

type GalleryRow = {
  id: string;
  image_url: string;
  caption: string | null;
  sort_order: number;
  published: boolean;
};

function GalleryManager() {
  const qc = useQueryClient();
  const list = useServerFn(adminListGallery);
  const upsert = useServerFn(adminUpsertGallery);
  const del = useServerFn(adminDeleteGallery);
  const { data } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: () => list() as Promise<GalleryRow[]>,
  });
  const [editing, setEditing] = useState<Partial<GalleryRow> | null>(null);

  async function save(form: Partial<GalleryRow>) {
    try {
      await upsert({
        data: {
          id: form.id,
          image_url: form.image_url || "",
          caption: form.caption || null,
          sort_order: Number(form.sort_order ?? 0),
          published: form.published !== false,
        },
      });
      toast.success("Saved");
      setEditing(null);
      qc.invalidateQueries({ queryKey: ["admin-gallery"] });
      qc.invalidateQueries({ queryKey: ["gallery-images"] });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this image?")) return;
    await del({ data: { id } });
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["admin-gallery"] });
    qc.invalidateQueries({ queryKey: ["gallery-images"] });
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button
          onClick={() =>
            setEditing({ image_url: "", sort_order: 0, published: true })
          }
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-mono uppercase tracking-widest hover:brightness-110"
        >
          <Plus className="size-3.5" /> Add Image
        </button>
      </div>

      {editing && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel-strong p-6 mb-8 space-y-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">{editing.id ? "Edit image" : "New image"}</h3>
            <button onClick={() => setEditing(null)} className="p-1 hover:text-primary">
              <X className="size-4" />
            </button>
          </div>
          <label className="block text-xs">
            <span className="mb-1 block text-muted-foreground uppercase tracking-widest text-[10px] font-mono">
              Image URL
            </span>
            <input
              className={field}
              value={editing.image_url ?? ""}
              onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
            />
          </label>
          <label className="block text-xs">
            <span className="mb-1 block text-muted-foreground uppercase tracking-widest text-[10px] font-mono">
              Caption
            </span>
            <input
              className={field}
              value={editing.caption ?? ""}
              onChange={(e) => setEditing({ ...editing, caption: e.target.value })}
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs">
              <span className="mb-1 block text-muted-foreground uppercase tracking-widest text-[10px] font-mono">
                Sort order
              </span>
              <input
                type="number"
                className={field}
                value={editing.sort_order ?? 0}
                onChange={(e) =>
                  setEditing({ ...editing, sort_order: Number(e.target.value) })
                }
              />
            </label>
            <label className="text-xs inline-flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                checked={editing.published !== false}
                onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
              />
              <span className="text-muted-foreground uppercase tracking-widest text-[10px] font-mono">
                Published
              </span>
            </label>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setEditing(null)}
              className="px-4 py-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
            <button
              onClick={() => save(editing)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-mono uppercase tracking-widest hover:brightness-110"
            >
              <Save className="size-3.5" /> Save
            </button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {(data ?? []).map((g) => (
          <div key={g.id} className="glass-panel overflow-hidden group relative">
            <div className="aspect-square bg-white/5">
              {g.image_url && (
                <img src={g.image_url} alt="" className="w-full h-full object-cover" />
              )}
            </div>
            <div className="p-2 flex items-center justify-between">
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground truncate">
                #{g.sort_order} {!g.published && "· draft"}
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => setEditing(g)}
                  className="text-[10px] font-mono uppercase tracking-widest text-primary hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(g.id)}
                  className="p-1 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {(data ?? []).length === 0 && (
          <p className="col-span-full text-xs font-mono uppercase tracking-widest text-muted-foreground/60">
            No images yet.
          </p>
        )}
      </div>
    </div>
  );
}
