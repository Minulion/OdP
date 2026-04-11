"use client";

import { motion } from "framer-motion";
import { Bookmark, Share2 } from "lucide-react";
import type { FragranceProfile } from "@/lib/odp-data";
import { FragranceBottle } from "@/components/odp/fragrance-bottle";
import {
  AccordList,
  PyramidRow,
  SourceBadge,
} from "@/components/odp/fragrance-meta";

function ActionButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white/72 transition hover:bg-white/10 hover:text-white"
    >
      {children}
    </button>
  );
}

export function ResultPreviewCard({
  profile,
  compact = false,
}: {
  profile: FragranceProfile;
  compact?: boolean;
}) {
  return (
    <motion.article
      key={profile.id}
      initial={{ opacity: 0, y: 22, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel oceanic-border glow-ring relative overflow-hidden rounded-[32px] p-6 sm:p-7"
    >
      <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(84,146,255,0.22),transparent_68%)] blur-2xl" />

      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl text-white sm:text-5xl">
              {profile.fragranceName}
            </h2>
            <p className="mt-2 text-lg text-white/42">
              Eau de Parfum
            </p>
          </div>

          <div className="flex items-center gap-2">
            <SourceBadge source={profile.source} />
            <ActionButton label="Share fragrance">
              <Share2 className="h-4 w-4" strokeWidth={1.9} />
            </ActionButton>
            <ActionButton label="Save fragrance">
              <Bookmark className="h-4 w-4" strokeWidth={1.9} />
            </ActionButton>
          </div>
        </div>

        <div
          className={`mt-8 grid gap-8 ${
            compact ? "lg:grid-cols-[0.42fr_0.58fr]" : "xl:grid-cols-[0.38fr_0.62fr]"
          }`}
        >
          <div className="flex items-start justify-center lg:justify-start">
            <FragranceBottle profile={profile} compact={compact} />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-white/42">
              Based on {profile.track} - {profile.artist}
            </p>
            <p className="max-w-xl text-sm leading-7 text-white/66 sm:text-base">
              {profile.descriptor}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-3xl font-semibold tracking-[-0.03em] text-white">
            Main accords
          </h3>
          <AccordList accords={profile.accords} />
        </div>

        <div className="mt-12">
          <h3 className="text-3xl font-semibold tracking-[-0.03em] text-white">
            Fragrance Pyramid
          </h3>
          <div className="mt-6">
            <PyramidRow title="Top Notes" notes={profile.top} />
            <PyramidRow title="Heart Notes" notes={profile.middle} />
            <PyramidRow title="Base Notes" notes={profile.base} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
