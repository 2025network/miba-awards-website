import Link from "next/link";

export function LogoMark() {
  return (
    <Link className="flex items-center gap-3" href="/" aria-label="MIBA Awards home">
      <span className="grid size-11 place-items-center border border-aureate/60 bg-aureate text-lg font-black text-obsidian shadow-gold">
        M
      </span>
      <span className="leading-none">
        <span className="block text-sm font-black uppercase tracking-[0.3em] text-pearl">MIBA</span>
        <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.32em] text-aureate">
          Awards
        </span>
      </span>
    </Link>
  );
}
