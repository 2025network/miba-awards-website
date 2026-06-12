"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Award, ClipboardCheck, Star } from "lucide-react";

type JudgeMe = {
  fullName: string;
  title: string;
  organization: string;
  assignments: { category: { id: string; name: string; description: string } }[];
  scores: { id: string }[];
};

export function JudgeDashboardClient() {
  const [judge, setJudge] = useState<JudgeMe | null>(null);
  const [message, setMessage] = useState("Loading judge dashboard...");

  const load = useCallback(async () => {
    const response = await fetch("/api/judge/me");
    if (!response.ok) {
      setMessage("Judge login required.");
      return;
    }
    setJudge((await response.json()) as JudgeMe);
    setMessage("");
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (!judge) return <p className="text-aureate">{message}</p>;

  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.28em] text-aureate">Judge Dashboard</p>
      <h1 className="mt-3 text-4xl font-black uppercase text-pearl">Welcome, {judge.fullName}</h1>
      <p className="mt-3 text-sm text-champagne/68">{judge.title} / {judge.organization}</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <article className="glass-panel p-6"><Award className="text-aureate" size={28} /><p className="gold-text mt-5 text-5xl font-black">{judge.assignments.length}</p><p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-champagne/58">Assigned Categories</p></article>
        <article className="glass-panel p-6"><ClipboardCheck className="text-aureate" size={28} /><p className="gold-text mt-5 text-5xl font-black">{judge.scores.length}</p><p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-champagne/58">Evaluations</p></article>
        <article className="glass-panel p-6"><Star className="text-aureate" size={28} /><p className="gold-text mt-5 text-5xl font-black">100</p><p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-champagne/58">Max Score</p></article>
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {judge.assignments.map((assignment) => (
          <article className="border border-champagne/14 bg-pearl/[0.04] p-5" key={assignment.category.id}>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-aureate">Assigned Category</p>
            <h2 className="mt-3 text-2xl font-black text-pearl">{assignment.category.name}</h2>
            <p className="mt-3 text-sm leading-7 text-champagne/72">{assignment.category.description}</p>
          </article>
        ))}
      </div>
      <Link className="mt-8 inline-flex min-h-12 items-center gap-2 bg-aureate px-5 text-sm font-black uppercase tracking-[0.18em] text-obsidian" href="/judge/evaluate">Start Evaluation <ArrowRight size={18} /></Link>
    </div>
  );
}
