import { cn } from "~/shared/lib/utils";
import type { BlogPost } from "@my-pages/content-fetcher";

type ArticleCardProps = {
  post: BlogPost;
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

export function ArticleCard({ post }: ArticleCardProps) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg bg-card shadow-card transition-all duration-fast hover:shadow-action hover:-translate-y-0.5 overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="aspect-video overflow-hidden">
        {post.thumbnail ? (
          <img
            src={post.thumbnail}
            alt=""
            className="w-full h-full object-cover transition-transform duration-fast group-hover:scale-105"
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
                : post.source === "hatena"
                  ? "from-coral/20 via-coral/10 to-amber/20"
                  : "from-violet/20 via-violet/10 to-sky/20"
            )}
          >
            <span className="text-4xl opacity-50">
              {post.source === "zenn" ? "Z" : post.source === "hatena" ? "B" : "E"}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <time className="block text-xs text-muted-foreground tracking-wider mb-2">
          {formatDate(post.publishedAt)}
        </time>

        <h2 className="font-display text-base font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-fast">
          {post.title}
        </h2>

        <p className="text-sm text-foreground-soft line-clamp-2">
          {post.description}
        </p>
      </div>
    </a>
  );
}
