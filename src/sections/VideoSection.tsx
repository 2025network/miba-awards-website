import { Play, Radio } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

export function VideoSection() {
  return (
    <section className="bg-pearl/[0.025] py-24">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <Reveal>
            <SectionHeader
              align="left"
              eyebrow="Event Highlights"
              title="Future ceremony film and media moments"
              description="A cinematic placeholder for official event trailers, winner interviews, backstage moments, and partner highlights."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden border border-aureate/24 bg-obsidian shadow-gold">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(217,164,65,0.34),transparent_34%),linear-gradient(135deg,rgba(246,231,188,0.08),rgba(6,5,4,0.82))]" />
              <div className="relative grid aspect-video place-items-center p-8">
                <div className="absolute left-6 top-6 inline-flex items-center gap-2 border border-champagne/18 bg-obsidian/60 px-3 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-aureate backdrop-blur">
                  <Radio size={14} /> Coming Soon
                </div>
                <button className="grid size-20 place-items-center rounded-full border border-aureate/50 bg-aureate text-obsidian shadow-gold transition hover:scale-105" type="button" aria-label="Play future event highlights placeholder">
                  <Play fill="currentColor" size={34} />
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-aureate">MIBA Awards Film</p>
                  <h3 className="mt-2 text-2xl font-black uppercase text-pearl">Highlights placeholder</h3>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
