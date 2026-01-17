import { ArticleCard } from "../../components/presenters/ArticleCard";
import { Pagination } from "~/shared/components/presenters/Pagination";
import type { BlogPost } from "@my-pages/content-fetcher";

type BlogPagePresenterProps = {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
};

export function BlogPagePresenter({
  posts,
  currentPage,
  totalPages,
}: BlogPagePresenterProps) {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        {/* Page Header */}
        <div className="mb-10 sm:mb-16">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Blog
          </h1>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {posts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/blog"
        />
      </div>
    </div>
  );
}
