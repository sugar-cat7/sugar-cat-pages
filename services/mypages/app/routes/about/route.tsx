import type { Route } from "./+types/route";
import { AboutPage } from "./pages/containers/AboutPage";
import { generateMeta } from "~/shared/lib/seo";

export const meta: Route.MetaFunction = () =>
  generateMeta({
    title: "About | Sugar Cat",
    description: "プロフィール",
    path: "/about",
  });

export default function AboutRoute() {
  return <AboutPage />;
}
