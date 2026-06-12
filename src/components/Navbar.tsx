"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/lib/site";
import { LogoMark } from "./LogoMark";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-champagne/10 bg-obsidian/78 backdrop-blur-xl">
      <nav className="section-shell flex min-h-[76px] items-center justify-between gap-5">
        <LogoMark />
        <div className="hidden items-center gap-1 lg:flex">
          {siteConfig.navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                className={`px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] transition ${
                  active ? "text-aureate" : "text-champagne/72 hover:text-pearl"
                }`}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <Link
          className="hidden min-h-11 items-center bg-aureate px-4 text-xs font-black uppercase tracking-[0.18em] text-obsidian transition hover:bg-champagne lg:inline-flex"
          href="/nominate"
        >
          Nominate Now
        </Link>
        <button
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="grid size-11 place-items-center border border-champagne/20 bg-pearl/5 text-pearl lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>
      {open ? (
        <div className="border-t border-champagne/10 bg-obsidian/96 px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-md gap-1">
            {siteConfig.navItems.map((item) => (
              <Link
                className="px-3 py-3 text-sm font-bold uppercase tracking-[0.18em] text-champagne"
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
