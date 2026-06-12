import { SectionHeader } from "@/components/SectionHeader";
import { awardCategories } from "@/data/awards";

export function CategoriesSection({ limit }: { limit?: number }) {
  const categories = typeof limit === "number" ? awardCategories.slice(0, limit) : awardCategories;

  return (
    <section className="bg-pearl/[0.025] py-24">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Award Categories"
          title="Honors for every dimension of impact"
          description="From leadership and agriculture to technology, culture, education, and youth excellence, each category is designed to spotlight meaningful achievement."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ title, description, icon: Icon }) => (
            <article
              className="group luxury-border bg-obsidian/72 p-6 transition hover:-translate-y-1 hover:border-aureate/70 hover:shadow-gold"
              key={title}
            >
              <div className="grid size-12 place-items-center bg-aureate text-obsidian">
                <Icon size={24} />
              </div>
              <h3 className="mt-5 text-xl font-black uppercase text-pearl">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-champagne/72">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
