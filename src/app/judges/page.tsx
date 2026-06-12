import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { PublicJudgesClient } from "@/components/forms/PublicJudgesClient";
import { PageHero } from "@/sections/PageHero";

export const metadata: Metadata = {
  title: "Meet The Judges | MIBA Awards",
  description: "Meet the respected MIBA Awards judging panel reviewing nominees across assigned award categories."
};

export default function JudgesPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Meet The Judges" title="The jury behind MIBA excellence" description="Meet the respected professionals reviewing nominees and scoring excellence across assigned award categories." />
      <PublicJudgesClient />
    </PageShell>
  );
}
