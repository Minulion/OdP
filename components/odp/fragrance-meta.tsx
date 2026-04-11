import type { FragranceProfile } from "@/lib/odp-data";
import {
  SpotifySourceIcon,
  YouTubeSourceIcon,
} from "@/components/odp/source-icons";

export function toTitleCase(value: string) {
  return value.replace(/\b\w/g, (character) => character.toUpperCase());
}

function TriangleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 18"
      className="h-5 w-5 fill-current text-white/55"
    >
      <path d="M10 0 20 18H0Z" />
    </svg>
  );
}

const accordColors = [
  "bg-[#d79880]",
  "bg-[#90b6b1]",
  "bg-[#dfb9da]",
  "bg-[#c08bff]",
  "bg-[#d7d4c4]",
];

export function SourceBadge({
  source,
  size = "md",
}: {
  source: FragranceProfile["source"];
  size?: "sm" | "md";
}) {
  const iconSize = size === "sm" ? "h-5 w-5" : "h-6 w-6";
  const containerSize = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  const config =
    source === "Spotify"
      ? {
          icon: <SpotifySourceIcon className={iconSize} />,
          className:
            "border-emerald-400/30 bg-emerald-400/14 text-emerald-200",
        }
      : {
          icon: <YouTubeSourceIcon className={iconSize} />,
          className: "border-rose-400/30 bg-rose-400/14 text-rose-200",
        };

  return (
    <span
      className={`inline-flex ${containerSize} items-center justify-center rounded-full border ${config.className}`}
      title={source}
    >
      {config.icon}
    </span>
  );
}

export function AccordList({
  accords,
  className = "mt-5 flex flex-wrap gap-x-8 gap-y-4",
  itemClassName = "inline-flex items-center gap-3 text-white/72",
  dotClassName = "h-5 w-5",
}: {
  accords: FragranceProfile["accords"];
  className?: string;
  itemClassName?: string;
  dotClassName?: string;
}) {
  return (
    <div className={className}>
      {accords.map((accord, index) => (
        <span key={accord.label} className={itemClassName}>
          <span
            className={`${dotClassName} rounded-full ${
              accordColors[index % accordColors.length]
            }`}
          />
          <span>{toTitleCase(accord.label)}</span>
        </span>
      ))}
    </div>
  );
}

export function PyramidRow({
  title,
  notes,
}: {
  title: string;
  notes: string[];
}) {
  return (
    <div className="grid gap-4 border-b border-white/8 py-5 last:border-b-0 sm:grid-cols-[180px_1fr] sm:items-center">
      <div className="flex items-center gap-3 text-white/62">
        <TriangleIcon />
        <p className="font-semibold">{title}</p>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {notes.map((note) => (
          <span
            key={note}
            className="inline-flex items-center gap-3 text-white/72"
          >
            {toTitleCase(note)}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CompactPyramid({
  profile,
}: {
  profile: FragranceProfile;
}) {
  return (
    <div className="space-y-3 text-sm text-white/64">
      <div className="flex gap-3">
        <span className="w-12 shrink-0 font-semibold text-white/36">
          Top
        </span>
        <span>{profile.top.map(toTitleCase).join(" • ")}</span>
      </div>
      <div className="flex gap-3">
        <span className="w-12 shrink-0 font-semibold text-white/36">
          Heart
        </span>
        <span>{profile.middle.map(toTitleCase).join(" • ")}</span>
      </div>
      <div className="flex gap-3">
        <span className="w-12 shrink-0 font-semibold text-white/36">
          Base
        </span>
        <span>{profile.base.map(toTitleCase).join(" • ")}</span>
      </div>
    </div>
  );
}
