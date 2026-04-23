import type { ReactNode } from "react";
import { cn } from "~/shared/lib/utils";

type WidgetHeadProps = {
  sigil?: string;
  label: ReactNode;
  meta?: ReactNode;
  className?: string;
};

export function WidgetHead({
  sigil = "$",
  label,
  meta,
  className,
}: WidgetHeadProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-border bg-card-raised/50 px-3.5 py-2 font-mono text-[11px] text-foreground-soft",
        className,
      )}
    >
      <span>
        <span className="mr-1.5 text-mint" aria-hidden="true">
          {sigil}
        </span>
        {label}
      </span>
      {meta && (
        <span className="font-mono text-[10px] text-muted-foreground">
          {meta}
        </span>
      )}
    </div>
  );
}
