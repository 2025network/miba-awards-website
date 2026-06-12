import { PageShell } from "@/components/PageShell";
import { NomineeProfileClient } from "@/components/forms/NomineeProfileClient";
import { PageHero } from "@/sections/PageHero";

export default function NomineeProfilePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Nominee Profile"
        title="Honoree story and public voting record"
        description="A detailed profile view for nominee background, category, state, organization, and vote count."
      />
      <NomineeProfileClient />
    </PageShell>
  );
}
