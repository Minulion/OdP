export function SectionHeader({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="inline-flex rounded-full border border-white/10 bg-white/6 px-5 py-2 text-lg font-bold text-white/70">
        {eyebrow}
      </p>
      <h2 className="font-display mt-4 text-4xl leading-none text-white sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-7 text-white/66 sm:text-lg">{copy}</p>
    </div>
  );
}
