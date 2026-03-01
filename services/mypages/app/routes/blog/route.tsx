import { generateMeta } from "~/shared/lib/seo";
import type { Route } from "./+types/route";
import { BlogPage } from "./pages/containers/BlogPage";

export const meta: Route.MetaFunction = () =>
  generateMeta({
    title: "Blog | Sugar Cat",
    description: "技術記事一覧",
    path: "/blog",
  });

export default function BlogRoute() {
  return <BlogPage />;
}
