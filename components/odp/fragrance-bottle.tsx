import Image from "next/image";
import type { FragranceProfile } from "@/lib/odp-data";

export function FragranceBottle({
  compact = false,
}: {
  profile: FragranceProfile;
  compact?: boolean;
}) {
  return (
    <div className={`relative mx-auto ${compact ? "w-[200px]" : "w-[250px]"}`}>
      <Image
        src="/odp-bottle-placeholder.png"
        alt="OdP bottle placeholder"
        width={1024}
        height={1536}
        priority={false}
        className="h-auto w-full"
      />
    </div>
  );
}
