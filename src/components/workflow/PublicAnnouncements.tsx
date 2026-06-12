"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { fallbackAnnouncements } from "@/data/awards";

type Announcement = { id: string; title: string; content: string; createdAt: string };

export function PublicAnnouncements() {
  const [items, setItems] = useState<Announcement[]>(fallbackAnnouncements);
  const [usingFallback, setUsingFallback] = useState(true);

  useEffect(() => {
    fetch("/api/announcements")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("fallback")))
      .then((data: Announcement[]) => {
        if (data.length) {
          setItems(data);
          setUsingFallback(false);
        }
      })
      .catch(() => {
        setItems(fallbackAnnouncements);
        setUsingFallback(true);
      });
  }, []);

  return (
    <section className="section-shell py-24">
      {usingFallback ? (
        <div className="mb-8 flex flex-col gap-3 border border-aureate/24 bg-aureate/10 p-4 text-aureate sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold">Official news updates will appear here when the database launches. Preview announcements are shown for now.</p>
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em]"><Clock size={15} /> Coming Soon</span>
        </div>
      ) : null}
      <div className="grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <article className="glass-panel p-6" key={item.id}>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-aureate">{new Date(item.createdAt).toLocaleDateString()}</p>
            <h2 className="mt-3 text-2xl font-black text-pearl">{item.title}</h2>
            <p className="mt-4 text-sm leading-7 text-champagne/72">{item.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
