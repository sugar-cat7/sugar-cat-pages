import type { Talk } from "@my-pages/content-fetcher";

type TalkCardProps = {
  talk: Talk;
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function TalkCard({ talk }: TalkCardProps) {
  return (
    <a
      href={talk.slideUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg bg-card shadow-card overflow-hidden transition-all duration-fast hover:shadow-action hover:-translate-y-0.5"
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-gradient-to-br from-mint/20 via-sky/10 to-coral/20 flex items-center justify-center overflow-hidden">
        {talk.thumbnail ? (
          <img
            src={talk.thumbnail}
            alt={talk.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            className="w-16 h-16 text-muted-foreground/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
            />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Event & Date */}
        <div className="flex items-center gap-2 mb-3">
          {talk.event && (
            <span className="inline-block px-2.5 py-0.5 text-xs font-medium text-mint bg-mint/10 rounded-full">
              {talk.event}
            </span>
          )}
          <span className="text-xs text-muted-foreground">
            {formatDate(talk.publishedAt)}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-fast">
          {talk.title}
        </h2>

        {/* Description */}
        {talk.description && (
          <p className="text-sm text-foreground-soft line-clamp-2">
            {talk.description}
          </p>
        )}
      </div>
    </a>
  );
}
