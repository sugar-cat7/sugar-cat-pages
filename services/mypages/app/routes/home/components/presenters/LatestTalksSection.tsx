import type { Talk } from "@my-pages/content-fetcher";
import { ArchiveList } from "~/shared/components/presenters/ArchiveList";
import type { ArchiveRowData } from "~/shared/components/presenters/ArchiveRow";
import {
  FeatureBadge,
  FeatureBody,
  FeatureCard,
  FeatureCover,
  MetaSeparator,
} from "~/shared/components/presenters/FeatureCard";
import { MicIcon } from "~/shared/components/presenters/icons";
import { SectionHeading } from "~/shared/components/presenters/SectionHeading";
import { formatDateDot } from "~/shared/lib/format-date";

type LatestTalksSectionProps = {
  talks: Talk[];
};

function FallbackCover() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, color-mix(in oklch, var(--palette-mint) 30%, var(--palette-bg-700)) 0%, var(--palette-bg-700) 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in oklch, var(--palette-mint) 20%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklch, var(--palette-mint) 20%, transparent) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse at 30% 40%, #000 0%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 30% 40%, #000 0%, transparent 80%)",
        }}
      />
    </>
  );
}

function toRow(talk: Talk, idx: number): ArchiveRowData {
  return {
    id: talk.id,
    href: talk.slideUrl,
    idx,
    date: formatDateDot(talk.publishedAt),
    tag: "slides",
    extra: talk.event,
    title: talk.title,
  };
}

export function LatestTalksSection({ talks }: LatestTalksSectionProps) {
  if (talks.length === 0) return null;
  const [featured, ...rest] = talks;
  const featuredId = `TALK_${String(talks.length).padStart(3, "0")}`;

  return (
    <section className="flex h-full flex-col gap-3 lg:row-span-3 lg:grid lg:grid-rows-subgrid lg:gap-0 lg:gap-y-3">
      <SectionHeading
        title="talks"
        subtitle="// recent conference appearances"
        count={talks.length}
        icon={<MicIcon className="h-4 w-4" />}
        linkHref="/talks"
      />

      <FeatureCard href={featured.slideUrl}>
        <FeatureCover
          thumbnail={featured.thumbnail}
          tag="#slides"
          id={featuredId}
          fallback={<FallbackCover />}
        />
        <FeatureBody
          meta={
            <>
              <FeatureBadge />
              <span className="tabular-nums">
                {formatDateDot(featured.publishedAt)}
              </span>
              {featured.event && (
                <>
                  <MetaSeparator />
                  <span className="truncate">{featured.event}</span>
                </>
              )}
            </>
          }
          title={featured.title}
          cta="slides / notes"
        />
      </FeatureCard>

      <ArchiveList items={rest.map((talk, i) => toRow(talk, i + 2))} />
    </section>
  );
}
