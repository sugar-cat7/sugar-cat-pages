import { WorksPagePresenter } from "../presenters/WorksPagePresenter";
import { projects } from "../../data/projects";

export function WorksPage() {
  return <WorksPagePresenter projects={projects} />;
}
