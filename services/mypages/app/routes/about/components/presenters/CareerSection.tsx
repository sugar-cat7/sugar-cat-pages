import { WidgetHead } from "~/shared/components/presenters/WidgetHead";
import type { CareerItem } from "../../types";

type CareerSectionProps = {
  career: CareerItem[];
};

export function CareerSection({ career }: CareerSectionProps) {
  return (
    <section className="flex h-full flex-col border border-border bg-card/70">
      <WidgetHead
        label="cat ./career.log"
        meta={`${career.length} positions`}
      />
      <ol className="relative m-0 list-none pl-10 pr-5 py-5">
        <span
          aria-hidden="true"
          className="absolute bottom-5 left-[19px] top-8 w-px"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, var(--palette-line-2) 0 4px, transparent 4px 7px)",
          }}
        />
        {career.map((item) => (
          <li key={`${item.company}-${item.period}`} className="relative py-3">
            <span
              aria-hidden="true"
              className="absolute -left-[25px] top-[18px] inline-block h-2 w-2 rotate-45 bg-mint shadow-[0_0_0_3px_var(--palette-bg-800),0_0_14px_color-mix(in_oklch,theme(colors.mint)_70%,transparent)]"
            />
            <div className="mb-1 font-mono text-[12px] tabular-nums text-mint">
              {item.period}
            </div>
            <h3 className="font-display text-[14px] font-semibold leading-tight text-foreground">
              {item.company}
            </h3>
            <p className="font-mono text-[11.5px] text-muted-foreground">
              {item.role}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
