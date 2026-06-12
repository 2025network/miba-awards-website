import type { Metadata } from "next";
import { Suspense } from "react";
import { PageShell } from "@/components/PageShell";
import { PublicNomineeListing } from "@/components/forms/PublicNomineeListing";
import { PageHero } from "@/sections/PageHero";

export const metadata: Metadata = {
  title: "Vote | MIBA Awards",
  description: "Public voting for MIBA Awards nominees opens after nominations are reviewed and approved."
};

export default function VotePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Vote"
        title="Public voting for verified finalists"
        description="Browse approved nominees, review profiles, and cast votes tracked by voter email."
      />
      <section className="section-shell py-24">
        <Suspense fallback={<p className="text-aureate">Loading voting ballot...</p>}>
          <PublicNomineeListing approvedOnly />
        </Suspense>
      </section>
    </PageShell>
  );
}
