"use client";

import { useCallback, useEffect, useState } from "react";
import { Save } from "lucide-react";

type ScoreRecord = { scoreLeadership: number; scoreInnovation: number; scoreImpact: number; scoreInfluence: number; scoreOverall: number; comments: string | null };
type Nominee = {
  id: string;
  fullName: string;
  biography: string;
  organization: string | null;
  state: string;
  category: { name: string };
  judgeScores: ScoreRecord[];
};

const criteria = [
  ["scoreLeadership", "Leadership"],
  ["scoreInnovation", "Innovation"],
  ["scoreImpact", "Impact"],
  ["scoreInfluence", "Influence"],
  ["scoreOverall", "Overall"]
] as const;

export function JudgeEvaluationClient() {
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [message, setMessage] = useState("Loading assigned nominees...");
  const [forms, setForms] = useState<Record<string, Record<string, string>>>({});

  const load = useCallback(async () => {
    const response = await fetch("/api/judge/scores");
    if (!response.ok) {
      setMessage("Judge login required or no assignments available.");
      return;
    }
    const data = (await response.json()) as Nominee[];
    setNominees(data);
    setForms(Object.fromEntries(data.map((nominee) => {
      const existing = nominee.judgeScores[0];
      return [nominee.id, {
        scoreLeadership: String(existing?.scoreLeadership ?? 0),
        scoreInnovation: String(existing?.scoreInnovation ?? 0),
        scoreImpact: String(existing?.scoreImpact ?? 0),
        scoreInfluence: String(existing?.scoreInfluence ?? 0),
        scoreOverall: String(existing?.scoreOverall ?? 0),
        comments: existing?.comments ?? ""
      }];
    })));
    setMessage("");
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function update(nomineeId: string, key: string, value: string) {
    setForms((current) => ({ ...current, [nomineeId]: { ...current[nomineeId], [key]: value } }));
  }

  function total(nomineeId: string) {
    return criteria.reduce((sum, [key]) => sum + Number(forms[nomineeId]?.[key] ?? 0), 0);
  }

  async function submit(nomineeId: string) {
    const response = await fetch("/api/judge/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nomineeId, ...forms[nomineeId] })
    });
    setMessage(response.ok ? "Score saved." : "Score could not be saved.");
    if (response.ok) await load();
  }

  return (
    <div>
      <h1 className="text-4xl font-black uppercase text-pearl">Nominee Evaluation</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-champagne/68">Score each assigned nominee from 0 to 20 across leadership, innovation, impact, influence, and overall strength. Total score is calculated automatically.</p>
      {message ? <p className="mt-6 text-sm text-aureate">{message}</p> : null}
      <div className="mt-8 grid gap-5">
        {nominees.map((nominee) => (
          <article className="glass-panel p-5" key={nominee.id}>
            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-aureate">{nominee.category.name}</p>
                <h2 className="mt-3 text-2xl font-black text-pearl">{nominee.fullName}</h2>
                <p className="mt-2 text-sm text-champagne/58">{nominee.organization ?? "Independent"} / {nominee.state}</p>
                <p className="mt-4 text-sm leading-7 text-champagne/72">{nominee.biography}</p>
                <p className="gold-text mt-6 text-5xl font-black">{total(nominee.id)}/100</p>
              </div>
              <div className="grid gap-4">
                {criteria.map(([key, label]) => {
                  const value = Number(forms[nominee.id]?.[key] ?? 0);
                  return (
                    <label className="block" key={key}>
                      <div className="mb-2 flex justify-between text-xs font-black uppercase tracking-[0.18em] text-champagne/62"><span>{label}</span><span>{value}/20</span></div>
                      <input className="w-full accent-aureate" max="20" min="0" onChange={(event) => update(nominee.id, key, event.target.value)} type="range" value={value} />
                    </label>
                  );
                })}
                <textarea className="field textarea" onChange={(event) => update(nominee.id, "comments", event.target.value)} placeholder="Judge comments" value={forms[nominee.id]?.comments ?? ""} />
                <button className="inline-flex min-h-12 items-center justify-center gap-2 bg-aureate px-5 text-sm font-black uppercase tracking-[0.18em] text-obsidian" onClick={() => submit(nominee.id)} type="button"><Save size={18} /> Save Score</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
