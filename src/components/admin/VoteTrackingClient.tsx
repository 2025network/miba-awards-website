"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

type VoteRow = {
  id: string;
  voterEmail: string;
  createdAt: string;
  nominee: { fullName: string; category: { name: string } };
};

export function VoteTrackingClient() {
  const [rows, setRows] = useState<VoteRow[]>([]);
  const [message, setMessage] = useState("Loading votes...");

  async function load() {
    const response = await fetch("/api/votes");
    if (!response.ok) {
      setMessage("Login required or database unavailable.");
      return;
    }
    setRows((await response.json()) as VoteRow[]);
    setMessage("");
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-black uppercase text-pearl">Vote Tracking</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-champagne/68">Monitor voter emails, nominee names, categories, and vote timestamps.</p>
        </div>
        <button className="inline-flex min-h-11 items-center gap-2 border border-champagne/18 px-4 text-xs font-black uppercase tracking-[0.18em] text-aureate" onClick={load} type="button"><RefreshCw size={16} /> Refresh</button>
      </div>
      {message ? <p className="mt-6 text-sm text-aureate">{message}</p> : null}
      <div className="mt-8 overflow-x-auto border border-champagne/12">
        <table className="w-full min-w-[760px] border-collapse bg-obsidian/72 text-left text-sm">
          <thead className="bg-pearl/[0.06] text-xs uppercase tracking-[0.18em] text-aureate"><tr><th className="p-4">Nominee</th><th className="p-4">Category</th><th className="p-4">Voter Email</th><th className="p-4">Created</th></tr></thead>
          <tbody>
            {rows.map((row) => (
              <tr className="border-t border-champagne/10" key={row.id}>
                <td className="p-4 text-pearl">{row.nominee.fullName}</td>
                <td className="p-4 text-champagne/78">{row.nominee.category.name}</td>
                <td className="p-4 text-champagne/78">{row.voterEmail}</td>
                <td className="p-4 text-champagne/58">{new Date(row.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
