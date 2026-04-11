import type { ReactNode } from "react";
import { WaveBackground } from "@/components/landing/wave-background";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <WaveBackground />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(88,124,255,0.1),transparent_36%)]" />
      <SiteHeader />
      <main className="relative z-10 px-4 pb-16 pt-28 sm:px-6">{children}</main>
      <div className="relative z-10 px-4 sm:px-6">
        <SiteFooter />
      </div>
    </div>
  );
}
