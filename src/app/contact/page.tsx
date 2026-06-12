import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/sections/PageHero";

export const metadata: Metadata = {
  title: "Contact | MIBA Awards",
  description: "Contact the Middle Belt Impact Awards team for nominations, sponsorship, media, partnership, and event enquiries."
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Connect with the MIBA Awards team"
        description="Reach out for nominations, partnerships, media enquiries, sponsorship packages, and event information."
      />
      <section className="section-shell py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            {[
              { icon: Mail, title: "Email", detail: "hello@mibaawards.africa" },
              { icon: Phone, title: "Phone", detail: "+234 000 000 0000" },
              { icon: MapPin, title: "Region", detail: "Middle Belt, Nigeria and Africa" }
            ].map(({ icon: Icon, title, detail }) => (
              <div className="flex gap-4 border border-champagne/14 bg-pearl/[0.04] p-5" key={title}>
                <Icon className="text-aureate" size={24} />
                <div>
                  <h2 className="font-black uppercase text-pearl">{title}</h2>
                  <p className="mt-1 text-sm text-champagne/72">{detail}</p>
                </div>
              </div>
            ))}
          </div>
          <form className="glass-panel grid gap-4 p-6">
            <input className="field" placeholder="Full name" />
            <input className="field" placeholder="Email address" />
            <input className="field" placeholder="Subject" />
            <textarea className="field textarea" placeholder="Message" />
            <button
              className="min-h-12 bg-aureate px-5 text-sm font-black uppercase tracking-[0.2em] text-obsidian transition hover:bg-champagne"
              type="button"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
