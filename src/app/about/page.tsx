import { PageShell } from "@/components/PageShell";
import { AboutSection } from "@/sections/AboutSection";
import { CtaSection } from "@/sections/CtaSection";
import { PageHero } from "@/sections/PageHero";

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About MIBA"
        title="A continental awards platform with a Middle Belt soul"
        description="MIBA elevates excellence across leadership, business, culture, creativity, innovation, education, agriculture, and community transformation."
      />
      <AboutSection />
      <section className="section-shell pb-24">
        <div className="grid gap-5 md:grid-cols-3">
          {["Integrity", "Excellence", "Cultural Pride"].map((value) => (
            <article className="border border-champagne/14 bg-pearl/[0.04] p-6" key={value}>
              <h2 className="text-2xl font-black uppercase text-aureate">{value}</h2>
              <p className="mt-3 text-sm leading-7 text-champagne/72">
                Every MIBA experience is designed to feel credible, elegant, inclusive, and worthy of the people it
                celebrates.
              </p>
            </article>
          ))}
        </div>
      </section>
      <CtaSection />
    </PageShell>
  );
}
