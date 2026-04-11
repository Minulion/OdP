export type Timeframe = "24h" | "7d" | "30d";

export type FragranceProfile = {
  id: string;
  track: string;
  artist: string;
  source: "Spotify" | "YouTube";
  sourceUrl: string;
  fragranceName: string;
  descriptor: string;
  aura: string;
  top: string[];
  middle: string[];
  base: string[];
  moods: string[];
  accords: Array<{ label: string; value: number }>;
  bestFor: string;
  collection: string;
  savedOn: string;
  bottleTone: string;
  leaderboard: Record<
    Timeframe,
    {
      score: number;
      movement: number;
      saves: number;
    }
  >;
};

export const timeframeOptions: Array<{ label: string; value: Timeframe }> = [
  { label: "Today", value: "24h" },
  { label: "Week", value: "7d" },
  { label: "Month", value: "30d" },
];

export const fragranceProfiles: FragranceProfile[] = [
  {
    id: "velvet-static",
    track: "Midnight Signal",
    artist: "Aurora FM",
    source: "Spotify",
    sourceUrl: "https://open.spotify.com/track/0V3wPSX9ygBnCm8psDIegu",
    fragranceName: "Velvet Static",
    descriptor:
      "Neon fruit and cool iris over a mineral amber base for songs that shimmer after dark.",
    aura: "electric, nocturnal, magnetic",
    top: ["bergamot mist", "blackcurrant skin", "sea-salt aldehydes"],
    middle: ["violet ink", "smoked iris", "night jasmine"],
    base: ["amber resin", "driftwood", "white musk"],
    moods: ["late-night", "luminous", "melancholic"],
    accords: [
      { label: "radiance", value: 88 },
      { label: "depth", value: 71 },
      { label: "salt air", value: 54 },
    ],
    bestFor: "Rooftop sets and after-hours listening.",
    collection: "Nocturne",
    savedOn: "Apr 07",
    bottleTone: "from-violet-200/55 via-fuchsia-300/20 to-transparent",
    leaderboard: {
      "24h": { score: 97, movement: 2, saves: 381 },
      "7d": { score: 95, movement: 1, saves: 1422 },
      "30d": { score: 89, movement: 4, saves: 4988 },
    },
  },
  {
    id: "violet-current",
    track: "Glass Tides",
    artist: "Serein",
    source: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
    fragranceName: "Violet Current",
    descriptor:
      "Sparkling citrus opens into cool florals and liquid cedar, built for songs with tidal lift.",
    aura: "clean, cinematic, oceanic",
    top: ["meyer lemon", "frozen pear", "ozonic mist"],
    middle: ["violet leaf", "water lily", "silken freesia"],
    base: ["cedar vapor", "cashmere woods", "pale amber"],
    moods: ["uplifted", "weightless", "dreamy"],
    accords: [
      { label: "freshness", value: 92 },
      { label: "clarity", value: 80 },
      { label: "soft bloom", value: 66 },
    ],
    bestFor: "Morning drives and coastal evenings.",
    collection: "Marine",
    savedOn: "Apr 05",
    bottleTone: "from-sky-200/50 via-cyan-300/18 to-transparent",
    leaderboard: {
      "24h": { score: 92, movement: -1, saves: 344 },
      "7d": { score: 98, movement: 3, saves: 1538 },
      "30d": { score: 94, movement: 6, saves: 5210 },
    },
  },
  {
    id: "noir-sonata",
    track: "Low Light Rhapsody",
    artist: "Aster Vale",
    source: "Spotify",
    sourceUrl: "https://open.spotify.com/track/3AJwUDP919kvQ9QcozQPxg",
    fragranceName: "Noir Sonata",
    descriptor:
      "Dark cherry, velvet rose, and incense wrapped in polished woods for a slow-burning chorus.",
    aura: "opulent, intimate, smoky",
    top: ["black cherry", "pink pepper", "saffron glow"],
    middle: ["velvet rose", "plum skin", "orris butter"],
    base: ["frankincense", "ebony woods", "labdanum"],
    moods: ["romantic", "brooding", "sensual"],
    accords: [
      { label: "intensity", value: 94 },
      { label: "warmth", value: 82 },
      { label: "smoke", value: 73 },
    ],
    bestFor: "Dinners, galleries, and midnight arrivals.",
    collection: "Reserve",
    savedOn: "Apr 02",
    bottleTone: "from-rose-200/40 via-violet-300/18 to-transparent",
    leaderboard: {
      "24h": { score: 89, movement: 1, saves: 296 },
      "7d": { score: 91, movement: -2, saves: 1276 },
      "30d": { score: 96, movement: 2, saves: 5531 },
    },
  },
  {
    id: "satin-echo",
    track: "Honey Haze",
    artist: "Lune Park",
    source: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=OPf0YbXqDm0",
    fragranceName: "Satin Echo",
    descriptor:
      "Golden fig and soft neroli carried by warm suede and tonka for a quiet, radiant chorus.",
    aura: "sunlit, soft, velvety",
    top: ["fig dew", "mandarin peel", "neroli milk"],
    middle: ["osmanthus", "mimosa silk", "orris veil"],
    base: ["tonka bean", "blonde suede", "sandalwood"],
    moods: ["comforting", "glowing", "soft-focus"],
    accords: [
      { label: "warm light", value: 84 },
      { label: "creaminess", value: 78 },
      { label: "silk", value: 74 },
    ],
    bestFor: "Late brunches and golden-hour walks.",
    collection: "Daylight",
    savedOn: "Mar 28",
    bottleTone: "from-amber-200/50 via-orange-200/18 to-transparent",
    leaderboard: {
      "24h": { score: 84, movement: 4, saves: 248 },
      "7d": { score: 88, movement: 5, saves: 1108 },
      "30d": { score: 87, movement: 8, saves: 4023 },
    },
  },
  {
    id: "cinder-bloom",
    track: "Afterglow Motel",
    artist: "North Arcade",
    source: "Spotify",
    sourceUrl: "https://open.spotify.com/track/6habFhsOp2NvshLv26DqMb",
    fragranceName: "Cinder Bloom",
    descriptor:
      "Spiced mandarin, burnt rose, and polished cedar with a dry ember finish.",
    aura: "heated, polished, dark floral",
    top: ["blood orange", "pink pepper", "clove spark"],
    middle: ["burnt rose", "geranium", "red tea"],
    base: ["cedar smoke", "vetiver", "amber ash"],
    moods: ["charged", "smoldering", "confident"],
    accords: [
      { label: "spice", value: 90 },
      { label: "dry woods", value: 81 },
      { label: "floral smoke", value: 77 },
    ],
    bestFor: "Evening launches and winter playlists.",
    collection: "Reserve",
    savedOn: "Mar 19",
    bottleTone: "from-orange-300/45 via-rose-300/18 to-transparent",
    leaderboard: {
      "24h": { score: 82, movement: -2, saves: 232 },
      "7d": { score: 85, movement: 1, saves: 1004 },
      "30d": { score: 90, movement: 3, saves: 4386 },
    },
  },
  {
    id: "blue-velour",
    track: "Open Water Memory",
    artist: "Ari Sol",
    source: "Spotify",
    sourceUrl: "https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh",
    fragranceName: "Blue Velour",
    descriptor:
      "Icy mint and lavender washed over mineral woods for songs that feel expansive and slow.",
    aura: "cool, spacious, reflective",
    top: ["mint vapor", "calabrian bergamot", "rain accord"],
    middle: ["lavender", "blue iris", "sage"],
    base: ["wet stone", "cashmere wood", "silver musk"],
    moods: ["reflective", "clear", "expansive"],
    accords: [
      { label: "cool air", value: 93 },
      { label: "lavender", value: 72 },
      { label: "mineral", value: 79 },
    ],
    bestFor: "Travel days and post-storm evenings.",
    collection: "Marine",
    savedOn: "Mar 12",
    bottleTone: "from-blue-200/50 via-indigo-300/18 to-transparent",
    leaderboard: {
      "24h": { score: 78, movement: 3, saves: 219 },
      "7d": { score: 83, movement: 4, saves: 956 },
      "30d": { score: 88, movement: 7, saves: 4167 },
    },
  },
];

export function pickProfile(input: string) {
  const normalized = input.trim();

  if (!normalized) {
    return fragranceProfiles[0];
  }

  const seed = Array.from(normalized).reduce(
    (sum, character, index) => sum + character.charCodeAt(0) * (index + 17),
    0,
  );

  return fragranceProfiles[seed % fragranceProfiles.length] ?? fragranceProfiles[0];
}

export function getSourceLabel(value: string) {
  if (value.toLowerCase().includes("spotify")) {
    return "Spotify";
  }

  if (value.toLowerCase().includes("youtu")) {
    return "YouTube";
  }

  return "Link ready";
}

export function getTrendingProfiles(timeframe: Timeframe) {
  return [...fragranceProfiles].sort(
    (left, right) => right.leaderboard[timeframe].score - left.leaderboard[timeframe].score,
  );
}
