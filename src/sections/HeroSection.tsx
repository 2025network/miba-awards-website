"use client";

import { ArrowRight, CalendarDays, ScrollText, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { AfricaMap } from "@/components/AfricaMap";
import { ButtonLink } from "@/components/ButtonLink";
import { siteConfig } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-ceremony pt-24 sm:pt-28">
      <div className="hero-grid absolute inset-0 opacity-80" />
      <motion.div
        animate={{ opacity: [0.18, 0.42, 0.18], x: ["-18%", "8%", "-18%"] }}
        className="absolute left-0 top-0 h-full w-1/2 rotate-12 bg-gradient-to-b from-transparent via-aureate/24 to-transparent blur-3xl"
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        animate={{ opacity: [0.12, 0.32, 0.12], x: ["12%", "-10%", "12%"] }}
        className="absolute right-0 top-8 h-[86%] w-1/3 -rotate-12 bg-gradient-to-b from-transparent via-champagne/24 to-transparent blur-3xl"
        transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-aureate/12 blur-3xl" />
      <div className="section-shell relative grid min-h-[calc(100vh-36px)] items-center gap-10 py-12 sm:py-14 lg:grid-cols-[0.98fr_1.02fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 border border-aureate/30 bg-aureate/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-aureate sm:text-xs">
            <Sparkles size={16} /> Prestige. Impact. Legacy.
          </div>
          <h1 className="gold-text mt-5 text-5xl font-black uppercase leading-[0.93] sm:text-6xl md:text-7xl xl:text-8xl">
            {siteConfig.fullName}
          </h1>
          <p className="mt-6 max-w-2xl text-2xl font-semibold leading-tight text-pearl md:text-3xl">
            {siteConfig.tagline}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-champagne/78 md:text-lg">{siteConfig.description}</p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/nominate" icon={ScrollText}>
              Nominate Now
            </ButtonLink>
            <ButtonLink href="/categories" icon={ArrowRight} variant="secondary">
              View Categories
            </ButtonLink>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="border border-champagne/14 bg-pearl/[0.045] p-4 backdrop-blur">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-aureate">Ceremony Standard</p>
              <p className="mt-2 text-sm text-champagne/72">Continental production, elegant judging, and public celebration.</p>
            </div>
            <div className="border border-champagne/14 bg-pearl/[0.045] p-4 backdrop-blur">
              <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.24em] text-aureate">
                <CalendarDays size={14} /> Dec 12, 2026
              </p>
              <p className="mt-2 text-sm text-champagne/72">Next awards ceremony countdown now live.</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="relative min-h-[360px] sm:min-h-[500px] lg:min-h-[620px]"
        >
          <AfricaMap />
        </motion.div>
      </div>
    </section>
  );
}
