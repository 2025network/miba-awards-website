import { PageShell } from "@/components/PageShell";
import { PublicJudgeProfileClient } from "@/components/forms/PublicJudgeProfileClient";
import { PageHero } from "@/sections/PageHero";

export default function JudgeProfilePage() {
  return (
    <PageShell>
      <PageHero eyebrow="Judge Profile" title="Jury profile and assigned categories" description="Explore the judge biography, organization, assigned categories, and scoring participation." />
      <PublicJudgeProfileClient />
    </PageShell>
  );
}
