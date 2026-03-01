import type { BlogPost } from "@my-pages/content-fetcher";
import { SectionHeading } from "~/shared/components/presenters/SectionHeading";
import { cn } from "~/shared/lib/utils";

type LatestPostsSectionProps = {
  posts: BlogPost[];
};

function formatDateDot(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

export function LatestPostsSection({ posts }: LatestPostsSectionProps) {
  return (
    <section>
      <SectionHeading title="Latest Posts" linkHref="/blog" />

      {/* anycolor-style vertical list with dividers */}
      <div className="divide-y divide-border">
        {posts.map((post) => {
          return (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block py-6 first:pt-0"
            >
              {/* Main Content Grid: Thumbnail + Details */}
              <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 sm:gap-6">
                {/* Thumbnail */}
                <div className="aspect-video rounded-md overflow-hidden">
                  {post.thumbnail ? (
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className={cn(
                        "w-full h-full object-cover",
                        "transition-all duration-fast",
                        "group-hover:scale-105",
                      )}
                    />
                  ) : (
                    <div
                      className={cn(
                        "w-full h-full flex items-center justify-center",
                        "bg-gradient-to-br",
                        "transition-all duration-fast",
                        "group-hover:scale-105",
                        post.source === "zenn"
                          ? "from-sky/20 via-sky/10 to-mint/20"
                          : "from-coral/20 via-coral/10 to-amber/20",
                      )}
                    >
                      <span className="text-4xl opacity-50">
                        {post.source === "zenn" ? "Z" : "B"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center">
                  {/* Date (YYYY.MM.DD format) */}
                  <time className="text-xs text-muted-foreground mb-2 tracking-wider">
                    {formatDateDot(post.publishedAt)}
                  </time>

                  {/* Title */}
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-fast">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-foreground-soft leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
