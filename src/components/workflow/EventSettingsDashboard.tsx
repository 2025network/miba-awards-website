"use client";

import { useCallback, useEffect, useState } from "react";

type EventData = {
  title: string;
  venue: string;
  eventDate: string;
  registrationOpen: string;
  registrationClose: string;
  votingOpen: string;
  votingClose: string;
  judgeScoringOpen: string;
  judgeScoringClose: string;
  winnerAnnouncementAt: string;
};

type WorkflowStatus = {
  nominationStatus: string;
  votingStatus: string;
  judgeScoringStatus: string;
};

function toInput(value: string | Date | null | undefined) {
  if (!value) return "";
  const date = new Date(value);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

function defaults(): EventData {
  const now = new Date();
  const event = new Date(now.getFullYear(), 11, 12, 18, 0);
  return {
    title: "MIBA Awards Ceremony",
    venue: "Grand Ballroom, Middle Belt Civic Centre",
    eventDate: toInput(event),
    registrationOpen: toInput(now),
    registrationClose: toInput(new Date(event.getTime() - 1000 * 60 * 60 * 24 * 30)),
    votingOpen: toInput(new Date(event.getTime() - 1000 * 60 * 60 * 24 * 21)),
    votingClose: toInput(new Date(event.getTime() - 1000 * 60 * 60 * 24 * 7)),
    judgeScoringOpen: toInput(new Date(event.getTime() - 1000 * 60 * 60 * 24 * 14)),
    judgeScoringClose: toInput(new Date(event.getTime() - 1000 * 60 * 60 * 24 * 3)),
    winnerAnnouncementAt: toInput(event)
  };
}

export function EventSettingsDashboard() {
  const [form, setForm] = useState<EventData>(defaults);
  const [status, setStatus] = useState<WorkflowStatus | null>(null);
  const [message, setMessage] = useState("Loading event settings...");

  const load = useCallback(async () => {
    const [eventResponse, statusResponse] = await Promise.all([fetch("/api/events"), fetch("/api/workflow/status")]);
    const event = eventResponse.ok ? await eventResponse.json() : null;
    const workflow = statusResponse.ok ? await statusResponse.json() : null;
    if (event) {
      setForm({
        title: event.title,
        venue: event.venue,
        eventDate: toInput(event.eventDate),
        registrationOpen: toInput(event.registrationOpen),
        registrationClose: toInput(event.registrationClose),
        votingOpen: toInput(event.votingOpen),
        votingClose: toInput(event.votingClose),
        judgeScoringOpen: toInput(event.judgeScoringOpen),
        judgeScoringClose: toInput(event.judgeScoringClose),
        winnerAnnouncementAt: toInput(event.winnerAnnouncementAt)
      });
    }
    setStatus(workflow);
    setMessage("");
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function setField(key: keyof EventData, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function openNow(type: "nominations" | "voting" | "scoring") {
    const now = toInput(new Date());
    const future = toInput(new Date(Date.now() + 1000 * 60 * 60 * 24 * 14));
    if (type === "nominations") setForm((current) => ({ ...current, registrationOpen: now, registrationClose: future }));
    if (type === "voting") setForm((current) => ({ ...current, votingOpen: now, votingClose: future }));
    if (type === "scoring") setForm((current) => ({ ...current, judgeScoringOpen: now, judgeScoringClose: future }));
  }

  function closeNow(type: "nominations" | "voting" | "scoring") {
    const past = toInput(new Date(Date.now() - 1000 * 60));
    if (type === "nominations") setForm((current) => ({ ...current, registrationClose: past }));
    if (type === "voting") setForm((current) => ({ ...current, votingClose: past }));
    if (type === "scoring") setForm((current) => ({ ...current, judgeScoringClose: past }));
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setMessage(response.ok ? "Event settings saved." : "Unable to save event settings.");
    if (response.ok) await load();
  }

  return (
    <div>
      <h1 className="text-4xl font-black uppercase text-pearl">Event Settings</h1>
      <p className="mt-3 text-sm text-champagne/68">Manage ceremony details, nomination windows, voting windows, judge scoring windows, and winner announcement timing.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <article className="glass-panel p-5"><p className="text-xs uppercase tracking-[0.22em] text-champagne/52">Nominations</p><p className="gold-text mt-2 text-3xl font-black">{status?.nominationStatus ?? "--"}</p></article>
        <article className="glass-panel p-5"><p className="text-xs uppercase tracking-[0.22em] text-champagne/52">Voting</p><p className="gold-text mt-2 text-3xl font-black">{status?.votingStatus ?? "--"}</p></article>
        <article className="glass-panel p-5"><p className="text-xs uppercase tracking-[0.22em] text-champagne/52">Judge Scoring</p><p className="gold-text mt-2 text-3xl font-black">{status?.judgeScoringStatus ?? "--"}</p></article>
      </div>
      <form className="glass-panel mt-8 grid gap-4 p-5 lg:grid-cols-2" onSubmit={save}>
        <input className="field" value={form.title} onChange={(event) => setField("title", event.target.value)} placeholder="Event title" required />
        <input className="field" value={form.venue} onChange={(event) => setField("venue", event.target.value)} placeholder="Venue" required />
        {(["eventDate", "registrationOpen", "registrationClose", "votingOpen", "votingClose", "judgeScoringOpen", "judgeScoringClose", "winnerAnnouncementAt"] as const).map((key) => <label className="text-xs font-black uppercase tracking-[0.16em] text-champagne/58" key={key}>{key}<input className="field mt-2" value={form[key]} onChange={(event) => setField(key, event.target.value)} type="datetime-local" required={key !== "winnerAnnouncementAt"} /></label>)}
        <div className="grid gap-3 lg:col-span-2 md:grid-cols-3">
          <button className="min-h-11 border border-aureate/40 px-3 text-xs font-black uppercase tracking-[0.16em] text-aureate" onClick={() => openNow("nominations")} type="button">Open Nominations</button>
          <button className="min-h-11 border border-aureate/40 px-3 text-xs font-black uppercase tracking-[0.16em] text-aureate" onClick={() => openNow("voting")} type="button">Open Voting</button>
          <button className="min-h-11 border border-aureate/40 px-3 text-xs font-black uppercase tracking-[0.16em] text-aureate" onClick={() => openNow("scoring")} type="button">Open Scoring</button>
          <button className="min-h-11 border border-red-300/40 px-3 text-xs font-black uppercase tracking-[0.16em] text-red-200" onClick={() => closeNow("nominations")} type="button">Close Nominations</button>
          <button className="min-h-11 border border-red-300/40 px-3 text-xs font-black uppercase tracking-[0.16em] text-red-200" onClick={() => closeNow("voting")} type="button">Close Voting</button>
          <button className="min-h-11 border border-red-300/40 px-3 text-xs font-black uppercase tracking-[0.16em] text-red-200" onClick={() => closeNow("scoring")} type="button">Close Scoring</button>
        </div>
        <button className="min-h-12 bg-aureate px-5 text-sm font-black uppercase tracking-[0.18em] text-obsidian lg:col-span-2" type="submit">Save Event Settings</button>
      </form>
      {message ? <p className="mt-5 text-sm text-aureate">{message}</p> : null}
    </div>
  );
}
