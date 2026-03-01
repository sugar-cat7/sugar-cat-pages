import type { Talk } from "@my-pages/content-fetcher";
import { SectionHeading } from "~/shared/components/presenters/SectionHeading";
import { cn } from "~/shared/lib/utils";

type LatestTalksSectionProps = {
  talks: Talk[];
};

function formatDateDot(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

export function LatestTalksSection({ talks }: LatestTalksSectionProps) {
  return (
    <section>
      <SectionHeading title="Recent Talks" linkHref="/talks" />

      {/* anycolor-style grid card layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {talks.map((talk) => (
          <a
            key={talk.id}
            href={talk.slideUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            {/* Top Divider */}
            <div className="h-px bg-border mb-4" />

            {/* Thumbnail */}
            <div className="aspect-video rounded-md mb-4 overflow-hidden">
              {talk.thumbnail ? (
                <img
                  src={talk.thumbnail}
                  alt={talk.title}
                  className={cn(
                    "w-full h-full object-cover",
                    "transition-all duration-fast",
                    "group-hover:scale-105",
                  )}
                />
              ) : (
                <div
                  className={cn(
                    "w-full h-full flex items-center justify-center",
                    "bg-gradient-to-br from-mint/10 via-mint/5 to-sky/10",
                    "transition-all duration-fast",
                    "group-hover:scale-105",
                  )}
                >
                  <svg
                    className="w-12 h-12 text-mint/40"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.6c-5.292 0-9.6-4.308-9.6-9.6S6.708 2.4 12 2.4s9.6 4.308 9.6 9.6-4.308 9.6-9.6 9.6zm-2.4-6h4.8v1.2H9.6v-1.2zm0-2.4h4.8V14.4H9.6V13.2zm0-2.4h4.8v1.2H9.6v-1.2zm-2.4-3.6h9.6v1.2H7.2V7.2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Date (YYYY.MM.DD format) */}
            <time className="block text-xs text-muted-foreground mb-2 tracking-wider">
              {formatDateDot(talk.publishedAt)}
            </time>

            {/* Event Name */}
            {talk.event && (
              <p className="text-sm text-foreground-soft mb-2">{talk.event}</p>
            )}

            {/* Talk Title */}
            <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-fast line-clamp-2">
              {talk.title}
            </h3>

            {/* Bottom Divider */}
            <div className="h-px bg-border mt-4" />
          </a>
        ))}
      </div>
    </section>
  );
}
