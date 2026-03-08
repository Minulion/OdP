"use client";

import { FormEvent, useState } from "react";
import { Droplets, Music2, Sparkles, Timer } from "lucide-react";
import type { FragranceProfile } from "@/lib/fragrance";

export default function Home() {
  const [spotifyLink, setSpotifyLink] = useState("");
  const [profile, setProfile] = useState<FragranceProfile | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/fragrance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ spotifyLink }),
      });

      const data = (await response.json()) as {
        profile?: FragranceProfile;
        error?: string;
      };

      if (!response.ok || !data.profile) {
        setProfile(null);
        setError(data.error ?? "Could not generate fragrance profile.");
        return;
      }

      setProfile(data.profile);
    } catch {
      setProfile(null);
      setError("Network error while creating fragrance profile.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="page-shell">
      <div className="ambient-orb ambient-orb--a" />
      <div className="ambient-orb ambient-orb--b" />

      <main className="content">
        <section className="hero-card">
          <p className="tagline">
            <Sparkles size={14} />
            Spotify to Signature Scent
          </p>
          <h1>OdP Studio</h1>
          <p className="hero-copy">
            Paste a Spotify track, album, playlist, or artist link and generate a custom fragrance profile.
          </p>

          <form className="link-form" onSubmit={handleSubmit}>
            <input
              type="url"
              value={spotifyLink}
              onChange={(event) => setSpotifyLink(event.target.value)}
              placeholder="https://open.spotify.com/track/..."
              required
              autoComplete="off"
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Blending..." : "Craft Fragrance"}
            </button>
          </form>

          {error ? <p className="error-message">{error}</p> : null}
        </section>

        <section className="result-card">
          {profile ? (
            <>
              <div className="result-heading-row">
                <div>
                  <p className="eyebrow">Fragrance Profile</p>
                  <h2>{profile.fragranceName}</h2>
                </div>
                <span className="pill">{profile.concentration}</span>
              </div>

              <p className="story">{profile.story}</p>

              <div className="stats-grid">
                <div className="stat">
                  <Music2 size={16} />
                  <span>{profile.resourceType}</span>
                </div>
                <div className="stat">
                  <Droplets size={16} />
                  <span>{profile.sillage} sillage</span>
                </div>
                <div className="stat">
                  <Timer size={16} />
                  <span>{profile.longevityHours}h longevity</span>
                </div>
              </div>

              <div className="notes-grid">
                <NoteColumn title="Top" items={profile.topNotes} />
                <NoteColumn title="Heart" items={profile.heartNotes} />
                <NoteColumn title="Base" items={profile.baseNotes} />
              </div>

              <p className="mood">Mood: {profile.mood}</p>
              <p className="accords">Accords: {profile.accords.join(" · ")}</p>
            </>
          ) : (
            <div className="empty-state">
              <p className="eyebrow">Awaiting Link</p>
              <h2>Your fragrance profile will appear here.</h2>
              <p>
                Try a Spotify URL such as
                <br />
                <code>https://open.spotify.com/track/11dFghVXANMlKmJXsNCbNl</code>
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function NoteColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="note-column">
      <p>{title} Notes</p>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
