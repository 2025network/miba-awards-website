"use client";

import { useEffect, useState } from "react";

type Category = { id: string; name: string };

export function NominationForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then((response) => response.ok ? response.json() : [])
      .then((data: Category[]) => setCategories(data))
      .finally(() => setCategoriesLoaded(true));
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!categories.length) {
      setMessage("Categories are being prepared. Please check back soon.");
      return;
    }

    setLoading(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const body = Object.fromEntries(["nomineeName", "nomineeEmail", "nomineePhone", "categoryId", "reason", "submittedBy", "submitterEmail"].map((key) => [key, String(form.get(key) ?? "")]));
    const response = await fetch("/api/nominations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setLoading(false);
    if (response.ok) {
      event.currentTarget.reset();
      setMessage("Nomination submitted successfully. The MIBA review team will verify it.");
      return;
    }
    setMessage("Unable to submit nomination. Please confirm all fields and try again.");
  }

  const categoriesMissing = categoriesLoaded && categories.length === 0;

  return (
    <form className="glass-panel grid gap-4 p-6" onSubmit={submit}>
      <input className="field" name="nomineeName" placeholder="Nominee full name" required />
      <input className="field" name="nomineeEmail" placeholder="Nominee email" type="email" required />
      <input className="field" name="nomineePhone" placeholder="Nominee phone" required />
      <select className="field" name="categoryId" defaultValue="" disabled={categoriesMissing || !categoriesLoaded} required>
        <option value="" disabled>{categoriesLoaded ? "Select award category" : "Loading categories..."}</option>
        {categories.map((category) => <option className="bg-obsidian" key={category.id} value={category.id}>{category.name}</option>)}
      </select>
      {categoriesMissing ? (
        <p className="border border-aureate/30 bg-aureate/10 px-4 py-3 text-sm font-semibold text-aureate">
          Categories are being prepared. Please check back soon.
        </p>
      ) : null}
      <input className="field" name="submittedBy" placeholder="Your full name" required />
      <input className="field" name="submitterEmail" placeholder="Your email" type="email" required />
      <textarea className="field textarea" name="reason" placeholder="Why should this nominee be recognized?" required />
      {message ? <p className="text-sm text-aureate">{message}</p> : null}
      <button className="min-h-12 bg-aureate px-5 text-sm font-black uppercase tracking-[0.2em] text-obsidian transition hover:bg-champagne disabled:cursor-not-allowed disabled:bg-champagne/35" disabled={loading || categoriesMissing || !categoriesLoaded} type="submit">
        {loading ? "Submitting" : "Submit Nomination"}
      </button>
    </form>
  );
}
