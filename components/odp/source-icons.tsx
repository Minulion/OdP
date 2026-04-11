export function SpotifySourceIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`${className} fill-none stroke-current`}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8 10.2c2.6-1 5.5-.9 8 .4" />
      <path d="M8.8 13.1c2-.7 4.1-.6 6 .3" />
      <path d="M9.8 15.7c1.3-.4 2.7-.3 3.9.2" />
    </svg>
  );
}

export function YouTubeSourceIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`${className} fill-current`}
    >
      <path d="M20.4 7.2a2.8 2.8 0 0 0-2-2C16.7 4.8 12 4.8 12 4.8s-4.7 0-6.4.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 3.2 12a29 29 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.7.4 6.4.4 6.4.4s4.7 0 6.4-.4a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .4-4.8 29 29 0 0 0-.4-4.8Z" />
      <path d="m10 15.5 5-3.5-5-3.5Z" className="fill-black/85" />
    </svg>
  );
}
