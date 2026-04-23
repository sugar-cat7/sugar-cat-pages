import type { ReactNode } from "react";
import { ArrowIcon } from "./icons";

type FeatureCoverProps = {
  thumbnail?: string | null;
  tag: string;
  id: string;
  fallback?: ReactNode;
};

export function FeatureCover({
  thumbnail,
  tag,
  id,
  fallback,
}: FeatureCoverProps) {
  const hasThumbnail = Boolean(thumbnail);
  return (
    <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-card-raised">
      {hasThumbnail ? (
        <img
          src={thumbnail ?? undefined}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-90 transition-all duration-md group-hover:scale-[1.02] group-hover:opacity-100"
        />
      ) : (
        fallback
      )}

      {hasThumbnail && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in oklch, var(--palette-bg-900) 55%, transparent) 0%, transparent 35%, transparent 65%, color-mix(in oklch, var(--palette-bg-900) 55%, transparent) 100%)",
          }}
        />
      )}

      <span className="absolute left-4 top-4 z-[2] border border-mint/40 bg-mint/10 px-2 py-0.5 font-mono text-[11px] tracking-wider text-mint backdrop-blur-sm">
        {tag}
      </span>
      <span className="absolute right-4 top-4 z-[2] font-mono text-[10.5px] tracking-widest text-muted-foreground backdrop-blur-sm">
        {id}
      </span>
    </div>
  );
}

type FeatureBadgeProps = {
  children?: ReactNode;
};

export function FeatureBadge({ children = "featured" }: FeatureBadgeProps) {
  return (
    <span className="border border-mint/40 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-mint">
      {children}
    </span>
  );
}

type FeatureBodyProps = {
  meta: ReactNode;
  title: string;
  cta: string;
};

export function FeatureBody({ meta, title, cta }: FeatureBodyProps) {
  return (
    <div className="flex flex-col gap-3 px-5 py-5">
      <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-wider text-muted-foreground">
        {meta}
      </div>
      <h3 className="m-0 font-display text-[20px] font-bold leading-[1.35] tracking-tight text-foreground">
        {title}
      </h3>
      <span className="mt-auto inline-flex items-center gap-2 font-mono text-xs text-mint">
        {cta}
        <ArrowIcon className="h-3 w-3 transition-transform duration-fast group-hover:translate-x-1" />
      </span>
    </div>
  );
}

type FeatureCardProps = {
  href: string;
  children: ReactNode;
};

export function FeatureCard({ href, children }: FeatureCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden border border-border bg-card/70 transition-all duration-md hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-mint hover:shadow-[4px_4px_0_color-mix(in_oklch,theme(colors.mint)_30%,theme(colors.border))]"
    >
      {children}
    </a>
  );
}

type MetaSeparatorProps = {
  inline?: boolean;
};

export function MetaSeparator({ inline = false }: MetaSeparatorProps) {
  return (
    <span className="opacity-50" aria-hidden="true">
      {inline ? " · " : "·"}
    </span>
  );
}
