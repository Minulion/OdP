import { SectionHeader } from "@/components/odp/section-header";
import { SectionReveal } from "@/components/landing/section-reveal";
import { FragranceBottle } from "@/components/odp/fragrance-bottle";
import { Bookmark } from "lucide-react";
import {
  AccordList,
  CompactPyramid,
  SourceBadge,
} from "@/components/odp/fragrance-meta";
import { fragranceProfiles } from "@/lib/odp-data";

const shelves = ["Nocturne", "Marine", "Reserve", "Daylight"];

function getShelfId(shelf: string) {
  return `my-scents-shelf-${shelf.toLowerCase().replace(/\s+/g, "-")}`;
}

const shelfGroups = shelves.map((shelf) => {
  const items = fragranceProfiles.filter((profile) => profile.collection === shelf);

  return {
    shelf,
    id: getShelfId(shelf),
    items,
    count: items.length,
  };
});

export function MyScentsPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <SectionReveal className="pb-10 pt-8 sm:pb-14 lg:pt-16">
        <SectionHeader
          eyebrow="My Scents"
          title="Personal Cabinet"
          copy="Scroll down to view your saved fragrances!"
        />
      </SectionReveal>

      <section className="pb-16">
        <div className="glass-panel oceanic-border rounded-[36px] p-5 sm:p-8">
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start">
            <aside className="sticky top-28 z-20 self-start">
              <div className="rounded-[30px] border border-white/10 bg-black/16 p-5 shadow-[0_20px_40px_rgba(5,8,20,0.18)] backdrop-blur-xl sm:p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-white/40">
                      Collection
                    </p>
                    <div className="mt-3 flex items-end gap-3">
                      <p className="font-display text-4xl leading-none text-white sm:text-[2.8rem]">
                        {fragranceProfiles.length}
                      </p>
                      <p className="pb-1 text-sm text-white/48">
                        saved scents
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-6 text-white/54">
                  Click to jump to a shelf.
                </p>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  {shelfGroups.map(({ shelf, id, count }) => (
                    <a
                      key={shelf}
                      href={`#${id}`}
                      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-white/68 transition hover:border-white/18 hover:bg-white/10 hover:text-white"
                    >
                      <span>{shelf}</span>
                      <span className="inline-flex min-w-7 items-center justify-center rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-white/74 transition group-hover:bg-white/14">
                        {count}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            <div className="space-y-8">
              {shelfGroups.map(({ shelf, id, items }) => {
                return (
                  <section key={shelf} id={id} className="scroll-mt-36">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold text-white/40">
                          Shelf
                        </p>
                        <h2 className="font-display mt-2 text-3xl text-white">
                          {shelf}
                        </h2>
                      </div>
                      <div className="hidden h-px flex-1 bg-white/8 md:ml-6 md:block" />
                    </div>

                    <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5">
                      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {items.map((profile) => (
                          <article
                            key={profile.id}
                            className="rounded-[28px] border border-white/10 bg-black/18 p-5"
                          >
                            <div className="flex min-h-[220px] items-center justify-center">
                              <FragranceBottle profile={profile} compact />
                            </div>

                            <div className="mt-5">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <p className="font-display text-3xl text-white">
                                    {profile.fragranceName}
                                  </p>
                                  <p className="mt-2 text-sm text-white/40">
                                    Eau de Parfum
                                  </p>
                                </div>
                                <SourceBadge source={profile.source} size="sm" />
                              </div>
                              <p className="mt-3 text-sm text-white/38">
                                Based on {profile.track}
                              </p>
                              <p className="mt-4 text-sm leading-7 text-white/58">
                                {profile.descriptor}
                              </p>
                              <AccordList
                                accords={profile.accords}
                                className="mt-5 flex flex-wrap gap-x-4 gap-y-2"
                                itemClassName="inline-flex items-center gap-2 text-xs text-white/64"
                                dotClassName="h-3 w-3"
                              />
                              <div className="mt-5 rounded-[20px] border border-white/8 bg-white/4 p-4">
                                <CompactPyramid profile={profile} />
                              </div>
                              <div className="mt-5 flex items-center justify-between gap-4">
                                <p className="text-sm text-white/34">
                                  Saved {profile.savedOn}
                                </p>

                                <button
                                  type="button"
                                  aria-label="Unsave fragrance"
                                  title="Unsave fragrance"
                                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white/78 transition hover:bg-white/12 hover:text-white"
                                >
                                  <Bookmark
                                    className="h-5 w-5 fill-current"
                                    strokeWidth={1.9}
                                  />
                                </button>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
