import { PageShell } from "@/components/PageShell";
import { PublicAnnouncements } from "@/components/workflow/PublicAnnouncements";
import { PageHero } from "@/sections/PageHero";

export default function NewsPage() {
  return (
    <PageShell>
      <PageHero eyebrow="News" title="MIBA news and announcements" description="Official announcements for nominations, voting, ceremony details, sponsors, judges, and winners." />
      <PublicAnnouncements />
    </PageShell>
  );
}
