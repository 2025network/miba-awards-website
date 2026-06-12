import type { Metadata } from "next";
import { Camera } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { galleryItems } from "@/data/awards";
import { PageHero } from "@/sections/PageHero";

export const metadata: Metadata = {
  title: "Media Gallery | MIBA Awards",
  description: "Explore MIBA Awards ceremony moments, cultural highlights, winner interviews, and media coverage placeholders."
};

export default function GalleryPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Media Gallery"
        title="Ceremony moments, stories, and highlights"
        description="A visual media grid prepared for official photography, red carpet coverage, winner interviews, and partner moments."
      />
      <section className="section-shell py-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <article className="group overflow-hidden border border-champagne/14 bg-pearl/[0.04]" key={item}>
              <div className="grid aspect-[4/3] place-items-center bg-gradient-to-br from-aureate/25 via-obsidian to-burnish/30">
                <Camera className="text-aureate transition group-hover:scale-110" size={48} />
              </div>
              <div className="p-5">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-aureate">
                  Gallery {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 text-xl font-black text-pearl">{item}</h2>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
