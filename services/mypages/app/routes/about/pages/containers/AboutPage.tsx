import { profile } from "../../data/profile";
import { AboutPagePresenter } from "../presenters/AboutPagePresenter";

export function AboutPage() {
  return <AboutPagePresenter profile={profile} />;
}
