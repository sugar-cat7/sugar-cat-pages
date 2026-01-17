import type { Route } from "./+types/route";
import { TalksPage } from "./pages/containers/TalksPage";
import { generateMeta } from "~/shared/lib/seo";

export const meta: Route.MetaFunction = () =>
  generateMeta({
    title: "Talks | Sugar Cat",
    description:
      "Sugar Catの登壇資料一覧。勉強会やカンファレンスでの発表資料を公開しています。",
    path: "/talks",
  });

export default function TalksRoute() {
  return <TalksPage />;
}
