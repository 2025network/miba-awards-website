"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { sponsors } from "@/data/awards";

const sponsorLoop = [...sponsors, ...sponsors];

export function SponsorsCarouselSection() {
  return (
    <section className="py-24">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Sponsors Carousel"
            title="A premium partner stage"
            description="A continuous sponsor showcase for official brand partners, media partners, institutions, and patrons."
          />
        </Reveal>
      </div>
      <div className="mt-12 overflow-hidden border-y border-champagne/10 bg-pearl/[0.03] py-6">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          className="flex w-max gap-4 px-4"
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          {sponsorLoop.map((sponsor, index) => (
            <div
              className="grid h-24 w-56 shrink-0 place-items-center border border-champagne/14 bg-obsidian/82 px-4 text-center text-sm font-black uppercase tracking-[0.2em] text-champagne/78 shadow-insetGold"
              key={`${sponsor}-${index}`}
            >
              {sponsor}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
