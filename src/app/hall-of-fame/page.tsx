import { Suspense } from "react";
import { PageShell } from "@/components/PageShell";
import { PublicNomineeListing } from "@/components/forms/PublicNomineeListing";
import { PageHero } from "@/sections/PageHero";

export default function HallOfFamePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Hall of Fame"
        title="Approved honorees defining legacy"
        description="Approved nominees and winners are showcased here with public profile links and vote counts."
      />
      <section className="section-shell py-24">
        <Suspense fallback={<p className="text-aureate">Loading approved nominees...</p>}>
          <PublicNomineeListing approvedOnly />
        </Suspense>
      </section>
    </PageShell>
  );
}
