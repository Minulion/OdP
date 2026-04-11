import { LandingPage } from "@/components/landing/landing-page";
import { SiteShell } from "@/components/site/site-shell";

export default function Home() {
  return (
    <SiteShell>
      <LandingPage />
    </SiteShell>
  );
}
