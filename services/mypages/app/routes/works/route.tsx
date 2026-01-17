import type { Route } from "./+types/route";
import { WorksPage } from "./pages/containers/WorksPage";
import { generateMeta } from "~/shared/lib/seo";

export const meta: Route.MetaFunction = () =>
  generateMeta({
    title: "Works | Sugar Cat",
    description: "Sugar Catの個人制作一覧。",
    path: "/works",
  });

export default function WorksRoute() {
  return <WorksPage />;
}
