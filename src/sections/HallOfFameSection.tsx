import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { winners } from "@/data/awards";

export function HallOfFameSection({ preview = false }: { preview?: boolean }) {
  const visibleWinners = preview ? winners.slice(0, 3) : winners;

  return (
    <section className="bg-pearl/[0.025] py-24">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            align="left"
            eyebrow="Hall of Fame"
            title="Winners and legacy makers"
            description="A premium showcase of honorees whose achievements continue to shape enterprise, society, culture, and opportunity."
          />
          {preview ? (
            <Link
              className="inline-flex min-h-11 items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-aureate"
              href="/hall-of-fame"
            >
              Full Hall <ArrowRight size={18} />
            </Link>
          ) : null}
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {visibleWinners.map((winner) => (
            <article className="glass-panel overflow-hidden" key={`${winner.name}-${winner.year}`}>
              <div className="grid aspect-[4/3] place-items-center bg-gradient-to-br from-aureate/30 via-burnish/25 to-obsidian">
                <span className="grid size-20 place-items-center rounded-full border border-pearl/28 bg-obsidian/48 text-2xl font-black text-aureate">
                  {winner.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-aureate">{winner.category}</p>
                <h3 className="mt-3 text-xl font-black text-pearl">{winner.name}</h3>
                <p className="mt-1 text-sm text-champagne/58">{winner.year}</p>
                <p className="mt-4 text-sm leading-7 text-champagne/72">{winner.achievement}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
