import { SectionHeader } from "@/components/SectionHeader";
import { sponsors } from "@/data/awards";

export function SponsorsSection() {
  return (
    <section className="py-24">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Sponsors & Partners"
          title="Built with institutions that believe in African excellence"
          description="Sponsor placeholders are ready for official partner logos, media houses, corporate patrons, and development organizations."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sponsors.map((sponsor) => (
            <div
              className="grid min-h-28 place-items-center border border-champagne/14 bg-pearl/[0.035] px-4 text-center text-sm font-black uppercase tracking-[0.18em] text-champagne/74"
              key={sponsor}
            >
              {sponsor}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
