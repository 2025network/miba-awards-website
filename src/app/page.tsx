import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { AboutSection } from "@/sections/AboutSection";
import { CategoriesSection } from "@/sections/CategoriesSection";
import { CountdownSection } from "@/sections/CountdownSection";
import { CtaSection } from "@/sections/CtaSection";
import { FeaturedHonoreesSection } from "@/sections/FeaturedHonoreesSection";
import { HallOfFameSection } from "@/sections/HallOfFameSection";
import { HeroSection } from "@/sections/HeroSection";
import { ProcessSection } from "@/sections/ProcessSection";
import { SponsorsCarouselSection } from "@/sections/SponsorsCarouselSection";
import { SponsorsSection } from "@/sections/SponsorsSection";
import { StatsSection } from "@/sections/StatsSection";
import { VideoSection } from "@/sections/VideoSection";

export const metadata: Metadata = {
  title: "MIBA Awards | Middle Belt Impact Awards",
  description: "Middle Belt Impact Awards celebrates excellence, leadership, innovation, entrepreneurship, culture, education, youth impact, and community changemakers across Nigeria's Middle Belt and Africa."
};

export default function Home() {
  return (
    <PageShell>
      <HeroSection />
      <StatsSection />
      <CountdownSection />
      <AboutSection />
      <CategoriesSection limit={6} />
      <ProcessSection />
      <FeaturedHonoreesSection />
      <HallOfFameSection preview />
      <SponsorsCarouselSection />
      <SponsorsSection />
      <VideoSection />
      <CtaSection />
    </PageShell>
  );
}
