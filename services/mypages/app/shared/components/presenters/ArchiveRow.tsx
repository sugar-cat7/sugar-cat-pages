import { ArrowIcon } from "./icons";

export type ArchiveRowData = {
  id: string;
  href: string;
  date: string;
  tag: string;
  extra?: string;
  title: string;
  idx?: number;
};

type ArchiveRowProps = {
  item: ArchiveRowData;
  showIndex?: boolean;
};

export function ArchiveRow({ item, showIndex = true }: ArchiveRowProps) {
  const gridCols =
    showIndex && item.idx != null
      ? "grid-cols-[40px_1fr_20px]"
      : "grid-cols-[1fr_20px]";

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative grid flex-1 ${gridCols} items-center gap-3 border-b border-border px-4 py-3.5 transition-all duration-fast last:border-b-0 hover:bg-mint/5 hover:pl-[22px]`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-mint transition-all duration-fast group-hover:w-[3px]"
      />
      {showIndex && item.idx != null && (
        <span className="pt-0.5 font-mono text-[11px] tabular-nums text-muted-foreground">
          {String(item.idx).padStart(2, "0")}
        </span>
      )}
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex items-center gap-2 font-mono text-[10.5px] text-muted-foreground">
          <span className="tabular-nums">{item.date}</span>
          <Dot />
          <span className="text-mint">#{item.tag}</span>
          {item.extra && (
            <>
              <Dot />
              <span className="truncate">{item.extra}</span>
            </>
          )}
        </div>
        <div className="line-clamp-2 text-[13px] font-medium leading-snug text-foreground">
          {item.title}
        </div>
      </div>
      <ArrowIcon className="h-3.5 w-3.5 text-muted-foreground transition-all duration-fast group-hover:translate-x-1 group-hover:text-mint" />
    </a>
  );
}

function Dot() {
  return (
    <span aria-hidden="true" className="opacity-50">
      ·
    </span>
  );
}
