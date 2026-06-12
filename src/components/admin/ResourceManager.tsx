"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, RefreshCw, Trash2 } from "lucide-react";

type Option = { id: string; name: string };
type Field = { name: string; label: string; type?: "text" | "textarea" | "select"; options?: Option[]; required?: boolean };
type Row = Record<string, unknown> & { id: string };

type Props = {
  title: string;
  description: string;
  endpoint: string;
  fields: Field[];
  columns: string[];
};

export function ResourceManager({ title, description, endpoint, fields, columns }: Props) {
  const [rows, setRows] = useState<Row[]>([]);
  const [message, setMessage] = useState("Loading...");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setMessage("Loading...");
    const response = await fetch(endpoint);
    if (!response.ok) {
      setMessage("Login required or database unavailable.");
      return;
    }
    const data = (await response.json()) as Row[];
    setRows(data);
    setMessage("");
  }, [endpoint]);

  useEffect(() => {
    void load();
  }, [load]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const form = new FormData(event.currentTarget);
    const body = Object.fromEntries(fields.map((field) => [field.name, String(form.get(field.name) ?? "")]));
    const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setSaving(false);
    if (response.ok) {
      event.currentTarget.reset();
      await load();
      return;
    }
    setMessage("Unable to save. Check admin login and required fields.");
  }

  async function remove(id: string) {
    const response = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    if (response.ok) await load();
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-black uppercase text-pearl">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-champagne/68">{description}</p>
        </div>
        <button className="inline-flex min-h-11 items-center gap-2 border border-champagne/18 px-4 text-xs font-black uppercase tracking-[0.18em] text-aureate" onClick={load} type="button"><RefreshCw size={16} /> Refresh</button>
      </div>
      <form className="glass-panel mt-8 grid gap-4 p-5 lg:grid-cols-2" onSubmit={submit}>
        {fields.map((field) => (
          field.type === "textarea" ? (
            <textarea className="field textarea lg:col-span-2" key={field.name} name={field.name} placeholder={field.label} required={field.required} />
          ) : field.type === "select" ? (
            <select className="field" key={field.name} name={field.name} required={field.required} defaultValue="">
              <option value="" disabled>{field.label}</option>
              {field.options?.map((option) => <option className="bg-obsidian" key={option.id} value={option.id}>{option.name}</option>)}
            </select>
          ) : (
            <input className="field" key={field.name} name={field.name} placeholder={field.label} required={field.required} />
          )
        ))}
        <button className="inline-flex min-h-12 items-center justify-center gap-2 bg-aureate px-5 text-sm font-black uppercase tracking-[0.18em] text-obsidian lg:col-span-2" disabled={saving} type="submit"><Plus size={18} /> {saving ? "Saving" : "Create"}</button>
      </form>
      {message ? <p className="mt-5 text-sm text-aureate">{message}</p> : null}
      <div className="mt-8 overflow-x-auto border border-champagne/12">
        <table className="w-full min-w-[760px] border-collapse bg-obsidian/72 text-left text-sm">
          <thead className="bg-pearl/[0.06] text-xs uppercase tracking-[0.18em] text-aureate">
            <tr>{columns.map((column) => <th className="p-4" key={column}>{column}</th>)}<th className="p-4">Actions</th></tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr className="border-t border-champagne/10" key={row.id}>
                {columns.map((column) => <td className="p-4 text-champagne/78" key={column}>{String(row[column] ?? row[column.toLowerCase()] ?? "")}</td>)}
                <td className="p-4"><button className="inline-flex items-center gap-2 text-red-300" onClick={() => remove(row.id)} type="button"><Trash2 size={16} /> Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
