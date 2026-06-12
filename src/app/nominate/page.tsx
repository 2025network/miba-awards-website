import { Send } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { PageShell } from "@/components/PageShell";
import { NominationForm } from "@/components/forms/NominationForm";
import { PageHero } from "@/sections/PageHero";
import { ProcessSection } from "@/sections/ProcessSection";

export default function NominatePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Nominate"
        title="Submit a story worthy of the MIBA stage"
        description="Send public nominations directly into the MIBA review system for admin approval or rejection."
      />
      <section className="section-shell py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-aureate">Nomination brief</p>
            <h2 className="mt-4 text-3xl font-black uppercase text-pearl">Tell us who deserves recognition</h2>
            <p className="mt-5 text-sm leading-7 text-champagne/72">
              Submitted nominations are stored with a pending status until the MIBA admin team reviews, approves, or rejects them.
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
