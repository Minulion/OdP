"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Trending", href: "/trending" },
  { label: "My Scents", href: "/my-scents" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6">
      <div className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3 -ml-4">
          <span className="relative block h-11 w-[72px] shrink-0 overflow-visible mb-1.5">
            <Image
              src="/odp.png"
              alt="Ode de Parfum"
              width={72}
              height={72}
              className="absolute left-0 top-1/2 h-[60px] w-auto max-w-none -translate-y-1/2 object-contain"
            />
          </span>
          <div className="hidden sm:block">
            <p className="text-xl font-display text-white/90 -ml-5">Ode de Parfum</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-3 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  active
                    ? "bg-white/12 text-white"
                    : "text-white/62 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full px-4 py-2 text-sm text-white/70 transition hover:text-white"
          >
            Login
          </button>
          <motion.button
            type="button"
            className="rounded-full border border-white/12 bg-white/12 px-4 py-2 text-sm text-white shadow-[0_0_30px_rgba(130,94,255,0.16)]"
            whileHover={{ y: -1, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            Register
          </motion.button>
        </div>
      </div>
    </header>
  );
}
