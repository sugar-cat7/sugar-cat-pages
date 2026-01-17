import { AboutPagePresenter } from "../presenters/AboutPagePresenter";
import { profile } from "../../data/profile";

export function AboutPage() {
  return <AboutPagePresenter profile={profile} />;
}
