import { ArchiveRow, type ArchiveRowData } from "./ArchiveRow";

type YearSectionProps = {
  year: string;
  items: ArchiveRowData[];
  showIndex?: boolean;
};

export function YearSection({
  year,
  items,
  showIndex = false,
}: YearSectionProps) {
  return (
    <section>
      <div className="mb-3 flex items-baseline gap-3 border-b border-dashed border-border pb-2">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          year
        </span>
        <h2 className="font-display text-xl font-semibold tabular-nums text-mint">
          {year}
        </h2>
        <span className="font-mono text-[11px] text-muted-foreground">
          ({items.length})
        </span>
      </div>
      <ul className="m-0 flex list-none flex-col border border-border bg-card/60 p-0">
        {items.map((item, i) => (
          <li key={item.id} className="flex flex-col">
            <ArchiveRow
              item={{ ...item, idx: showIndex ? i + 1 : undefined }}
              showIndex={showIndex}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function groupByYear<T extends { publishedAt: string }>(
  items: T[],
): Array<[string, T[]]> {
  const buckets = new Map<string, T[]>();
  for (const item of items) {
    const year = String(new Date(item.publishedAt).getFullYear());
    const list = buckets.get(year);
    if (list) {
      list.push(item);
    } else {
      buckets.set(year, [item]);
    }
  }
  return [...buckets.entries()].sort(([a], [b]) => (a < b ? 1 : -1));
}
