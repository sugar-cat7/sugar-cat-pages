import { useSearchParams } from "react-router";
import { BlogPagePresenter } from "../presenters/BlogPagePresenter";
import postsJson from "../../data/posts.json";
import { validatePosts } from "~/shared/lib/validate-json";

const posts = validatePosts(postsJson);
const ITEMS_PER_PAGE = 50;

export function BlogPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <BlogPagePresenter
      posts={paginatedPosts}
      currentPage={page}
      totalPages={totalPages}
    />
  );
}
