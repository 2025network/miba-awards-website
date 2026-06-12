"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Award, Building2, MapPin, Vote } from "lucide-react";

type Nominee = {
  id: string;
  fullName: string;
  photo: string | null;
  biography: string;
  organization: string | null;
  state: string;
  status: string;
  category: { name: string; description: string };
  _count: { votes: number };
};

export function NomineeProfileClient() {
  const params = useParams<{ id: string }>();
  const [nominee, setNominee] = useState<Nominee | null>(null);
  const [message, setMessage] = useState("Loading nominee profile...");

  useEffect(() => {
    fetch(`/api/nominees/${params.id}`)
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Nominee profile not found")))
      .then((data: Nominee) => {
        setNominee(data);
        setMessage("");
      })
      .catch((error: Error) => setMessage(error.message));
  }, [params.id]);

  if (!nominee) return <p className="section-shell py-24 text-aureate">{message}</p>;

  return (
    <section className="section-shell py-24">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="glass-panel grid aspect-square place-items-center p-8">
          <div className="grid size-32 place-items-center rounded-full border border-aureate/40 bg-aureate/12 text-4xl font-black text-aureate shadow-gold">
            {nominee.fullName.split(" ").map((part) => part[0]).join("")}
          </div>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-aureate">{nominee.category.name}</p>
          <h1 className="gold-text mt-4 text-5xl font-black uppercase leading-none md:text-7xl">{nominee.fullName}</h1>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="border border-champagne/14 bg-pearl/[0.04] p-4"><Building2 className="text-aureate" size={20} /><p className="mt-2 text-sm text-champagne/72">{nominee.organization ?? "Independent"}</p></div>
            <div className="border border-champagne/14 bg-pearl/[0.04] p-4"><MapPin className="text-aureate" size={20} /><p className="mt-2 text-sm text-champagne/72">{nominee.state}</p></div>
            <div className="border border-champagne/14 bg-pearl/[0.04] p-4"><Vote className="text-aureate" size={20} /><p className="mt-2 text-sm text-champagne/72">{nominee._count.votes} votes</p></div>
          </div>
          <p className="mt-8 text-lg leading-8 text-champagne/78">{nominee.biography}</p>
          <div className="mt-8 border-l border-aureate/50 bg-aureate/8 p-5">
            <Award className="text-aureate" size={24} />
            <p className="mt-3 text-sm leading-7 text-champagne/72">{nominee.category.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
