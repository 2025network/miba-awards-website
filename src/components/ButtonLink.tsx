import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: "primary" | "secondary";
};

export function ButtonLink({ href, children, icon: Icon, variant = "primary" }: ButtonLinkProps) {
  const classes =
    variant === "primary"
      ? "bg-aureate text-obsidian shadow-gold hover:bg-champagne"
      : "border border-champagne/25 bg-pearl/5 text-pearl hover:border-aureate/70 hover:bg-aureate/10";

  return (
    <Link
      className={`inline-flex min-h-12 items-center justify-center gap-2 px-5 text-sm font-bold uppercase tracking-[0.18em] transition ${classes}`}
      href={href}
    >
      {Icon ? <Icon aria-hidden="true" size={18} /> : null}
      {children}
    </Link>
  );
}
