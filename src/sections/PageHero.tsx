type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ceremony pt-32">
      <div className="hero-grid absolute inset-0 opacity-60" />
      <div className="section-shell relative py-20">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.4em] text-aureate">{eyebrow}</p>
        <h1 className="gold-text max-w-4xl text-5xl font-black uppercase leading-none md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-champagne/78">{description}</p>
      </div>
    </section>
  );
}
