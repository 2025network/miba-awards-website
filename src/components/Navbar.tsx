"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/lib/site";
import { LogoMark } from "./LogoMark";

function NavLink({ href, label, active, onClick }: { href: string; label: string; active: boolean; onClick?: () => void }) {
  return (
    <Link
      className={`px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] transition ${
        active ? "text-aureate" : "text-champagne/72 hover:text-pearl"
      }`}
      href={href}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreActive = siteConfig.moreNavItems.some((item) => pathname === item.href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-champagne/10 bg-obsidian/86 backdrop-blur-xl">
      <nav className="section-shell flex min-h-[76px] items-center justify-between gap-5">
        <LogoMark />
        <div className="hidden items-center gap-1 lg:flex">
          {siteConfig.mainNavItems.map((item) => (
            <NavLink active={pathname === item.href} href={item.href} key={item.href} label={item.label} />
          ))}
          <div className="relative">
            <button
              aria-expanded={moreOpen}
              className={`inline-flex items-center gap-1 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] transition ${
                moreActive ? "text-aureate" : "text-champagne/72 hover:text-pearl"
              }`}
              onClick={() => setMoreOpen((value) => !value)}
              onMouseEnter={() => setMoreOpen(true)}
              type="button"
            >
              More <ChevronDown size={14} />
            </button>
            {moreOpen ? (
              <div
                className="absolute right-0 top-full mt-3 grid w-56 gap-1 border border-champagne/14 bg-obsidian/96 p-3 shadow-gold backdrop-blur-xl"
                onMouseLeave={() => setMoreOpen(false)}
              >
                {siteConfig.moreNavItems.map((item) => (
                  <Link
                    className={`px-3 py-3 text-xs font-bold uppercase tracking-[0.14em] transition ${
                      pathname === item.href ? "text-aureate" : "text-champagne/72 hover:bg-pearl/5 hover:text-pearl"
                    }`}
                    href={item.href}
                    key={item.href}
                    onClick={() => setMoreOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
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
            {siteConfig.mainNavItems.map((item) => (
              <NavLink active={pathname === item.href} href={item.href} key={item.href} label={item.label} onClick={() => setOpen(false)} />
            ))}
            <div className="mt-3 border-t border-champagne/10 pt-3">
              <p className="px-3 pb-2 text-[10px] font-black uppercase tracking-[0.28em] text-aureate">More</p>
              <div className="grid gap-1 sm:grid-cols-2">
                {siteConfig.moreNavItems.map((item) => (
                  <Link
                    className={`px-3 py-3 text-sm font-bold uppercase tracking-[0.16em] ${
                      pathname === item.href ? "text-aureate" : "text-champagne/72"
                    }`}
                    href={item.href}
                    key={item.href}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
