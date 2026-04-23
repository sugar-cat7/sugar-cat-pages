import type { Talk } from "@my-pages/content-fetcher";
import type { ArchiveRowData } from "~/shared/components/presenters/ArchiveRow";
import { PageHeader } from "~/shared/components/presenters/PageHeader";
import { Pagination } from "~/shared/components/presenters/Pagination";
import {
  groupByYear,
  YearSection,
} from "~/shared/components/presenters/YearSection";
import { formatDateDot } from "~/shared/lib/format-date";
import { inferTalkSource } from "~/shared/lib/tag-color";

type TalksPagePresenterProps = {
  talks: Talk[];
  currentPage: number;
  totalPages: number;
};

function toRow(talk: Talk): ArchiveRowData {
  return {
    id: talk.id,
    href: talk.slideUrl,
    date: formatDateDot(talk.publishedAt),
    tag: inferTalkSource(talk.slideUrl),
    extra: talk.event,
    title: talk.title,
  };
}

export function TalksPagePresenter({
  talks,
  currentPage,
  totalPages,
}: TalksPagePresenterProps) {
  const groups = groupByYear(talks);

  return (
    <div>
      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 md:py-24">
        <PageHeader
          title="talks"
          command="ls -lt ~/talks"
          meta={
            <>
              <span>{talks.length} entries</span>
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
          baseUrl="/talks"
        />
      </div>
    </div>
  );
}
