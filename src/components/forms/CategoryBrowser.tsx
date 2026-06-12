"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Category = { id: string; name: string; description: string; _count?: { nominees: number; nominations: number } };

export function CategoryBrowser() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [message, setMessage] = useState("Loading categories...");

  useEffect(() => {
    fetch("/api/categories")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Categories are unavailable until the database is connected.")))
      .then((data: Category[]) => {
        setCategories(data);
        setMessage("");
      })
      .catch((error: Error) => setMessage(error.message));
  }, []);

  return (
    <section className="section-shell py-24">
      {message ? <p className="mb-6 text-sm text-aureate">{message}</p> : null}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <article className="border border-champagne/14 bg-obsidian/72 p-6 transition hover:border-aureate/60 hover:shadow-gold" key={category.id}>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-aureate">Category</p>
            <h2 className="mt-4 text-2xl font-black text-pearl">{category.name}</h2>
            <p className="mt-3 text-sm leading-7 text-champagne/72">{category.description}</p>
            <p className="mt-5 text-xs uppercase tracking-[0.18em] text-champagne/52">Nominees: {category._count?.nominees ?? 0} / Nominations: {category._count?.nominations ?? 0}</p>
            <Link className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-aureate" href={`/nominees?category=${category.id}`}>View nominees <ArrowRight size={16} /></Link>
          </article>
        ))}
      </div>
    </section>
  );
}
