import { Link } from "react-router";

type SectionHeadingProps = {
  title: string;
  linkHref?: string;
  linkLabel?: string;
};

export function SectionHeading({
  title,
  linkHref,
  linkLabel = "View All",
}: SectionHeadingProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      {linkHref && (
        <Link
          to={linkHref}
          className="text-sm text-foreground-soft hover:text-accent transition-colors duration-fast flex items-center gap-1"
        >
          {linkLabel}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}
