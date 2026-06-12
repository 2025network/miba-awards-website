import { Facebook, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { LogoMark } from "./LogoMark";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Categories", href: "/categories" },
  { label: "Nominate", href: "/nominate" },
  { label: "Vote", href: "/vote" },
  { label: "Contact", href: "/contact" }
];

export function Footer() {
  return (
    <footer className="border-t border-champagne/10 bg-[#050403] py-12">
      <div className="section-shell grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <LogoMark />
          <p className="mt-5 max-w-md text-sm leading-7 text-champagne/72">{siteConfig.description}</p>
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.24em] text-aureate">Explore</h3>
          <div className="mt-5 grid gap-3">
            {footerLinks.map((link) => (
              <Link className="text-sm text-champagne/72 transition hover:text-aureate" href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.24em] text-aureate">Social</h3>
          <div className="mt-5 flex gap-3">
            {[Facebook, Instagram, Twitter, Linkedin, Mail].map((Icon, index) => (
              <a
                aria-label={`MIBA social link ${index + 1}`}
                className="grid size-10 place-items-center border border-champagne/16 bg-pearl/5 text-champagne transition hover:border-aureate hover:text-aureate"
                href={index === 4 ? "mailto:hello@mibaawards.africa" : "#"}
                key={Icon.displayName ?? index}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.22em] text-champagne/50">
            Middle Belt Awards © 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
