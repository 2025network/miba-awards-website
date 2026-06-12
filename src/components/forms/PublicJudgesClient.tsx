"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Clock, Gavel } from "lucide-react";
import { fallbackJudges } from "@/data/awards";

type Judge = { id: string; fullName: string; photo: string | null; title: string; organization: string; biography: string; assignments: { category: { name: string } }[] };

export function PublicJudgesClient() {
  const [judges, setJudges] = useState<Judge[]>(fallbackJudges);
  const [usingFallback, setUsingFallback] = useState(true);

  const load = useCallback(async () => {
    const response = await fetch("/api/judges");
    if (!response.ok) {
      setJudges(fallbackJudges);
      setUsingFallback(true);
      return;
    }
    const data = (await response.json()) as Judge[];
    if (data.length) {
      setJudges(data);
      setUsingFallback(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <section className="section-shell py-24">
      {usingFallback ? (
        <div className="mb-8 flex flex-col gap-3 border border-aureate/24 bg-aureate/10 p-4 text-aureate sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold">The official judging panel will be published soon. Preview profiles are shown for launch readiness.</p>
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em]"><Clock size={15} /> Coming Soon</span>
        </div>
      ) : null}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {judges.map((judge) => (
          <article className="glass-panel p-6" key={judge.id}>
            <div className="grid size-20 place-items-center rounded-full border border-aureate/40 bg-aureate/12 text-2xl font-black text-aureate"><Gavel size={30} /></div>
            <p className="mt-6 text-xs font-black uppercase tracking-[0.24em] text-aureate">{judge.title}</p>
            <h2 className="mt-3 text-2xl font-black text-pearl">{judge.fullName}</h2>
            <p className="mt-1 text-sm text-champagne/58">{judge.organization}</p>
            <p className="mt-4 line-clamp-3 text-sm leading-7 text-champagne/72">{judge.biography}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-champagne/52">Categories: {judge.assignments.map((assignment) => assignment.category.name).join(", ") || "To be assigned"}</p>
            <Link className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-aureate" href={usingFallback ? "/ceremony" : `/judges/${judge.id}`}>{usingFallback ? "Panel Opening Soon" : "Judge Profile"} <ArrowRight size={16} /></Link>
          </article>
        ))}
      </div>
    </section>
  );
}
