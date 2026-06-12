"use client";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Award, Gavel } from "lucide-react";

type Judge = { fullName: string; title: string; organization: string; biography: string; assignments: { category: { name: string; description: string } }[]; _count?: { scores: number } };

export function PublicJudgeProfileClient() {
  const params = useParams<{ id: string }>();
  const [judge, setJudge] = useState<Judge | null>(null);
  const [message, setMessage] = useState("Loading judge profile...");

  const load = useCallback(async () => {
    const response = await fetch(`/api/judges/${params.id}`);
    if (!response.ok) {
      setMessage("Judge profile not found.");
      return;
    }
    setJudge((await response.json()) as Judge);
    setMessage("");
  }, [params.id]);

  useEffect(() => {
    void load();
  }, [load]);

  if (!judge) return <p className="section-shell py-24 text-aureate">{message}</p>;

  return (
    <section className="section-shell py-24">
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="glass-panel grid aspect-square place-items-center p-8"><Gavel className="text-aureate" size={96} /></div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-aureate">{judge.title}</p>
          <h1 className="gold-text mt-4 text-5xl font-black uppercase leading-none md:text-7xl">{judge.fullName}</h1>
          <p className="mt-4 text-lg text-champagne/68">{judge.organization}</p>
          <p className="mt-8 text-lg leading-8 text-champagne/78">{judge.biography}</p>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-champagne/52">Scores submitted: {judge._count?.scores ?? 0}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {judge.assignments.map((assignment) => (
              <article className="border border-champagne/14 bg-pearl/[0.04] p-5" key={assignment.category.name}>
                <Award className="text-aureate" size={22} />
                <h2 className="mt-3 text-xl font-black text-pearl">{assignment.category.name}</h2>
                <p className="mt-3 text-sm leading-7 text-champagne/72">{assignment.category.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
