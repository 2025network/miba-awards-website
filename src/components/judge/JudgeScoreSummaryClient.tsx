"use client";

import { useCallback, useEffect, useState } from "react";

type Summary = { id: string; nomineeName: string; categoryName: string; totalScore: number; comments: string | null };

export function JudgeScoreSummaryClient() {
  const [rows, setRows] = useState<Summary[]>([]);
  const [message, setMessage] = useState("Loading score summary...");

  const load = useCallback(async () => {
    const response = await fetch("/api/judge/summary");
    if (!response.ok) {
      setMessage("Judge login required.");
      return;
    }
    setRows((await response.json()) as Summary[]);
    setMessage("");
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div>
      <h1 className="text-4xl font-black uppercase text-pearl">Score Summary</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-champagne/68">Your submitted scores ranked by total score with visual bars and comments.</p>
      {message ? <p className="mt-6 text-sm text-aureate">{message}</p> : null}
      <div className="mt-8 grid gap-4">
        {rows.map((row, index) => (
          <article className="glass-panel p-5" key={row.id}>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-aureate">Rank #{index + 1} / {row.categoryName}</p>
                <h2 className="mt-2 text-2xl font-black text-pearl">{row.nomineeName}</h2>
                <p className="mt-3 text-sm leading-7 text-champagne/72">{row.comments ?? "No comments submitted."}</p>
              </div>
              <div className="min-w-64">
                <p className="gold-text text-right text-5xl font-black">{row.totalScore}</p>
                <div className="mt-3 h-3 bg-pearl/10"><div className="h-full bg-aureate" style={{ width: `${row.totalScore}%` }} /></div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
