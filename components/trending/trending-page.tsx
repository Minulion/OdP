"use client";

import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import {
  AccordList,
  CompactPyramid,
  SourceBadge,
} from "@/components/odp/fragrance-meta";
import { SectionHeader } from "@/components/odp/section-header";
import { SectionReveal } from "@/components/landing/section-reveal";
import {
  getTrendingProfiles,
  timeframeOptions,
  type Timeframe,
} from "@/lib/odp-data";
import { useState } from "react";

export function TrendingPage() {
  const [timeframe, setTimeframe] = useState<Timeframe>("7d");
  const profiles = getTrendingProfiles(timeframe);
  const leaderboardGrid =
    "grid-cols-[128px_minmax(0,1.55fr)_minmax(0,1fr)_120px]";

  return (
    <div className="mx-auto max-w-7xl">
      <SectionReveal className="pb-10 pt-8 sm:pb-14 lg:pt-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Trending"
            title="Public Leaderboard"
            copy="View the most popular fragrances generated across the platform!"
          />

          <div className="glass-panel oceanic-border inline-flex rounded-full p-2">
            {timeframeOptions.map((option) => {
              const active = option.value === timeframe;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTimeframe(option.value)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    active
                      ? "bg-white/12 text-white"
                      : "text-white/54 hover:text-white"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="pb-16">
        <div className="glass-panel oceanic-border overflow-hidden rounded-[34px]">
          <div
            className={`grid ${leaderboardGrid} border-b border-white/10 px-6 py-4 text-lg font-semibold text-white/38 sm:px-8`}
          >
            <span>Rank</span>
            <span className="ml-3">Scent</span>
            <span className="hidden md:block">Notes</span>
            <span className="text-right">Score</span>
          </div>

          <div>
            {profiles.map((profile, index) => {
              const stat = profile.leaderboard[timeframe];
              const movementLabel =
                stat.movement > 0 ? `+${stat.movement}` : `${stat.movement}`;

              return (
                <motion.div
                  key={`${timeframe}-${profile.id}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className={`grid ${leaderboardGrid} items-start gap-4 border-b border-white/8 px-6 py-5 last:border-b-0 sm:px-8`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display text-3xl text-white">
                      {index + 1}
                    </span>
                    <span
                      className={`rounded-lg px-2 py-1 text-[11px] uppercase tracking-[0.24em] ${
                        stat.movement >= 0
                          ? "bg-emerald-400/12 text-emerald-200"
                          : "bg-rose-400/12 text-rose-200"
                      }`}
                    >
                      {movementLabel}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <p className="font-display text-3xl text-white">
                        {profile.fragranceName}
                      </p>
                      <SourceBadge source={profile.source} size="sm" />
                    </div>
                    <p className="mt-2 text-sm text-white/40">
                      Eau de Parfum
                    </p>
                    <p className="mt-3 text-sm text-white/40">
                      Based on {profile.track} - {profile.artist}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/58">
                      {profile.descriptor}
                    </p>
                    <AccordList
                      accords={profile.accords}
                      className="mt-4 flex flex-wrap gap-x-4 gap-y-2"
                      itemClassName="inline-flex items-center gap-2 text-xs text-white/64"
                      dotClassName="h-3 w-3"
                    />
                  </div>

                  <div className="hidden h-full md:flex md:flex-col">
                    <CompactPyramid profile={profile} />
                    <div className="mt-auto flex items-center justify-end gap-4 pt-5">
                      <p className="text-sm text-white/48">
                        {stat.saves.toLocaleString()} saves
                      </p>

                      <button
                        type="button"
                        aria-label="Save fragrance"
                        title="Save fragrance"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white/72 transition hover:bg-white/10 hover:text-white"
                      >
                        <Bookmark className="h-4 w-4" strokeWidth={1.9} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-display text-4xl text-white">{stat.score}</p>
                    <p className="mt-2 text-white/34">
                      {timeframe}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </SectionReveal>
    </div>
  );
}
