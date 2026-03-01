import { useSearchParams } from "react-router";
import { validateTalks } from "~/shared/lib/validate-json";
import talksJson from "../../data/talks.json";
import { TalksPagePresenter } from "../presenters/TalksPagePresenter";

const talks = validateTalks(talksJson);
const ITEMS_PER_PAGE = 50;

export function TalksPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(talks.length / ITEMS_PER_PAGE);
  const paginatedTalks = talks.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <TalksPagePresenter
      talks={paginatedTalks}
      currentPage={page}
      totalPages={totalPages}
    />
  );
}
