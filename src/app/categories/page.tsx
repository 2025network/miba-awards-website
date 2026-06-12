import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { CategoryBrowser } from "@/components/forms/CategoryBrowser";
import { PageHero } from "@/sections/PageHero";

export const metadata: Metadata = {
  title: "Award Categories | MIBA Awards",
  description: "Explore the 12 Middle Belt Impact Awards categories for leadership, enterprise, technology, agriculture, education, youth impact, healthcare, media, and more."
};

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
