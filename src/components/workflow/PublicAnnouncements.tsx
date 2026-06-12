"use client";

import { useEffect, useState } from "react";

type Announcement = { id: string; title: string; content: string; createdAt: string };

export function PublicAnnouncements() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [message, setMessage] = useState("Loading announcements...");

  useEffect(() => {
    fetch("/api/announcements")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Announcements unavailable.")))
      .then((data: Announcement[]) => { setItems(data); setMessage(""); })
      .catch((error: Error) => setMessage(error.message));
  }, []);

  return (
    <section className="section-shell py-24">
      {message ? <p className="mb-6 text-sm text-aureate">{message}</p> : null}
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
