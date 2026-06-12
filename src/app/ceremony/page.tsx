import { PageShell } from "@/components/PageShell";
import { PublicEventDetails } from "@/components/workflow/PublicEventDetails";
import { PageHero } from "@/sections/PageHero";

export default function CeremonyPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Ceremony" title="Award ceremony details" description="Countdown, venue, event date, nomination status, voting status, and judge scoring status." />
      <PublicEventDetails />
    </PageShell>
  );
}
