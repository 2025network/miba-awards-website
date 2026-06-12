"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Clock, Eye, Vote } from "lucide-react";
import { fallbackNominees } from "@/data/awards";

type Nominee = {
  id: string;
  fullName: string;
  biography: string;
  organization: string | null;
  state: string;
  status: string;
  category: { name: string };
  _count: { votes: number };
};

export function PublicNomineeListing({ approvedOnly = false }: { approvedOnly?: boolean }) {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const [nominees, setNominees] = useState<Nominee[]>(fallbackNominees);
  const [message, setMessage] = useState(approvedOnly ? "Voting will open after nominations are approved." : "Nominee profiles are being prepared for launch.");
  const [email, setEmail] = useState("");
  const [usingFallback, setUsingFallback] = useState(true);

  const load = useCallback(async () => {
    const params = new URLSearchParams();
    if (approvedOnly) params.set("status", "APPROVED");
    if (categoryId) params.set("categoryId", categoryId);
    const response = await fetch(`/api/nominees${params.toString() ? `?${params.toString()}` : ""}`);
    if (!response.ok) {
      setNominees(fallbackNominees);
      setUsingFallback(true);
      setMessage(approvedOnly ? "Voting will open after nominations are approved." : "Nominee profiles are being prepared for launch.");
      return;
    }
    const data = (await response.json()) as Nominee[];
    if (data.length) {
      setNominees(data);
      setUsingFallback(false);
      setMessage("");
      return;
    }
    setNominees(fallbackNominees);
    setUsingFallback(true);
    setMessage(approvedOnly ? "Voting will open after nominations are approved." : "Nominee profiles are being prepared for launch.");
  }, [approvedOnly, categoryId]);

  useEffect(() => {
    void load();
  }, [load]);

  async function vote(nomineeId: string) {
    if (usingFallback) {
      setMessage("Voting will open after nominations are approved.");
      return;
    }
    if (!email) {
      setMessage("Enter your email before voting.");
      return;
    }
    const response = await fetch("/api/votes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nomineeId, voterEmail: email })
    });
    setMessage(response.ok ? "Vote recorded." : "Voting will open after nominations are approved.");
    if (response.ok) await load();
  }

  return (
    <div>
      <div className="mb-8 grid gap-4 md:grid-cols-[minmax(0,420px)_1fr] md:items-center">
        <input className="field" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email for public voting" type="email" disabled={usingFallback} />
        {message ? <p className="inline-flex items-center gap-2 border border-aureate/24 bg-aureate/10 px-4 py-3 text-sm font-semibold text-aureate"><Clock size={16} /> {message}</p> : null}
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {nominees.map((nominee) => (
          <article className="glass-panel p-6" key={nominee.id}>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-aureate">{nominee.category.name}</p>
            <h2 className="mt-4 text-2xl font-black text-pearl">{nominee.fullName}</h2>
            <p className="mt-2 text-sm text-champagne/58">{nominee.organization ?? "Independent"} / {nominee.state}</p>
            <p className="mt-4 line-clamp-3 text-sm leading-7 text-champagne/72">{nominee.biography}</p>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-champagne/52">Votes: {nominee._count.votes}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="inline-flex min-h-10 items-center gap-2 border border-champagne/18 px-3 text-xs font-black uppercase tracking-[0.16em] text-aureate" href={usingFallback ? "/nominate" : `/nominees/${nominee.id}`}><Eye size={16} /> {usingFallback ? "Opening Soon" : "Profile"}</Link>
              <button className="inline-flex min-h-10 items-center gap-2 bg-aureate px-3 text-xs font-black uppercase tracking-[0.16em] text-obsidian disabled:bg-champagne/35" onClick={() => vote(nominee.id)} type="button" disabled={usingFallback}><Vote size={16} /> Vote</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
