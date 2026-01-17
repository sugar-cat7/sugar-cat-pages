import { ProjectCard } from "../../components/presenters/ProjectCard";
import type { Project } from "../../data/projects";

type WorksPagePresenterProps = {
  projects: Project[];
};

export function WorksPagePresenter({ projects }: WorksPagePresenterProps) {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        {/* Page Header */}
        <div className="mb-10 sm:mb-16">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Works
          </h1>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
