"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Download, RefreshCw, Save, Trash2 } from "lucide-react";

type Category = { id: string; name: string };
type Judge = {
  id: string;
  fullName: string;
  email: string;
  photo: string | null;
  title: string;
  organization: string;
  biography: string;
  assignments: { category: Category }[];
  _count?: { scores: number };
};

const emptyForm = { fullName: "", email: "", photo: "", title: "", organization: "", biography: "", password: "" };

export function JudgesAdminClient() {
  const [judges, setJudges] = useState<Judge[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Record<string, string[]>>({});
  const [message, setMessage] = useState("Loading judges...");

  const selectedJudge = useMemo(() => judges.find((judge) => judge.id === editingId), [editingId, judges]);

  const load = useCallback(async () => {
    const [judgeResponse, categoryResponse] = await Promise.all([fetch("/api/judges"), fetch("/api/categories")]);
    if (!judgeResponse.ok || !categoryResponse.ok) {
      setMessage("Login required or database unavailable.");
      return;
    }
    const judgeData = (await judgeResponse.json()) as Judge[];
    const categoryData = (await categoryResponse.json()) as Category[];
    setJudges(judgeData);
    setCategories(categoryData);
    setAssignments(Object.fromEntries(judgeData.map((judge) => [judge.id, judge.assignments.map((assignment) => assignment.category.id)])));
    setMessage("");
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!selectedJudge) return;
    setForm({
      fullName: selectedJudge.fullName,
      email: selectedJudge.email,
      photo: selectedJudge.photo ?? "",
      title: selectedJudge.title,
      organization: selectedJudge.organization,
      biography: selectedJudge.biography,
      password: ""
    });
  }, [selectedJudge]);

  async function saveJudge(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch(editingId ? `/api/judges/${editingId}` : "/api/judges", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (response.ok) {
      setForm(emptyForm);
      setEditingId(null);
      await load();
      return;
    }
    setMessage("Unable to save judge. Check credentials and required fields.");
  }

  async function deleteJudge(id: string) {
    const response = await fetch(`/api/judges/${id}`, { method: "DELETE" });
    if (response.ok) await load();
  }

  async function saveAssignments(id: string) {
    const response = await fetch(`/api/judges/${id}/assignments`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryIds: assignments[id] ?? [] })
    });
    if (response.ok) await load();
  }

  function toggleAssignment(judgeId: string, categoryId: string) {
    setAssignments((current) => {
      const values = current[judgeId] ?? [];
      return {
        ...current,
        [judgeId]: values.includes(categoryId) ? values.filter((value) => value !== categoryId) : [...values, categoryId]
      };
    });
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-black uppercase text-pearl">Judge Management</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-champagne/68">Create judges, edit profiles, delete accounts, and assign categories for nominee evaluation.</p>
        </div>
        <button className="inline-flex min-h-11 items-center gap-2 border border-champagne/18 px-4 text-xs font-black uppercase tracking-[0.18em] text-aureate" onClick={load} type="button"><RefreshCw size={16} /> Refresh</button>
      </div>
      <form className="glass-panel mt-8 grid gap-4 p-5 lg:grid-cols-2" onSubmit={saveJudge}>
        {Object.entries({ fullName: "Full name", email: "Email", photo: "Photo URL", title: "Title", organization: "Organization", password: editingId ? "New password optional" : "Password" }).map(([key, label]) => (
          <input className="field" key={key} value={form[key as keyof typeof form]} onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))} placeholder={label} required={key !== "photo" && !(editingId && key === "password")} type={key === "email" ? "email" : key === "password" ? "password" : "text"} />
        ))}
        <textarea className="field textarea lg:col-span-2" value={form.biography} onChange={(event) => setForm((current) => ({ ...current, biography: event.target.value }))} placeholder="Biography" required />
        <button className="inline-flex min-h-12 items-center justify-center gap-2 bg-aureate px-5 text-sm font-black uppercase tracking-[0.18em] text-obsidian lg:col-span-2" type="submit"><Save size={18} /> {editingId ? "Update Judge" : "Create Judge"}</button>
      </form>
      {message ? <p className="mt-5 text-sm text-aureate">{message}</p> : null}
      <div className="mt-8 grid gap-5">
        {judges.map((judge) => (
          <article className="glass-panel p-5" key={judge.id}>
            <div className="flex flex-col justify-between gap-4 lg:flex-row">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-aureate">{judge.title}</p>
                <h2 className="mt-2 text-2xl font-black text-pearl">{judge.fullName}</h2>
                <p className="mt-1 text-sm text-champagne/62">{judge.email} / {judge.organization}</p>
                <p className="mt-3 text-sm text-champagne/62">Scores submitted: {judge._count?.scores ?? 0}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="min-h-10 border border-aureate/40 px-3 text-xs font-black uppercase tracking-[0.16em] text-aureate" onClick={() => setEditingId(judge.id)} type="button">Edit</button>
                <button className="inline-flex min-h-10 items-center gap-2 border border-red-300/40 px-3 text-xs font-black uppercase tracking-[0.16em] text-red-200" onClick={() => deleteJudge(judge.id)} type="button"><Trash2 size={16} /> Delete</button>
              </div>
            </div>
            <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <label className="flex items-center gap-3 border border-champagne/12 bg-pearl/[0.035] p-3 text-sm text-champagne/76" key={category.id}>
                  <input checked={(assignments[judge.id] ?? []).includes(category.id)} onChange={() => toggleAssignment(judge.id, category.id)} type="checkbox" />
                  {category.name}
                </label>
              ))}
            </div>
            <button className="mt-4 inline-flex min-h-10 items-center gap-2 bg-aureate px-3 text-xs font-black uppercase tracking-[0.16em] text-obsidian" onClick={() => saveAssignments(judge.id)} type="button"><Download size={16} /> Save Assignments</button>
          </article>
        ))}
      </div>
    </div>
  );
}
