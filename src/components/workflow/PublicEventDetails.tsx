"use client";

import { CalendarDays, Clock, MapPin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { fallbackEvent } from "@/data/awards";

type Workflow = { event: { title: string; venue: string; eventDate: string; registrationClose: string; votingClose: string } | null; nominationStatus: string; votingStatus: string; judgeScoringStatus: string };

function remaining(target?: string) {
  const diff = target ? Math.max(new Date(target).getTime() - Date.now(), 0) : 0;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  };
}

export function PublicEventDetails() {
  const [workflow, setWorkflow] = useState<Workflow>({ event: fallbackEvent, nominationStatus: "OPENING SOON", votingStatus: "OPENING SOON", judgeScoringStatus: "OPENING SOON" });
  const [usingFallback, setUsingFallback] = useState(true);
  const [timeLeft, setTimeLeft] = useState(remaining(fallbackEvent.eventDate));
  const units = useMemo(() => Object.entries(timeLeft), [timeLeft]);

  useEffect(() => {
    fetch("/api/workflow/status")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("fallback")))
      .then((data: Workflow) => {
        if (data.event) {
          setWorkflow(data);
          setUsingFallback(false);
          setTimeLeft(remaining(data.event.eventDate));
        }
      })
      .catch(() => {
        setWorkflow({ event: fallbackEvent, nominationStatus: "OPENING SOON", votingStatus: "OPENING SOON", judgeScoringStatus: "OPENING SOON" });
        setUsingFallback(true);
      });
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(remaining(workflow.event?.eventDate)), 1000);
    return () => window.clearInterval(timer);
  }, [workflow.event?.eventDate]);

  const event = workflow.event;

  return (
    <section className="section-shell py-24">
      {usingFallback ? (
        <div className="mb-8 flex flex-col gap-3 border border-aureate/24 bg-aureate/10 p-4 text-aureate sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold">Official event settings will appear when the database launches. Preview ceremony details are shown for now.</p>
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em]"><Clock size={15} /> Coming Soon</span>
        </div>
      ) : null}
      <div className="glass-panel p-6 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-aureate">Award Ceremony Details</p>
            <h2 className="mt-4 text-4xl font-black uppercase text-pearl">{event?.title ?? "MIBA Awards Ceremony"}</h2>
            <p className="mt-5 flex items-center gap-2 text-champagne/72"><MapPin size={18} /> {event?.venue ?? "Venue to be announced"}</p>
            <p className="mt-3 flex items-center gap-2 text-champagne/72"><CalendarDays size={18} /> {event ? new Date(event.eventDate).toLocaleString() : "Date to be announced"}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3"><span className="border border-champagne/14 p-3 text-center text-xs font-black uppercase tracking-[0.18em] text-aureate">Nominations {workflow.nominationStatus}</span><span className="border border-champagne/14 p-3 text-center text-xs font-black uppercase tracking-[0.18em] text-aureate">Voting {workflow.votingStatus}</span><span className="border border-champagne/14 p-3 text-center text-xs font-black uppercase tracking-[0.18em] text-aureate">Scoring {workflow.judgeScoringStatus}</span></div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {units.map(([label, value]) => <div className="border border-champagne/14 bg-obsidian/72 p-4 text-center" key={label}><p className="gold-text text-4xl font-black">{String(value).padStart(2, "0")}</p><p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-champagne/64">{label}</p></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
