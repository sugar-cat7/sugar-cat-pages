import { PageHeader } from "~/shared/components/presenters/PageHeader";
import { TerminalPrompt } from "~/shared/components/presenters/TerminalPrompt";
import { ProjectCard } from "../../components/presenters/ProjectCard";
import type { ProjectGroup } from "../../data/projects";

type WorksPagePresenterProps = {
  groups: ProjectGroup[];
};

export function WorksPagePresenter({ groups }: WorksPagePresenterProps) {
  const visibleGroups = groups.filter((g) => g.projects.length > 0);
  const total = visibleGroups.reduce((n, g) => n + g.projects.length, 0);

  return (
    <div>
      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 md:py-24">
        <PageHeader
          title="works"
          command="ls ~/works"
          meta={
            <span>
              {total} project{total === 1 ? "" : "s"}
            </span>
          }
        />

        <div className="flex flex-col gap-12">
          {visibleGroups.map((group) => (
            <section key={group.id}>
              <div className="dashed-rule mb-5 pb-3">
                <TerminalPrompt className="mb-2 text-[11px]">
                  {group.command}
                </TerminalPrompt>
                <h2 className="m-0 flex items-baseline gap-2.5 font-display text-[20px] font-bold tracking-tight text-foreground">
                  <span
                    className="font-mono text-sm font-normal text-mint"
                    aria-hidden="true"
                  >
                    ~/
                  </span>
                  <span>{group.title}</span>
                  <span className="font-mono text-[12px] font-medium text-muted-foreground">
                    [{group.projects.length}]
                  </span>
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {group.projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
