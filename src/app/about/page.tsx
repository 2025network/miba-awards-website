import type { Metadata } from "next";
import { Award, Eye, Globe2, HandHeart, Landmark, Lightbulb, ShieldCheck, Sparkles, Target, Users } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { CtaSection } from "@/sections/CtaSection";
import { PageHero } from "@/sections/PageHero";

const values = [
  {
    title: "Integrity",
    description: "A credible process that values transparency, fairness, verification, and respect for every nominee.",
    icon: ShieldCheck
  },
  {
    title: "Impact",
    description: "Recognition is tied to meaningful contribution, measurable progress, and visible service to people and communities.",
    icon: HandHeart
  },
  {
    title: "Excellence",
    description: "MIBA celebrates people and institutions whose work raises standards across sectors and generations.",
    icon: Award
  },
  {
    title: "Innovation",
    description: "The platform spotlights bold ideas, practical solutions, creative industries, and future-facing leadership.",
    icon: Lightbulb
  }
];

const difference = [
  "A regional identity with continental ambition, focused on Nigeria&apos;s Middle Belt and Africa.",
  "A broad definition of excellence that includes public service, entrepreneurship, creativity, education, youth impact, healthcare, agriculture, media, and community development.",
  "A structured awards workflow with nominations, reviews, public voting, judging, scoring, and winner rankings.",
  "A premium black-and-gold awards experience designed to make local impact visible at a national and international standard."
];

export const metadata: Metadata = {
  title: "About MIBA | Middle Belt Impact Awards",
  description: "Learn about the mission, vision, values, and purpose of the Middle Belt Impact Awards across Nigeria and Africa."
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About MIBA"
        title="Middle Belt Impact Awards"
        description="MIBA celebrates excellence, leadership, innovation, service, creativity, and community transformation across Nigeria&apos;s Middle Belt and Africa."
      />

      <section className="section-shell py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-aureate">Who We Are</p>
            <h2 className="mt-4 text-4xl font-black uppercase leading-tight text-pearl md:text-5xl">
              A platform built to honor people who move communities forward
            </h2>
          </div>
          <div className="grid gap-5 text-base leading-8 text-champagne/76">
            <p>
              MIBA means Middle Belt Impact Awards. It is a prestigious awards platform created to recognize the people,
              organizations, and ideas shaping progress across Nigeria&apos;s Middle Belt and the wider African continent.
            </p>
            <p>
              The awards celebrate leaders, innovators, entrepreneurs, creators, public servants, educators, youths,
              healthcare contributors, media professionals, women of impact, and community changemakers whose work is
              creating lasting value.
            </p>
            <p>
              MIBA exists to document achievement, inspire higher standards, connect impact-driven people, and give the
              Middle Belt a premium stage worthy of its talent, resilience, culture, and contribution to Africa&apos;s future.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-pearl/[0.025] py-24">
        <div className="section-shell grid gap-5 md:grid-cols-2">
          <article className="glass-panel p-7">
            <Target className="text-aureate" size={32} />
            <h2 className="mt-5 text-3xl font-black uppercase text-pearl">Mission</h2>
            <p className="mt-4 text-sm leading-7 text-champagne/72">
              To identify, celebrate, and amplify exceptional individuals and institutions whose leadership, innovation,
              enterprise, creativity, service, and community impact are advancing Nigeria&apos;s Middle Belt and Africa.
            </p>
          </article>
          <article className="glass-panel p-7">
            <Eye className="text-aureate" size={32} />
            <h2 className="mt-5 text-3xl font-black uppercase text-pearl">Vision</h2>
            <p className="mt-4 text-sm leading-7 text-champagne/72">
              To become Africa&apos;s most respected impact-focused awards platform from the Middle Belt, setting a standard
              for credible recognition, regional pride, and continental excellence.
            </p>
          </article>
        </div>
      </section>

      <section className="section-shell py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-aureate">Core Values</p>
          <h2 className="mt-4 text-4xl font-black uppercase text-pearl md:text-5xl">The principles behind the platform</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {values.map(({ title, description, icon: Icon }) => (
            <article className="border border-champagne/14 bg-pearl/[0.04] p-6" key={title}>
              <Icon className="text-aureate" size={30} />
              <h3 className="mt-5 text-xl font-black uppercase text-pearl">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-champagne/72">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-pearl/[0.025] py-24">
        <div className="section-shell grid gap-10 lg:grid-cols-[1fr_1fr]">
          <article>
            <Landmark className="text-aureate" size={34} />
            <h2 className="mt-5 text-3xl font-black uppercase text-pearl md:text-4xl">Why MIBA Exists</h2>
            <p className="mt-5 text-sm leading-8 text-champagne/74">
              Too many stories of excellence from the Middle Belt remain under-recognized. MIBA exists to bring those
              stories into the light, preserve legacy, encourage service, and create a trusted platform where achievement
              is seen, measured, celebrated, and remembered.
            </p>
          </article>
          <article>
            <Globe2 className="text-aureate" size={34} />
            <h2 className="mt-5 text-3xl font-black uppercase text-pearl md:text-4xl">What Makes MIBA Different</h2>
            <div className="mt-5 grid gap-3">
              {difference.map((item) => (
                <div className="flex gap-3 border border-champagne/12 bg-obsidian/60 p-4" key={item}>
                  <Sparkles className="mt-1 shrink-0 text-aureate" size={18} />
                  <p className="text-sm leading-7 text-champagne/74">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="glass-panel p-7 md:p-10">
          <Users className="text-aureate" size={34} />
          <h2 className="mt-5 text-3xl font-black uppercase text-pearl md:text-4xl">Who MIBA Recognizes</h2>
          <p className="mt-5 text-sm leading-8 text-champagne/74">
            MIBA recognizes leaders, innovators, entrepreneurs, creators, public servants, educators, youths, women of
            impact, media professionals, healthcare contributors, agricultural builders, lifetime achievers, and community
            changemakers whose work reflects courage, excellence, responsibility, and measurable impact.
          </p>
        </div>
      </section>

      <CtaSection />
    </PageShell>
  );
}

