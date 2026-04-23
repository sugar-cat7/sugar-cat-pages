import { useEffect, useRef, useState } from "react";
import {
  ArrowIcon,
  ExtIcon,
  GitHubIcon,
} from "~/shared/components/presenters/icons";
import type { Project } from "../../data/projects";

type ProjectCardProps = {
  project: Project;
};

function FallbackArtwork({ name }: { name: string }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(155deg, color-mix(in oklch, var(--palette-mint) 40%, var(--palette-bg-700)) 0%, var(--palette-bg-700) 100%)",
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 wg-grid-fx" />
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pt-8 font-display text-[28px] font-bold tracking-tight text-foreground"
        style={{ textShadow: "0 2px 20px rgba(0,0,0,.4)" }}
      >
        {name}
      </div>
    </>
  );
}

function RedactedArtwork() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(155deg, color-mix(in oklch, var(--palette-bg-700) 85%, #000) 0%, var(--palette-bg-900) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[36px] bottom-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, color-mix(in oklch, var(--palette-fg) 10%, transparent) 0 2px, transparent 2px 6px)",
          filter: "blur(1.5px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-6 top-[64px] flex flex-col gap-2"
      >
        {[70, 55, 80, 45].map((w) => (
          <span
            key={w}
            className="block h-3 bg-foreground/40 blur-[2px]"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center pt-8">
        <div className="flex flex-col items-center gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[.35em] text-muted-foreground">
            classified
          </span>
          <span className="font-display text-[22px] font-bold tracking-[.2em] text-foreground/85">
            ██████████
          </span>
          <span className="font-mono text-[10px] tracking-widest text-mint/80">
            access restricted
          </span>
        </div>
      </div>
    </>
  );
}

type LinkKey = "github" | "page" | "article";

const linkLabel: Record<LinkKey, string> = {
  github: "github",
  page: "page",
  article: "article",
};

function ProjectThumb({ project }: { project: Project }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageFailed, setImageFailed] = useState(false);
  const addr = project.secret ? "classified.internal" : `${project.id}.app`;
  const showImage = !project.secret && Boolean(project.ogImage) && !imageFailed;

  // onError doesn't fire if the browser already finished the failed load
  // before React hydrated — check imperatively after mount.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) {
      setImageFailed(true);
    }
  }, []);

  return (
    <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-card-raised">
      {/* macOS chrome */}
      <div
        className="absolute inset-x-0 top-0 z-[3] flex items-center gap-1.5 border-b border-border/60 px-2.5 py-2"
        style={{
          background:
            "color-mix(in oklch, var(--palette-bg-900) 70%, transparent)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <span
          aria-hidden="true"
          className="inline-block h-2 w-2 rounded-full bg-coral"
        />
        <span
          aria-hidden="true"
          className="inline-block h-2 w-2 rounded-full bg-amber"
        />
        <span
          aria-hidden="true"
          className="inline-block h-2 w-2 rounded-full bg-mint"
        />
        <span className="ml-2 font-mono text-[10.5px] text-foreground-soft">
          {addr}
        </span>
      </div>

      {showImage ? (
        <img
          ref={imgRef}
          src={project.ogImage}
          alt=""
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="absolute inset-x-0 bottom-0 top-[36px] h-auto w-full object-cover"
        />
      ) : project.secret ? (
        <RedactedArtwork />
      ) : (
        <FallbackArtwork name={project.name} />
      )}

      {/* Chip badge */}
      <span className="absolute bottom-2.5 right-2.5 z-[2] border border-mint/50 bg-mint/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-mint backdrop-blur-sm">
        {project.chip}
      </span>
    </div>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const linkEntries: Array<[LinkKey, string]> = (
    ["github", "page", "article"] as const
  ).flatMap((key) => {
    const href = project.links[key];
    return href ? [[key, href] satisfies [LinkKey, string]] : [];
  });

  return (
    <article className="group flex flex-col overflow-hidden border border-border bg-card/70 transition-all duration-md hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-mint hover:shadow-[4px_4px_0_color-mix(in_oklch,theme(colors.mint)_30%,theme(colors.border))]">
      <ProjectThumb project={project} />

      <div className="flex flex-col gap-2.5 px-5 py-4">
        <h2 className="m-0 font-display text-[17px] font-semibold tracking-tight text-foreground">
          <span className="text-mint" aria-hidden="true">
            ~/
          </span>
          {project.name}
        </h2>
        <p className="m-0 text-[12.5px] leading-[1.6] text-foreground-soft">
          {project.description}
        </p>

        {linkEntries.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {linkEntries.map(([key, href]) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-border px-2.5 py-1 font-mono text-[11.5px] text-foreground-soft transition-colors duration-fast hover:border-mint hover:bg-mint/10 hover:text-mint"
              >
                {key === "github" ? (
                  <GitHubIcon className="h-3 w-3" />
                ) : (
                  <ExtIcon className="h-3 w-3" />
                )}
                {linkLabel[key]}
                <ArrowIcon className="h-2.5 w-2.5" />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
