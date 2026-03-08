import { NextRequest, NextResponse } from "next/server";
import { generateFragranceFromSpotifyLink } from "@/lib/fragrance";

type Body = {
  spotifyLink?: string;
};

export async function POST(request: NextRequest) {
  let body: Body;

  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const spotifyLink = body.spotifyLink?.trim();

  if (!spotifyLink) {
    return NextResponse.json(
      { error: "Missing spotifyLink in request body." },
      { status: 400 },
    );
  }

  const profile = generateFragranceFromSpotifyLink(spotifyLink);

  if (!profile) {
    return NextResponse.json(
      {
        error:
          "Invalid Spotify link. Use a full open.spotify.com URL for a track, album, playlist, or artist.",
      },
      { status: 422 },
    );
  }

  return NextResponse.json({ profile });
}
