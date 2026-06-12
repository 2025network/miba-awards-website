type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({ eyebrow, title, description, align = "center" }: SectionHeaderProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-aureate">{eyebrow}</p>
      <h2 className="text-3xl font-black uppercase leading-tight text-pearl md:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-8 text-champagne/74 md:text-lg">{description}</p> : null}
    </div>
  );
}
