import { Vote } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";

export function CtaSection() {
  return (
    <section className="py-24">
      <div className="section-shell overflow-hidden bg-aureate p-8 text-obsidian shadow-gold md:p-12">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-obsidian/72">Nomination window open</p>
            <h2 className="mt-3 text-3xl font-black uppercase leading-tight md:text-5xl">
              Put a deserving changemaker on the MIBA stage
            </h2>
          </div>
          <ButtonLink href="/vote" icon={Vote} variant="secondary">
            Vote
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
