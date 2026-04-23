import type { ReactNode } from "react";
import { TerminalPrompt } from "./TerminalPrompt";

type PageHeaderProps = {
  title: string;
  command: string;
  meta?: ReactNode;
};

export function PageHeader({ title, command, meta }: PageHeaderProps) {
  return (
    <header className="mb-10 border-b border-dashed border-border-strong pb-6">
      <TerminalPrompt className="mb-3 text-xs">{command}</TerminalPrompt>
      <h1 className="m-0 flex items-baseline font-display text-[clamp(48px,8vw,96px)] font-bold leading-[0.95] tracking-[-0.03em]">
        <span className="font-normal text-mint" aria-hidden="true">
          ~/
        </span>
        <span>{title}</span>
      </h1>
      {meta && (
        <div className="mt-3 flex flex-wrap items-center gap-2.5 font-mono text-xs text-foreground-soft">
          {meta}
        </div>
      )}
    </header>
  );
}
