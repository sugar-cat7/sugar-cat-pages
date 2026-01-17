import type { Route } from "./+types/route";
import { BlogPage } from "./pages/containers/BlogPage";
import { generateMeta } from "~/shared/lib/seo";

export const meta: Route.MetaFunction = () =>
  generateMeta({
    title: "Blog | Sugar Cat",
    description:
      "Sugar Catの技術記事一覧。React、TypeScript、Web開発に関する記事を公開しています。",
    path: "/blog",
  });

export default function BlogRoute() {
  return <BlogPage />;
}
