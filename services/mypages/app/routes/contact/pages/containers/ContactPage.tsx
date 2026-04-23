import { contact } from "../../data/contact";
import { ContactPagePresenter } from "../presenters/ContactPagePresenter";

export function ContactPage() {
  return <ContactPagePresenter contact={contact} />;
}
