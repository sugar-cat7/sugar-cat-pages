import type { BlogPost } from "@my-pages/content-fetcher";
import type { ArchiveRowData } from "~/shared/components/presenters/ArchiveRow";
import { PageHeader } from "~/shared/components/presenters/PageHeader";
import { Pagination } from "~/shared/components/presenters/Pagination";
import {
  groupByYear,
  YearSection,
} from "~/shared/components/presenters/YearSection";
import { estimateReadMin, formatDateDot } from "~/shared/lib/format-date";

type BlogPagePresenterProps = {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
};

function toRow(post: BlogPost): ArchiveRowData {
  return {
    id: post.id,
    href: post.url,
    date: formatDateDot(post.publishedAt),
    tag: post.source,
    extra: `${estimateReadMin(post.description)} min`,
    title: post.title,
  };
}

export function BlogPagePresenter({
  posts,
  currentPage,
  totalPages,
}: BlogPagePresenterProps) {
  const groups = groupByYear(posts);

  return (
    <div>
      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 md:py-24">
        <PageHeader
          title="writings"
          command="ls -lt ~/writings"
          meta={
            <>
              <span>{posts.length} entries</span>
              <span className="opacity-50">·</span>
              <span>
                page {currentPage} / {totalPages}
              </span>
            </>
          }
        />

        <div className="space-y-10">
          {groups.map(([year, items]) => (
            <YearSection key={year} year={year} items={items.map(toRow)} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/blog"
        />
      </div>
    </div>
  );
}
