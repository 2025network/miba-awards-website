"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), password: form.get("password") })
    });
    setLoading(false);
    if (response.ok) {
      router.push("/admin/dashboard");
      return;
    }
    const data = (await response.json()) as { message?: string };
    setMessage(data.message ?? "Login failed");
  }

  return (
    <form className="glass-panel mx-auto grid max-w-md gap-4 p-6" onSubmit={submit}>
      <div className="grid size-14 place-items-center bg-aureate text-obsidian"><Lock size={26} /></div>
      <h1 className="text-3xl font-black uppercase text-pearl">Admin Login</h1>
      <p className="text-sm leading-7 text-champagne/72">Access nominations, nominees, votes, sponsors, and dashboard statistics.</p>
      <input className="field" name="email" placeholder="Admin email" type="email" required />
      <input className="field" name="password" placeholder="Password" type="password" required />
      {message ? <p className="text-sm text-red-300">{message}</p> : null}
      <button className="min-h-12 bg-aureate px-5 text-sm font-black uppercase tracking-[0.2em] text-obsidian" disabled={loading} type="submit">
        {loading ? "Signing In" : "Sign In"}
      </button>
      <p className="text-xs text-champagne/52">Default: admin@mibaawards.africa / miba-admin-2026</p>
    </form>
  );
}
