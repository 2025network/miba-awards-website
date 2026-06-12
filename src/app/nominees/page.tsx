import { Suspense } from "react";
import { PageShell } from "@/components/PageShell";
import { PublicNomineeListing } from "@/components/forms/PublicNomineeListing";
import { PageHero } from "@/sections/PageHero";

export default function NomineesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Nominees"
        title="Public nominee listing"
        description="Explore nominees, view profiles, and cast a public vote with voter email tracking."
      />
      <section className="section-shell py-24">
        <Suspense fallback={<p className="text-aureate">Loading nominees...</p>}>
          <PublicNomineeListing />
        </Suspense>
      </section>
    </PageShell>
  );
}
