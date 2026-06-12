"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Gavel } from "lucide-react";

type Judge = { id: string; fullName: string; photo: string | null; title: string; organization: string; biography: string; assignments: { category: { name: string } }[] };

export function PublicJudgesClient() {
  const [judges, setJudges] = useState<Judge[]>([]);
  const [message, setMessage] = useState("Loading judges...");

  const load = useCallback(async () => {
    const response = await fetch("/api/judges");
    if (!response.ok) {
      setMessage("Judges are unavailable until the database is connected.");
      return;
    }
    setJudges((await response.json()) as Judge[]);
    setMessage("");
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <section className="section-shell py-24">
      {message ? <p className="mb-6 text-sm text-aureate">{message}</p> : null}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {judges.map((judge) => (
          <article className="glass-panel p-6" key={judge.id}>
            <div className="grid size-20 place-items-center rounded-full border border-aureate/40 bg-aureate/12 text-2xl font-black text-aureate"><Gavel size={30} /></div>
            <p className="mt-6 text-xs font-black uppercase tracking-[0.24em] text-aureate">{judge.title}</p>
            <h2 className="mt-3 text-2xl font-black text-pearl">{judge.fullName}</h2>
            <p className="mt-1 text-sm text-champagne/58">{judge.organization}</p>
            <p className="mt-4 line-clamp-3 text-sm leading-7 text-champagne/72">{judge.biography}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-champagne/52">Categories: {judge.assignments.map((assignment) => assignment.category.name).join(", ") || "To be assigned"}</p>
            <Link className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-aureate" href={`/judges/${judge.id}`}>Judge Profile <ArrowRight size={16} /></Link>
          </article>
        ))}
      </div>
    </section>
  );
}
