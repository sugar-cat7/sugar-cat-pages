import { generateMeta } from "~/shared/lib/seo";
import type { Route } from "./+types/route";
import { WorksPage } from "./pages/containers/WorksPage";

export const meta: Route.MetaFunction = () =>
  generateMeta({
    title: "Works | Sugar Cat",
    description: "個人制作一覧",
    path: "/works",
  });

export default function WorksRoute() {
  return <WorksPage />;
}
