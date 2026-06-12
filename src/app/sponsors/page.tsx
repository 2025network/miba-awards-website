import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/sections/PageHero";
import { SponsorsSection } from "@/sections/SponsorsSection";

export default function SponsorsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Sponsors & Partners"
        title="Partnerships for prestige, visibility, and impact"
        description="MIBA offers a high-value platform for brands and institutions aligned with African excellence and regional development."
      />
      <SponsorsSection />
    </PageShell>
  );
}
