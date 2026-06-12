import { Award, Globe2, ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

const highlights = [
  {
    title: "Continental Standard",
    description: "A polished awards experience built for leaders, creators, founders, institutions, and partners.",
    icon: Globe2
  },
  {
    title: "Verified Impact",
    description: "Nominees are reviewed for credible achievement, social value, excellence, and regional relevance.",
    icon: ShieldCheck
  },
  {
    title: "Legacy Platform",
    description: "MIBA documents achievement and creates a premium stage for the Middle Belt's finest stories.",
    icon: Award
  }
];

export function AboutSection() {
  return (
    <section className="py-24">
      <div className="section-shell">
        <SectionHeader
          eyebrow="About MIBA"
          title="A prestigious platform for excellence from the heart of Africa"
          description="MIBA celebrates the people, ideas, institutions, and communities shaping growth across the Middle Belt and the continent."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {highlights.map(({ title, description, icon: Icon }) => (
            <article className="glass-panel p-6" key={title}>
              <Icon className="text-aureate" size={30} />
              <h3 className="mt-5 text-xl font-black uppercase text-pearl">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-champagne/72">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
