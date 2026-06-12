"use client";

import { useEffect, useState } from "react";
import { Award, CalendarDays, FolderKanban, Handshake, Mail, Megaphone, ScrollText, Trophy, Vote } from "lucide-react";

type Stats = {
  activeEvent: string;
  totalNominations: number;
  approvedNominees: number;
  pendingReviews: number;
  votesReceived: number;
  sponsors: number;
  categories: number;
  judges: number;
  judgeScores: number;
  emailLogs: number;
  announcements: number;
  votingStatus: string;
  nominationStatus: string;
  judgeScoringStatus: string;
};

const cards = [
  { key: "activeEvent", label: "Active Event", icon: CalendarDays },
  { key: "totalNominations", label: "Total Nominations", icon: ScrollText },
  { key: "approvedNominees", label: "Approved Nominees", icon: Trophy },
  { key: "pendingReviews", label: "Pending Reviews", icon: Award },
  { key: "votesReceived", label: "Total Votes", icon: Vote },
  { key: "judges", label: "Total Judges", icon: Trophy },
  { key: "sponsors", label: "Total Sponsors", icon: Handshake },
  { key: "categories", label: "Categories", icon: FolderKanban },
  { key: "judgeScores", label: "Judge Scores", icon: Vote },
  { key: "emailLogs", label: "Email Logs", icon: Mail },
  { key: "announcements", label: "Announcements", icon: Megaphone },
  { key: "votingStatus", label: "Voting Status", icon: Vote },
  { key: "nominationStatus", label: "Nomination Status", icon: ScrollText }
] as const;

export function DashboardClient() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [message, setMessage] = useState("Loading dashboard...");

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Please login as admin")))
      .then((data: Stats) => {
        setStats(data);
        setMessage("");
      })
      .catch((error: Error) => setMessage(error.message));
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-black uppercase text-pearl">Dashboard</h1>
      <p className="mt-3 text-sm text-champagne/68">Live administration statistics for communications, events, nominations, voting, sponsors, and judge scoring.</p>
      {message ? <p className="mt-6 text-sm text-aureate">{message}</p> : null}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(({ key, label, icon: Icon }) => {
          const value = stats ? stats[key] : "--";
          const isText = typeof value === "string" && Number.isNaN(Number(value));
          return (
            <article className="glass-panel p-6" key={key}>
              <Icon className="text-aureate" size={28} />
              <p className={`mt-6 font-black ${isText ? "text-2xl text-pearl" : "gold-text text-5xl"}`}>{value}</p>
              <p className="mt-3 text-xs font-black uppercase tracking-[0.22em] text-champagne/62">{label}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
