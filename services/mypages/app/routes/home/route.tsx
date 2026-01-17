import type { Route } from "./+types/route";
import { HomePage } from "./pages/containers/HomePage";
import { generateMeta, generatePersonSchema, generateWebSiteSchema } from "~/shared/lib/seo";

export const meta: Route.MetaFunction = () => [
  ...generateMeta({
    title: "Sugar Cat | Software Engineer",
    description:
      "Sugar Catのポートフォリオサイト。技術記事、登壇資料、制作物を公開しています。",
    path: "/",
  }),
  generatePersonSchema(),
  generateWebSiteSchema(),
];

export default function HomeRoute() {
  return <HomePage />;
}
