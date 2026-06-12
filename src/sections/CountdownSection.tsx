"use client";

import { CalendarDays } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

const ceremonyDate = new Date("2026-12-12T18:00:00+01:00").getTime();

function getTimeLeft() {
  const difference = Math.max(ceremonyDate - Date.now(), 0);
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());
  const units = useMemo(
    () => [
      { label: "Days", value: timeLeft.days },
      { label: "Hours", value: timeLeft.hours },
      { label: "Minutes", value: timeLeft.minutes },
      { label: "Seconds", value: timeLeft.seconds }
    ],
    [timeLeft]
  );

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="py-24">
      <div className="section-shell">
        <Reveal>
          <div className="glass-panel overflow-hidden p-6 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 border border-aureate/30 bg-aureate/10 px-3 py-2 text-xs font-black uppercase tracking-[0.24em] text-aureate">
                  <CalendarDays size={16} /> Next Awards Ceremony
                </div>
                <SectionHeader
                  align="left"
                  eyebrow="Countdown"
                  title="The golden night approaches"
                  description="MIBA is preparing a premium ceremony experience for honorees, partners, media, and communities across the Middle Belt and Africa."
                />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {units.map((unit) => (
                  <div className="border border-champagne/14 bg-obsidian/72 p-4 text-center" key={unit.label}>
                    <p className="gold-text text-4xl font-black md:text-5xl">{String(unit.value).padStart(2, "0")}</p>
                    <p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-champagne/64">{unit.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
