import type { ReactNode } from "react";
import { Link } from "react-router";
import { ArrowIcon } from "./icons";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  count?: number;
  icon?: ReactNode;
  linkHref?: string;
  linkLabel?: string;
  right?: ReactNode;
};

export function SectionHeading({
  title,
  subtitle,
  count,
  icon,
  linkHref,
  linkLabel = "view all",
  right,
}: SectionHeadingProps) {
  const rightEl =
    right ??
    (linkHref ? (
      <Link
        to={linkHref}
        className="group inline-flex items-center gap-2 border border-border px-3 py-1.5 font-mono text-xs text-foreground-soft transition-colors duration-fast hover:border-mint hover:bg-mint/10 hover:text-mint"
      >
        <span>{linkLabel}</span>
        <ArrowIcon className="h-3 w-3 transition-transform duration-fast group-hover:translate-x-0.5" />
      </Link>
    ) : null);

  return (
    <div
      aria-hidden="false"
      className="dashed-rule mb-4 flex items-start justify-between gap-6 pb-3.5"
    >
      <div className="flex items-baseline gap-2.5">
        <h2 className="flex items-center gap-2.5 font-display text-[22px] font-bold tracking-tight text-foreground">
          {icon && <span className="inline-flex text-mint">{icon}</span>}
          <span className="flex items-baseline gap-1.5">
            <span
              className="font-mono text-base font-normal text-mint"
              aria-hidden="true"
            >
              ~/
            </span>
            <span>{title}</span>
          </span>
          {count != null && (
            <span className="font-mono text-[13px] font-medium text-muted-foreground">
              [{count}]
            </span>
          )}
        </h2>
        {subtitle && (
          <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
            {subtitle}
          </span>
        )}
      </div>
      {rightEl}
    </div>
  );
}
