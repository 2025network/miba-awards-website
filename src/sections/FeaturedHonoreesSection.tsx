import { Crown, Sparkles, Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

const honorees = [
  {
    name: "Amina Dogo",
    role: "Digital Governance Builder",
    award: "Technology Award",
    impact: "Built civic tools connecting public institutions with young innovators across multiple states.",
    initials: "AD"
  },
  {
    name: "Dr. Luka Pam",
    role: "STEM Education Advocate",
    award: "Education Award",
    impact: "Expanded mentorship, scholarships, and laboratory access for underserved secondary schools.",
    initials: "LP"
  },
  {
    name: "Zainab Audu",
    role: "Agro Enterprise Founder",
    award: "Entrepreneurship Award",
    impact: "Scaled a women-led processing venture into a regional employer and export-ready brand.",
    initials: "ZA"
  }
];

export function FeaturedHonoreesSection() {
  return (
    <section className="bg-pearl/[0.025] py-24">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Featured Honorees"
            title="Stories already shaping the MIBA legacy"
            description="A high-impact showcase for standout leaders, builders, creators, and community champions selected for premium homepage visibility."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {honorees.map((honoree, index) => (
            <Reveal delay={index * 0.08} key={honoree.name}>
              <article className="group relative min-h-full overflow-hidden border border-champagne/14 bg-obsidian/80 p-6 transition hover:-translate-y-1 hover:border-aureate/70 hover:shadow-gold">
                <div className="absolute right-0 top-0 h-28 w-28 bg-aureate/10 blur-2xl transition group-hover:bg-aureate/20" />
                <div className="relative flex items-center justify-between gap-4">
                  <div className="grid size-20 place-items-center rounded-full border border-aureate/42 bg-gradient-to-br from-aureate/34 to-obsidian text-2xl font-black text-aureate shadow-gold">
                    {honoree.initials}
                  </div>
                  <Crown className="text-aureate" size={30} />
                </div>
                <p className="relative mt-6 text-xs font-black uppercase tracking-[0.24em] text-aureate">{honoree.award}</p>
                <h3 className="relative mt-3 text-2xl font-black text-pearl">{honoree.name}</h3>
                <p className="relative mt-1 text-sm font-semibold text-champagne/68">{honoree.role}</p>
                <p className="relative mt-5 text-sm leading-7 text-champagne/72">{honoree.impact}</p>
                <div className="relative mt-6 flex gap-1 text-aureate">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star fill="currentColor" key={star} size={15} />
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-2 border border-aureate/24 bg-aureate/10 px-4 py-3 text-xs font-black uppercase tracking-[0.22em] text-aureate">
            <Sparkles size={16} /> More honorees announced soon
          </div>
        </div>
      </div>
    </section>
  );
}
