"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, ClipboardCheck, LayoutDashboard, LogOut } from "lucide-react";
import { LogoMark } from "@/components/LogoMark";

const links = [
  { href: "/judge/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/judge/evaluate", label: "Evaluate", icon: ClipboardCheck },
  { href: "/judge/scores", label: "Scores", icon: BarChart3 }
];

export function JudgeShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/judge/logout", { method: "POST" });
    router.push("/judge/login");
  }

  return (
    <main className="min-h-screen bg-ceremony text-pearl">
      <div className="grid min-h-screen lg:grid-cols-[270px_1fr]">
        <aside className="border-b border-champagne/10 bg-obsidian/90 p-5 lg:border-b-0 lg:border-r">
          <LogoMark />
          <nav className="mt-8 grid gap-2">
            {links.map(({ href, label, icon: Icon }) => (
              <Link className={`flex min-h-11 items-center gap-3 px-3 text-sm font-bold uppercase tracking-[0.14em] transition ${pathname === href ? "bg-aureate text-obsidian" : "text-champagne/72 hover:bg-pearl/5 hover:text-aureate"}`} href={href} key={href}>
                <Icon size={18} /> {label}
              </Link>
            ))}
          </nav>
          <button className="mt-8 flex min-h-11 w-full items-center gap-3 border border-champagne/14 px-3 text-sm font-bold uppercase tracking-[0.14em] text-champagne/72 transition hover:border-aureate hover:text-aureate" onClick={logout} type="button"><LogOut size={18} /> Logout</button>
        </aside>
        <section className="p-4 sm:p-6 lg:p-8">{children}</section>
      </div>
    </main>
  );
}
