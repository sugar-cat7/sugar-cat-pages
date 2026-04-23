import { ArchiveRow, type ArchiveRowData } from "./ArchiveRow";

type ArchiveListProps = {
  items: ArchiveRowData[];
  label?: string;
};

export function ArchiveList({ items, label = "archive" }: ArchiveListProps) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-1 flex-col border border-border bg-card/60">
      <div className="flex items-center justify-between border-b border-border bg-card-raised/50 px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-widest text-muted-foreground">
        <span>{label}</span>
        <span>{items.length} more</span>
      </div>
      <ul className="m-0 flex flex-1 list-none flex-col p-0">
        {items.map((item) => (
          <li key={item.id} className="flex flex-1 flex-col">
            <ArchiveRow item={item} showIndex />
          </li>
        ))}
      </ul>
    </div>
  );
}
