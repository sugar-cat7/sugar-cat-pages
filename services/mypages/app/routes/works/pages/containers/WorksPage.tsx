import { projectGroups } from "../../data/projects";
import { WorksPagePresenter } from "../presenters/WorksPagePresenter";

export function WorksPage() {
  return <WorksPagePresenter groups={projectGroups} />;
}
