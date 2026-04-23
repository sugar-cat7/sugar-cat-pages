import { generateMeta } from "~/shared/lib/seo";
import type { Route } from "./+types/route";
import { ContactPage } from "./pages/containers/ContactPage";

export const meta: Route.MetaFunction = () =>
  generateMeta({
    title: "Contact | Sugar Cat",
    description: "お問い合わせ",
    path: "/contact",
  });

export default function ContactRoute() {
  return <ContactPage />;
}
