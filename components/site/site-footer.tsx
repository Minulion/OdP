import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-16 flex max-w-7xl flex-col gap-6 border-t border-white/10 py-10 text-sm text-white/42 sm:flex-row sm:items-center sm:justify-between">
      <p>© Ode de Parfum 2026. All rights reserved. </p>
      <div className="flex flex-wrap items-center gap-5">
        <Link href="/" className="transition hover:text-white/74">
          Home
        </Link>
        <Link href="/trending" className="transition hover:text-white/74">
          Trending
        </Link>
        <Link href="/my-scents" className="transition hover:text-white/74">
          My Scents
        </Link>
      </div>
    </footer>
  );
}
