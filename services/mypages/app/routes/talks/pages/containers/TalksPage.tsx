import { useSearchParams } from "react-router";
import { TalksPagePresenter } from "../presenters/TalksPagePresenter";
import talksJson from "../../data/talks.json";
import { validateTalks } from "~/shared/lib/validate-json";

const talks = validateTalks(talksJson);
const ITEMS_PER_PAGE = 50;

export function TalksPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(talks.length / ITEMS_PER_PAGE);
  const paginatedTalks = talks.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <TalksPagePresenter
      talks={paginatedTalks}
      currentPage={page}
      totalPages={totalPages}
    />
  );
}
