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
    "inline-flex items-center justify-center font-medium rounded-md",
    "transition-all duration-fast",
    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    "px-4 py-2 text-sm",
  );

  const activeStyle = "bg-primary text-primary-foreground";
  const inactiveStyle = "bg-muted text-foreground hover:bg-muted/80";
  const disabledStyle =
    "opacity-50 pointer-events-none bg-muted text-foreground";

  // Generate page numbers to display
  const getPageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
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
    }

    return pages;
  };

  return (
    <nav
      className="flex items-center justify-center gap-2 mt-12"
      aria-label="Pagination"
    >
      {/* Previous button */}
      {hasPrev ? (
        <Link
          to={getPageUrl(currentPage - 1)}
          className={cn(buttonBase, inactiveStyle)}
          aria-label="Previous page"
        >
          Previous
        </Link>
      ) : (
        <span className={cn(buttonBase, disabledStyle)} aria-disabled="true">
          Previous
        </span>
      )}

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-foreground-soft"
            >
              ...
            </span>
          ) : (
            <Link
              key={page}
              to={getPageUrl(page)}
              className={cn(
                buttonBase,
                "min-w-[40px]",
                page === currentPage ? activeStyle : inactiveStyle,
              )}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </Link>
          ),
        )}
      </div>

      {/* Next button */}
      {hasNext ? (
        <Link
          to={getPageUrl(currentPage + 1)}
          className={cn(buttonBase, inactiveStyle)}
          aria-label="Next page"
        >
          Next
        </Link>
      ) : (
        <span className={cn(buttonBase, disabledStyle)} aria-disabled="true">
          Next
        </span>
      )}
    </nav>
  );
}
