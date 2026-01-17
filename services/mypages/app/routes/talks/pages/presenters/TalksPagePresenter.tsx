import { TalkCard } from "../../components/presenters/TalkCard";
import { Pagination } from "~/shared/components/presenters/Pagination";
import type { Talk } from "@my-pages/content-fetcher";

type TalksPagePresenterProps = {
  talks: Talk[];
  currentPage: number;
  totalPages: number;
};

export function TalksPagePresenter({
  talks,
  currentPage,
  totalPages,
}: TalksPagePresenterProps) {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        {/* Page Header */}
        <div className="mb-10 sm:mb-16">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Talks
          </h1>
        </div>

        {/* Talks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {talks.map((talk) => (
            <TalkCard key={talk.id} talk={talk} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/talks"
        />
      </div>
    </div>
  );
}
