"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  startTransition,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";
import { ResultPreviewCard } from "@/components/odp/result-preview-card";
import {
  SpotifySourceIcon,
  YouTubeSourceIcon,
} from "@/components/odp/source-icons";
import { SectionHeader } from "@/components/odp/section-header";
import { SectionReveal } from "@/components/landing/section-reveal";
import {
  fragranceProfiles,
  getSourceLabel,
  pickProfile,
} from "@/lib/odp-data";

const steps = [
  {
    title: "Paste a link",
    copy: "Drop in Spotify or YouTube and let the engine dissect your favorite tunes.",
  },
  {
    title: "Interpret the mood",
    copy: "OdP leverages Cyanite, Hugging Face, and OpenAI to map musical texture into top, heart, and base accords.",
  },
  {
    title: "Save the scent",
    copy: "Keep the finished profile in your cabinet or watch it climb the public charts.",
  },
];

function LoadingBar() {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0, x: 48, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 24, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-xl"
    >
      <div className="rounded-full bg-white/10 p-1">
        <div className="h-2.5 overflow-hidden rounded-full bg-white/8">
          <motion.div
            className="h-full rounded-full bg-[linear-gradient(90deg,rgba(243,240,255,0.96),rgba(185,164,255,0.94),rgba(104,132,255,0.9))]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1 text-base font-medium text-white/74">
        <span>Generating</span>
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className="inline-block"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 0.18,
              ease: "easeInOut",
            }}
          >
            .
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

type ResultState = "idle" | "loading" | "ready";

export function LandingPage() {
  const [url, setUrl] = useState(fragranceProfiles[0].sourceUrl);
  const [activeProfile, setActiveProfile] = useState<
    (typeof fragranceProfiles)[number] | null
  >(null);
  const [resultState, setResultState] = useState<ResultState>("idle");
  const deferredUrl = useDeferredValue(url);
  const sourceLabel = getSourceLabel(deferredUrl);
  const hasDetectedSource = sourceLabel !== "Link ready";
  const generationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sourceBadge =
    sourceLabel === "Spotify"
      ? {
          label: "Spotify",
          className:
            "border-emerald-400/30 bg-emerald-400/14 text-emerald-200",
          icon: <SpotifySourceIcon />,
        }
      : sourceLabel === "YouTube"
        ? {
            label: "YouTube",
            className: "border-rose-400/30 bg-rose-400/14 text-rose-200",
            icon: <YouTubeSourceIcon />,
          }
        : null;

  useEffect(() => {
    return () => {
      if (generationTimerRef.current) {
        clearTimeout(generationTimerRef.current);
      }
    };
  }, []);

  const handleGenerate = () => {
    if (generationTimerRef.current) {
      clearTimeout(generationTimerRef.current);
    }

    setResultState("loading");

    const nextProfile = pickProfile(url || fragranceProfiles[0].sourceUrl);

    generationTimerRef.current = setTimeout(() => {
      startTransition(() => {
        setActiveProfile(nextProfile);
        setResultState("ready");
      });
    }, 1800);
  };

  return (
    <div className="mx-auto max-w-7xl">
      <section className="grid gap-10 pb-18 pt-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >

          <h1 className="font-display text-glow mt-7 max-w-3xl text-5xl leading-[0.94] text-white sm:text-6xl lg:text-7xl">
            Ode de Parfum
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-white/66 lg:ml-2">
            Turn songs into artisan fragrances in one click. Try it now!
          </p>

          <motion.form
            onSubmit={(event) => {
              event.preventDefault();
              handleGenerate();
            }}
            className="glass-panel oceanic-border mt-10 rounded-[30px] p-4 sm:p-5"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <label
              htmlFor="music-url"
              className="text-sm text-white/40"
            >
              Paste your Spotify or YouTube URL here...
            </label>

            <div className="mt-3 flex flex-col gap-3 rounded-[24px] border border-white/12 bg-black/18 p-3 lg:flex-row lg:items-center">
              <input
                id="music-url"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="https://open.spotify.com/track/..."
                className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-white placeholder:text-white/24 focus:outline-none sm:text-base"
              />

              <motion.button
                type="submit"
                className="rounded-[20px] bg-[linear-gradient(135deg,#f3f0ff_0%,#cabfff_46%,#8b78ff_100%)] px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_16px_40px_rgba(137,102,255,0.34)]"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Generate Fragrance
              </motion.button>
            </div>

            {hasDetectedSource && sourceBadge ? (
              <div className="mt-4">
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium ${sourceBadge.className}`}
                >
                  {sourceBadge.icon}
                  <span>{sourceBadge.label}</span>
                </span>
              </div>
            ) : null}
          </motion.form>
        </motion.div>

        <div className="min-h-[220px] lg:min-h-[860px]">
          <AnimatePresence mode="wait">
            {resultState === "loading" ? (
              <div
                key="loading-shell"
                className="flex h-full items-start justify-center pt-16 lg:pt-[272px]"
              >
                <LoadingBar />
              </div>
            ) : null}

            {resultState === "ready" && activeProfile ? (
              <motion.div
                key={activeProfile.id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <ResultPreviewCard profile={activeProfile} compact />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </section>

      <SectionReveal className="py-16 sm:py-20">
        <SectionHeader
          eyebrow="How It Works"
          title="Song in, scent out."
          copy="The algorithm generates a completely unique fragrance for any song."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="glass-panel oceanic-border rounded-[28px] p-6"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-lg font-semibold text-white/40">
                Step {index + 1}
              </p>
              <h2 className="font-display mt-5 text-3xl text-white">
                {step.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/62">{step.copy}</p>
            </motion.div>
          ))}
        </div>
      </SectionReveal>
    </div>
  );
}
