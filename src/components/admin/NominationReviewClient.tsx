"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, RefreshCw, XCircle } from "lucide-react";

type Nomination = {
  id: string;
  nomineeName: string;
  nomineeEmail: string;
  nomineePhone: string;
  reason: string;
  submittedBy: string;
  submitterEmail: string;
  status: string;
  createdAt: string;
  category: { name: string };
};

export function NominationReviewClient() {
  const [rows, setRows] = useState<Nomination[]>([]);
  const [message, setMessage] = useState("Loading nominations...");

  async function load() {
    const response = await fetch("/api/nominations");
    if (!response.ok) {
      setMessage("Login required or database unavailable.");
      return;
    }
    setRows((await response.json()) as Nomination[]);
    setMessage("");
  }

  useEffect(() => {
    void load();
  }, []);

  async function updateStatus(id: string, status: "APPROVED" | "REJECTED") {
    const response = await fetch(`/api/nominations/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    if (response.ok) await load();
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-black uppercase text-pearl">Nomination Review</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-champagne/68">Approve or reject public nominations. Approved nominations are promoted into approved nominee profiles.</p>
        </div>
        <button className="inline-flex min-h-11 items-center gap-2 border border-champagne/18 px-4 text-xs font-black uppercase tracking-[0.18em] text-aureate" onClick={load} type="button"><RefreshCw size={16} /> Refresh</button>
      </div>
      {message ? <p className="mt-6 text-sm text-aureate">{message}</p> : null}
      <div className="mt-8 grid gap-4">
        {rows.map((row) => (
          <article className="glass-panel p-5" key={row.id}>
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-aureate">{row.category.name} / {row.status}</p>
                <h2 className="mt-3 text-2xl font-black text-pearl">{row.nomineeName}</h2>
                <p className="mt-2 text-sm text-champagne/64">{row.nomineeEmail} / {row.nomineePhone}</p>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-champagne/76">{row.reason}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-champagne/52">Submitted by {row.submittedBy} / {row.submitterEmail}</p>
              </div>
              <div className="flex gap-3">
                <button className="inline-flex min-h-11 items-center gap-2 bg-aureate px-4 text-xs font-black uppercase tracking-[0.16em] text-obsidian" onClick={() => updateStatus(row.id, "APPROVED")} type="button"><CheckCircle2 size={17} /> Approve</button>
                <button className="inline-flex min-h-11 items-center gap-2 border border-red-300/40 px-4 text-xs font-black uppercase tracking-[0.16em] text-red-200" onClick={() => updateStatus(row.id, "REJECTED")} type="button"><XCircle size={17} /> Reject</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
