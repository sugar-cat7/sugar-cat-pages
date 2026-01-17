import type { Route } from "./+types/route";
import { AboutPage } from "./pages/containers/AboutPage";
import { generateMeta } from "~/shared/lib/seo";

export const meta: Route.MetaFunction = () =>
  generateMeta({
    title: "About | Sugar Cat",
    description:
      "Sugar Catのプロフィール。スキル、経歴、活動内容をご紹介します。",
    path: "/about",
  });

export default function AboutRoute() {
  return <AboutPage />;
}
