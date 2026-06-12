import { Award, MapPinned, Trophy, Users } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const stats = [
  { label: "Awards Categories", value: "11+", icon: Award },
  { label: "Nominees", value: "500+", icon: Users },
  { label: "Winners", value: "80+", icon: Trophy },
  { label: "States Represented", value: "19", icon: MapPinned }
];

export function StatsSection() {
  return (
    <section className="relative z-10 -mt-10 pb-16 md:-mt-16">
      <div className="section-shell">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }, index) => (
            <Reveal delay={index * 0.07} key={label}>
              <article className="min-h-36 border border-aureate/20 bg-obsidian/86 p-5 shadow-gold backdrop-blur-xl">
                <Icon className="text-aureate" size={28} />
                <p className="gold-text mt-5 text-4xl font-black leading-none md:text-5xl">{value}</p>
                <p className="mt-3 text-xs font-black uppercase tracking-[0.22em] text-champagne/68">{label}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
