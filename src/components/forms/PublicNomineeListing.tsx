"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Eye, Vote } from "lucide-react";

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
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [message, setMessage] = useState("Loading nominees...");
  const [email, setEmail] = useState("");

  const load = useCallback(async () => {
    const params = new URLSearchParams();
    if (approvedOnly) params.set("status", "APPROVED");
    if (categoryId) params.set("categoryId", categoryId);
    const response = await fetch(`/api/nominees${params.toString() ? `?${params.toString()}` : ""}`);
    if (!response.ok) {
      setMessage("Nominees are unavailable until the database is connected.");
      return;
    }
    setNominees((await response.json()) as Nominee[]);
    setMessage("");
  }, [approvedOnly, categoryId]);

  useEffect(() => {
    void load();
  }, [load]);

  async function vote(nomineeId: string) {
    if (!email) {
      setMessage("Enter your email before voting.");
      return;
    }
    const response = await fetch("/api/votes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nomineeId, voterEmail: email })
    });
    setMessage(response.ok ? "Vote recorded." : "Vote could not be recorded. You may have already voted for this nominee.");
    if (response.ok) await load();
  }

  return (
    <div>
      <div className="mb-8 max-w-md">
        <input className="field" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email for public voting" type="email" />
      </div>
      {message ? <p className="mb-6 text-sm text-aureate">{message}</p> : null}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {nominees.map((nominee) => (
          <article className="glass-panel p-6" key={nominee.id}>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-aureate">{nominee.category.name}</p>
            <h2 className="mt-4 text-2xl font-black text-pearl">{nominee.fullName}</h2>
            <p className="mt-2 text-sm text-champagne/58">{nominee.organization ?? "Independent"} / {nominee.state}</p>
            <p className="mt-4 line-clamp-3 text-sm leading-7 text-champagne/72">{nominee.biography}</p>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-champagne/52">Votes: {nominee._count.votes}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="inline-flex min-h-10 items-center gap-2 border border-champagne/18 px-3 text-xs font-black uppercase tracking-[0.16em] text-aureate" href={`/nominees/${nominee.id}`}><Eye size={16} /> Profile</Link>
              <button className="inline-flex min-h-10 items-center gap-2 bg-aureate px-3 text-xs font-black uppercase tracking-[0.16em] text-obsidian" onClick={() => vote(nominee.id)} type="button"><Vote size={16} /> Vote</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
