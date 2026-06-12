"use client";

import { useCallback, useEffect, useState } from "react";
import { Download, RefreshCw } from "lucide-react";

type Score = {
  id: string;
  judgeName: string;
  nomineeName: string;
  categoryName: string;
  scoreLeadership: number;
  scoreInnovation: number;
  scoreImpact: number;
  scoreInfluence: number;
  scoreOverall: number;
  totalScore: number;
  comments: string | null;
};

export function JudgeScoresAdminClient() {
  const [scores, setScores] = useState<Score[]>([]);
  const [message, setMessage] = useState("Loading judge scores...");

  const load = useCallback(async () => {
    const response = await fetch("/api/judge-scores");
    if (!response.ok) {
      setMessage("Login required or database unavailable.");
      return;
    }
    setScores((await response.json()) as Score[]);
    setMessage("");
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const ranked = [...scores].sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-black uppercase text-pearl">Judge Scores</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-champagne/68">Review score summaries, comments, rankings, and export score data as CSV.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="inline-flex min-h-11 items-center gap-2 border border-champagne/18 px-4 text-xs font-black uppercase tracking-[0.18em] text-aureate" onClick={load} type="button"><RefreshCw size={16} /> Refresh</button>
          <a className="inline-flex min-h-11 items-center gap-2 bg-aureate px-4 text-xs font-black uppercase tracking-[0.18em] text-obsidian" href="/api/judge-scores/export"><Download size={16} /> Export CSV</a>
        </div>
      </div>
      {message ? <p className="mt-6 text-sm text-aureate">{message}</p> : null}
      <div className="mt-8 grid gap-4">
        {ranked.map((score, index) => (
          <article className="glass-panel p-5" key={score.id}>
            <div className="grid gap-5 lg:grid-cols-[1fr_340px] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-aureate">Rank #{index + 1} / {score.categoryName}</p>
                <h2 className="mt-2 text-2xl font-black text-pearl">{score.nomineeName}</h2>
                <p className="mt-1 text-sm text-champagne/62">Judge: {score.judgeName}</p>
                <p className="mt-4 text-sm leading-7 text-champagne/72">{score.comments ?? "No comments submitted."}</p>
              </div>
              <div>
                <div className="flex items-end justify-between gap-4"><span className="text-xs font-black uppercase tracking-[0.22em] text-champagne/52">Total</span><span className="gold-text text-5xl font-black">{score.totalScore}</span></div>
                {["Leadership", "Innovation", "Impact", "Influence", "Overall"].map((label) => {
                  const key = `score${label}` as keyof Score;
                  const value = Number(score[key]);
                  return (
                    <div className="mt-3" key={label}>
                      <div className="mb-1 flex justify-between text-[11px] uppercase tracking-[0.18em] text-champagne/58"><span>{label}</span><span>{value}/20</span></div>
                      <div className="h-2 bg-pearl/10"><div className="h-full bg-aureate" style={{ width: `${(value / 20) * 100}%` }} /></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
