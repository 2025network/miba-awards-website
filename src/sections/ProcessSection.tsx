import { SectionHeader } from "@/components/SectionHeader";
import { nominationSteps } from "@/data/awards";

export function ProcessSection() {
  return (
    <section className="py-24">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Nomination Process"
          title="A clear path from nomination to ceremony"
          description="The process balances public participation with careful verification so the final recognition feels credible, transparent, and prestigious."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {nominationSteps.map((item) => (
            <article className="relative border-l border-aureate/45 bg-pearl/[0.04] p-6" key={item.step}>
              <span className="text-5xl font-black text-aureate/28">{item.step}</span>
              <h3 className="mt-4 text-lg font-black uppercase text-pearl">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-champagne/72">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
