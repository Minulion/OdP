export type SpotifyResourceType = "track" | "album" | "playlist" | "artist";

export type FragranceProfile = {
  fragranceName: string;
  resourceType: SpotifyResourceType;
  resourceId: string;
  concentration: "Eau de Toilette" | "Eau de Parfum" | "Extrait";
  mood: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  accords: string[];
  sillage: "Soft" | "Moderate" | "Bold";
  longevityHours: number;
  story: string;
};

const validTypes = ["track", "album", "playlist", "artist"] as const;
const spotifyUrlPattern =
  /^https?:\/\/(open\.)?spotify\.com\/(track|album|playlist|artist)\/([A-Za-z0-9]{22})(?:\?.*)?$/i;

const topBank = [
  "Bergamot",
  "Pink Pepper",
  "Yuzu",
  "Grapefruit Zest",
  "Green Apple",
  "Cardamom",
  "Mandarin",
  "Juniper",
  "Pear",
  "Violet Leaf",
];

const heartBank = [
  "Jasmine Sambac",
  "Black Tea",
  "Iris",
  "Rose Absolute",
  "Lavender",
  "Neroli",
  "Fig Leaf",
  "Salted Air",
  "Saffron",
  "Orange Blossom",
];

const baseBank = [
  "Sandalwood",
  "Cedar",
  "Ambergris",
  "Vanilla Bean",
  "Patchouli",
  "Musk",
  "Vetiver",
  "Tonka Bean",
  "Labdanum",
  "Oakmoss",
];

const accordBank = [
  "Citrus",
  "Woody",
  "Musky",
  "Floral",
  "Aromatic",
  "Marine",
  "Spiced",
  "Smoky",
  "Powdery",
  "Amber",
];

const moods = [
  "Late-night drive under city lights",
  "Sunlit rooftop with warm air",
  "Rainy afternoon in a record store",
  "After-hours lounge with velvet seats",
  "Golden-hour walk by the water",
  "Quiet morning with coffee and vinyl",
  "Electric dance floor at midnight",
  "Moonlit train ride through neon streets",
];

const nameStems = [
  "Nocturne",
  "Velvet Static",
  "Neon Bloom",
  "Amber Pulse",
  "Solar Echo",
  "Midnight Citrus",
  "Vinyl Air",
  "Urban Petal",
  "Afterglow",
  "Prism Woods",
];

function hashSeed(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pickUniqueFromBank(bank: string[], count: number, seed: number): string[] {
  const picks = new Set<string>();
  let cursor = seed;

  while (picks.size < count) {
    cursor = Math.imul(cursor ^ 0x5bd1e995, 0x27d4eb2d) >>> 0;
    picks.add(bank[cursor % bank.length]);
  }

  return Array.from(picks);
}

export function parseSpotifyLink(rawLink: string): {
  type: SpotifyResourceType;
  id: string;
} | null {
  const link = rawLink.trim();
  const match = link.match(spotifyUrlPattern);

  if (!match) {
    return null;
  }

  const parsedType = match[2].toLowerCase();

  if (!validTypes.includes(parsedType as SpotifyResourceType)) {
    return null;
  }

  return {
    type: parsedType as SpotifyResourceType,
    id: match[3],
  };
}

export function generateFragranceFromSpotifyLink(rawLink: string): FragranceProfile | null {
  const parsed = parseSpotifyLink(rawLink);

  if (!parsed) {
    return null;
  }

  const seed = hashSeed(`${parsed.type}:${parsed.id}`);
  const topNotes = pickUniqueFromBank(topBank, 3, seed);
  const heartNotes = pickUniqueFromBank(heartBank, 3, seed ^ 0xa341316c);
  const baseNotes = pickUniqueFromBank(baseBank, 3, seed ^ 0xc8013ea4);
  const accords = pickUniqueFromBank(accordBank, 3, seed ^ 0xad90777d);

  const concentration: FragranceProfile["concentration"] =
    ["Eau de Toilette", "Eau de Parfum", "Extrait"][seed % 3] as FragranceProfile["concentration"];

  const sillage: FragranceProfile["sillage"] =
    ["Soft", "Moderate", "Bold"][(seed >>> 4) % 3] as FragranceProfile["sillage"];

  const longevityHours = 4 + ((seed >>> 8) % 9);
  const mood = moods[(seed >>> 12) % moods.length];
  const fragranceName = `${nameStems[(seed >>> 16) % nameStems.length]} ${((seed >>> 20) % 90) + 10}`;

  return {
    fragranceName,
    resourceType: parsed.type,
    resourceId: parsed.id,
    concentration,
    mood,
    topNotes,
    heartNotes,
    baseNotes,
    accords,
    sillage,
    longevityHours,
    story: `Built from the rhythm of this Spotify ${parsed.type}, this scent opens with ${topNotes[0]} and settles into ${baseNotes[0]} for a textured, wearable signature.`,
  };
}
