import { PageShell } from "@/components/PageShell";
import { CategoryBrowser } from "@/components/forms/CategoryBrowser";
import { PageHero } from "@/sections/PageHero";

export default function CategoriesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Award Categories"
        title="Recognition for leadership, ideas, enterprise, and culture"
        description="Browse live award categories, nomination volume, and nominee representation from the MIBA database."
      />
      <CategoryBrowser />
    </PageShell>
  );
}
