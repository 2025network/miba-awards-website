import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { PublicEventDetails } from "@/components/workflow/PublicEventDetails";
import { PageHero } from "@/sections/PageHero";

export const metadata: Metadata = {
  title: "Award Ceremony | MIBA Awards",
  description: "View MIBA Awards ceremony details, countdown, venue information, and opening status for nominations and voting."
};

export default function CeremonyPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Ceremony" title="Award ceremony details" description="Countdown, venue, event date, nomination status, voting status, and judge scoring status." />
      <PublicEventDetails />
    </PageShell>
  );
}
