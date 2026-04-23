import { Link } from "react-router";
import { cn } from "~/shared/lib/utils";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
};

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const getPageUrl = (page: number) => `${baseUrl}?page=${page}`;

  const buttonBase = cn(
    "inline-flex items-center justify-center font-mono text-xs",
    "border border-border bg-transparent",
    "transition-colors duration-fast",
    "px-3 py-1.5",
  );

  const activeStyle = "border-mint text-mint bg-mint/10";
  const inactiveStyle =
    "text-foreground-soft hover:border-mint/60 hover:text-mint";
  const disabledStyle = "opacity-40 pointer-events-none text-foreground-soft";

  const getPageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push("...");
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav
      className="mt-12 flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      {hasPrev ? (
        <Link
          to={getPageUrl(currentPage - 1)}
          className={cn(buttonBase, inactiveStyle)}
          aria-label="Previous page"
        >
          ‹ prev
        </Link>
      ) : (
        <span className={cn(buttonBase, disabledStyle)} aria-disabled="true">
          ‹ prev
        </span>
      )}

      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 font-mono text-xs text-muted-foreground"
            >
              ...
            </span>
          ) : (
            <Link
              key={page}
              to={getPageUrl(page)}
              className={cn(
                buttonBase,
                "min-w-[40px] tabular-nums",
                page === currentPage ? activeStyle : inactiveStyle,
              )}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {String(page).padStart(2, "0")}
            </Link>
          ),
        )}
      </div>

      {hasNext ? (
        <Link
          to={getPageUrl(currentPage + 1)}
          className={cn(buttonBase, inactiveStyle)}
          aria-label="Next page"
        >
          next ›
        </Link>
      ) : (
        <span className={cn(buttonBase, disabledStyle)} aria-disabled="true">
          next ›
        </span>
      )}
    </nav>
  );
}
