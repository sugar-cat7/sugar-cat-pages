import type { BlogPost } from "@my-pages/content-fetcher";
import { ArchiveList } from "~/shared/components/presenters/ArchiveList";
import type { ArchiveRowData } from "~/shared/components/presenters/ArchiveRow";
import {
  FeatureBadge,
  FeatureBody,
  FeatureCard,
  FeatureCover,
  MetaSeparator,
} from "~/shared/components/presenters/FeatureCard";
import { PenIcon } from "~/shared/components/presenters/icons";
import { SectionHeading } from "~/shared/components/presenters/SectionHeading";
import { estimateReadMin, formatDateDot } from "~/shared/lib/format-date";

type LatestPostsSectionProps = {
  posts: BlogPost[];
};

function FallbackSnippet() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, color-mix(in oklch, var(--palette-mint) 25%, transparent) 0%, transparent 50%), radial-gradient(circle at 20% 80%, color-mix(in oklch, var(--palette-violet) 20%, transparent) 0%, transparent 50%)",
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 pf-cover-grid" />
      <pre className="pointer-events-none absolute inset-x-4 bottom-3.5 m-0 overflow-hidden whitespace-pre border border-border-strong bg-background/60 px-3 py-2.5 font-mono text-[11px] leading-[1.6] text-foreground-soft backdrop-blur-sm">
        {`$ git push origin main
 [cloudflare] deploying...
 [d1] applying migration...
 ─────────────────────────────
 ✓ build complete`}
      </pre>
    </>
  );
}

function toRow(post: BlogPost, idx: number): ArchiveRowData {
  return {
    id: post.id,
    href: post.url,
    idx,
    date: formatDateDot(post.publishedAt),
    tag: post.source,
    extra: `${estimateReadMin(post.description)} min`,
    title: post.title,
  };
}

export function LatestPostsSection({ posts }: LatestPostsSectionProps) {
  if (posts.length === 0) return null;
  const [featured, ...rest] = posts;
  const featuredId = `POST_${String(posts.length).padStart(3, "0")}`;

  return (
    <section className="flex h-full flex-col gap-3 lg:row-span-3 lg:grid lg:grid-rows-subgrid lg:gap-0 lg:gap-y-3">
      <SectionHeading
        title="writings"
        subtitle="// ls -lt ./posts | head"
        count={posts.length}
        icon={<PenIcon className="h-4 w-4" />}
        linkHref="/blog"
      />

      <FeatureCard href={featured.url}>
        <FeatureCover
          thumbnail={featured.thumbnail}
          tag={`#${featured.source}`}
          id={featuredId}
          fallback={<FallbackSnippet />}
        />
        <FeatureBody
          meta={
            <>
              <FeatureBadge />
              <span className="tabular-nums">
                {formatDateDot(featured.publishedAt)}
              </span>
              <MetaSeparator />
              <span>{estimateReadMin(featured.description)} min</span>
            </>
          }
          title={featured.title}
          cta="続きを読む"
        />
      </FeatureCard>

      <ArchiveList items={rest.map((post, i) => toRow(post, i + 2))} />
    </section>
  );
}
