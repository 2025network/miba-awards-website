"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw, Trash2 } from "lucide-react";

type Announcement = { id: string; title: string; content: string; published: boolean; createdAt: string };

export function AnnouncementManager() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [form, setForm] = useState({ title: "", content: "", published: true });
  const [message, setMessage] = useState("Loading announcements...");

  const load = useCallback(async () => {
    const response = await fetch("/api/announcements");
    if (!response.ok) {
      setMessage("Admin login required or database unavailable.");
      return;
    }
    setItems((await response.json()) as Announcement[]);
    setMessage("");
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function create(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch("/api/announcements", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (response.ok) {
      setForm({ title: "", content: "", published: true });
      await load();
    }
  }

  async function remove(id: string) {
    const response = await fetch(`/api/announcements/${id}`, { method: "DELETE" });
    if (response.ok) await load();
  }

  async function toggle(item: Announcement) {
    const response = await fetch(`/api/announcements/${item.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...item, published: !item.published }) });
    if (response.ok) await load();
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div><h1 className="text-4xl font-black uppercase text-pearl">Announcement Manager</h1><p className="mt-3 text-sm text-champagne/68">Create public news, ceremony updates, winner notices, and voting announcements.</p></div>
        <button className="inline-flex min-h-11 items-center gap-2 border border-champagne/18 px-4 text-xs font-black uppercase tracking-[0.18em] text-aureate" onClick={load} type="button"><RefreshCw size={16} /> Refresh</button>
      </div>
      <form className="glass-panel mt-8 grid gap-4 p-5" onSubmit={create}>
        <input className="field" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="Announcement title" required />
        <textarea className="field textarea" value={form.content} onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))} placeholder="Announcement content" required />
        <label className="flex items-center gap-3 text-sm text-champagne/72"><input checked={form.published} onChange={(event) => setForm((current) => ({ ...current, published: event.target.checked }))} type="checkbox" /> Published</label>
        <button className="min-h-12 bg-aureate px-5 text-sm font-black uppercase tracking-[0.18em] text-obsidian" type="submit">Create Announcement</button>
      </form>
      {message ? <p className="mt-5 text-sm text-aureate">{message}</p> : null}
      <div className="mt-8 grid gap-4">
        {items.map((item) => (
          <article className="glass-panel p-5" key={item.id}>
            <div className="flex flex-col justify-between gap-4 md:flex-row">
              <div><p className="text-xs font-black uppercase tracking-[0.22em] text-aureate">{item.published ? "Published" : "Draft"}</p><h2 className="mt-2 text-2xl font-black text-pearl">{item.title}</h2><p className="mt-3 text-sm leading-7 text-champagne/72">{item.content}</p></div>
              <div className="flex gap-3"><button className="min-h-10 border border-aureate/40 px-3 text-xs font-black uppercase tracking-[0.16em] text-aureate" onClick={() => toggle(item)} type="button">{item.published ? "Unpublish" : "Publish"}</button><button className="inline-flex min-h-10 items-center gap-2 border border-red-300/40 px-3 text-xs font-black uppercase tracking-[0.16em] text-red-200" onClick={() => remove(item.id)} type="button"><Trash2 size={16} /> Delete</button></div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
