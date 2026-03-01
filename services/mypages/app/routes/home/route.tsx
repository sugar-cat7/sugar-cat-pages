import {
  generateMeta,
  generatePersonSchema,
  generateWebSiteSchema,
} from "~/shared/lib/seo";
import type { Route } from "./+types/route";
import { HomePage } from "./pages/containers/HomePage";

export const meta: Route.MetaFunction = () => [
  ...generateMeta({
    title: "Sugar Cat | Software Engineer",
    description: "Sugar Catの技術記事、登壇資料、制作物を公開しています。",
    path: "/",
  }),
  generatePersonSchema(),
  generateWebSiteSchema(),
];

export default function HomeRoute() {
  return <HomePage />;
}
