import type { Metadata } from "next";
import { Send } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageShell } from "@/components/PageShell";
import { NominationForm } from "@/components/forms/NominationForm";
import { PageHero } from "@/sections/PageHero";
import { ProcessSection } from "@/sections/ProcessSection";

export const metadata: Metadata = {
  title: "Nominate | MIBA Awards",
  description: "Prepare nominations for the Middle Belt Impact Awards across leadership, enterprise, technology, education, youth impact, and community development."
};

export default function NominatePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Nominate"
        title="Submit a story worthy of the MIBA stage"
        description="Nominations will officially open soon. Review the award categories and prepare the story of a leader, innovator, creator, or changemaker deserving recognition."
      />
      <section className="section-shell py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="inline-flex border border-aureate/30 bg-aureate/10 px-3 py-2 text-xs font-black uppercase tracking-[0.24em] text-aureate">Opening Soon</div>
            <p className="mt-6 text-xs font-black uppercase tracking-[0.32em] text-aureate">Nomination brief</p>
            <h2 className="mt-4 text-3xl font-black uppercase text-pearl">Tell us who deserves recognition</h2>
            <p className="mt-5 text-sm leading-7 text-champagne/72">
              Official nominations will open when the award database and category review process are activated. Until then,
              you can explore the categories and prepare nominee details, impact evidence, contact information, and a clear
              reason for recognition.
            </p>
            <div className="mt-8">
              <ButtonLink href="/categories" icon={Send} variant="secondary">Review Categories</ButtonLink>
            </div>
          </div>
          <NominationForm />
        </div>
      </section>
      <ProcessSection />
    </PageShell>
  );
}
