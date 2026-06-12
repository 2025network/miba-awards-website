import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { WinnerAnnouncement } from "@/components/workflow/WinnerAnnouncement";
import { PageHero } from "@/sections/PageHero";

export const metadata: Metadata = {
  title: "Winners | MIBA Awards",
  description: "View scheduled MIBA winner announcements and preview rankings generated from judge scoring."
};

export default function WinnersPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Winners" title="Winner announcement and rankings" description="Automatically generated winner rankings based on judge score averages and scheduled announcement timing." />
      <WinnerAnnouncement />
    </PageShell>
  );
}
