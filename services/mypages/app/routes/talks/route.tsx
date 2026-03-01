import { generateMeta } from "~/shared/lib/seo";
import type { Route } from "./+types/route";
import { TalksPage } from "./pages/containers/TalksPage";

export const meta: Route.MetaFunction = () =>
  generateMeta({
    title: "Talks | Sugar Cat",
    description: "登壇資料一覧",
    path: "/talks",
  });

export default function TalksRoute() {
  return <TalksPage />;
}
