"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { fallbackWinnerRankings } from "@/data/awards";

type WinnerData = { published: boolean; rankings: { nomineeId: string; nomineeName: string; categoryName: string; averageScore: number; judges: number }[] };

export function WinnerAnnouncement() {
  const [data, setData] = useState<WinnerData>({ published: false, rankings: fallbackWinnerRankings });
  const [usingFallback, setUsingFallback] = useState(true);

  useEffect(() => {
    fetch("/api/winners")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("fallback")))
      .then((value: WinnerData) => {
        if (value.rankings.length) {
          setData(value);
          setUsingFallback(false);
        }
      })
      .catch(() => {
        setData({ published: false, rankings: fallbackWinnerRankings });
        setUsingFallback(true);
      });
  }, []);

  const rankings = data.rankings;

  return (
    <section className="section-shell py-24">
      {!data.published ? <div className="glass-panel mb-8 p-6 text-center"><p className="text-xs font-black uppercase tracking-[0.28em] text-aureate">Scheduled Winner Announcement</p><h2 className="mt-3 text-3xl font-black text-pearl">Winner results are locked until the scheduled announcement time.</h2>{usingFallback ? <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-aureate"><Clock size={16} /> Preview rankings are shown until judging data is connected.</p> : null}</div> : null}
      <div className="grid gap-5">
        {rankings.map((winner, index) => (
          <article className="glass-panel p-6" key={winner.nomineeId}>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div><p className="text-xs font-black uppercase tracking-[0.24em] text-aureate">Rank #{index + 1} / {winner.categoryName}</p><h2 className="mt-3 text-3xl font-black text-pearl">{winner.nomineeName}</h2><p className="mt-2 text-sm text-champagne/62">Judges scored: {winner.judges}</p></div>
              <div className="min-w-60"><p className="gold-text text-right text-5xl font-black">{winner.averageScore}</p><div className="mt-3 h-3 bg-pearl/10"><div className="h-full bg-aureate" style={{ width: `${winner.averageScore}%` }} /></div></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
