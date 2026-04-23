import { ExtIcon } from "~/shared/components/presenters/icons";
import { WidgetHead } from "~/shared/components/presenters/WidgetHead";
import type { BiographyYear } from "../../types";

type BiographySectionProps = {
  biography: BiographyYear[];
};

export function BiographySection({ biography }: BiographySectionProps) {
  const totalEvents = biography.reduce((a, y) => a + y.activities.length, 0);
  return (
    <section className="flex h-full flex-col border border-border bg-card/70">
      <WidgetHead label="cat ./biography.log" meta={`${totalEvents} entries`} />
      <ol className="relative m-0 list-none pl-10 pr-5 py-5">
        <span
          aria-hidden="true"
          className="absolute bottom-5 left-[19px] top-8 w-px"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, var(--palette-line-2) 0 4px, transparent 4px 7px)",
          }}
        />
        {biography.map((yearData) => (
          <li key={yearData.year} className="relative py-3">
            <span
              aria-hidden="true"
              className="absolute -left-[25px] top-[18px] inline-block h-2 w-2 rotate-45 bg-mint shadow-[0_0_0_3px_var(--palette-bg-800),0_0_14px_color-mix(in_oklch,theme(colors.mint)_70%,transparent)]"
            />
            <div className="mb-1 flex items-baseline gap-2 font-mono text-[12px] tabular-nums text-mint">
              <span>{yearData.year}</span>
              <span className="font-mono text-[11px] font-normal text-muted-foreground">
                {`// ${yearData.activities.length} event${yearData.activities.length > 1 ? "s" : ""}`}
              </span>
            </div>
            <ul className="flex list-none flex-col gap-0.5 py-0 pl-0">
              {yearData.activities.map((activity) => {
                const label = (
                  <span className="flex-1 text-[12.5px] text-foreground transition-colors duration-fast group-hover:text-mint">
                    {activity.title}
                  </span>
                );
                const bullet = (
                  <span
                    aria-hidden="true"
                    className="font-mono text-muted-foreground"
                  >
                    └─
                  </span>
                );
                return (
                  <li key={activity.title} className="group">
                    {activity.url ? (
                      <a
                        href={activity.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 py-1 pr-2 transition-transform duration-fast hover:translate-x-[3px]"
                      >
                        {bullet}
                        {label}
                        <ExtIcon className="h-2.5 w-2.5 text-mint opacity-0 transition-opacity duration-fast group-hover:opacity-100" />
                      </a>
                    ) : (
                      <div className="flex items-center gap-2 py-1 pr-2">
                        {bullet}
                        {label}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
