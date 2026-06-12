"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, CalendarCog, FolderKanban, Gavel, Handshake, LayoutDashboard, LogOut, Mail, Megaphone, ScrollText, Star, Trophy, Vote } from "lucide-react";
import { LogoMark } from "@/components/LogoMark";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/event-settings", label: "Event", icon: CalendarCog },
  { href: "/admin/announcements", label: "News", icon: Megaphone },
  { href: "/admin/email-logs", label: "Emails", icon: Mail },
  { href: "/admin/categories", label: "Categories", icon: FolderKanban },
  { href: "/admin/nominees", label: "Nominees", icon: Trophy },
  { href: "/admin/nominations", label: "Reviews", icon: ScrollText },
  { href: "/admin/votes", label: "Votes", icon: Vote },
  { href: "/admin/judges", label: "Judges", icon: Gavel },
  { href: "/admin/judge-scores", label: "Scores", icon: Star },
  { href: "/admin/sponsors", label: "Sponsors", icon: Handshake }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <main className="min-h-screen bg-ceremony text-pearl">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-champagne/10 bg-obsidian/90 p-5 lg:border-b-0 lg:border-r">
          <LogoMark />
          <nav className="mt-8 grid gap-2">
            {links.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link className={`flex min-h-11 items-center gap-3 px-3 text-sm font-bold uppercase tracking-[0.14em] transition ${active ? "bg-aureate text-obsidian" : "text-champagne/72 hover:bg-pearl/5 hover:text-aureate"}`} href={href} key={href}>
                  <Icon size={18} /> {label}
                </Link>
              );
            })}
          </nav>
          <button className="mt-8 flex min-h-11 w-full items-center gap-3 border border-champagne/14 px-3 text-sm font-bold uppercase tracking-[0.14em] text-champagne/72 transition hover:border-aureate hover:text-aureate" onClick={logout} type="button">
            <LogOut size={18} /> Logout
          </button>
        </aside>
        <section className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8 flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-aureate">
            <BarChart3 size={18} /> MIBA Administration
          </div>
          {children}
        </section>
      </div>
    </main>
  );
}
