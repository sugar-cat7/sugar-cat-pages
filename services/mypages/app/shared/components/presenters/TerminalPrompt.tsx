import type { ReactNode } from "react";
import { cn } from "~/shared/lib/utils";
import { Caret } from "./Caret";

type TerminalPromptProps = {
  symbol?: string;
  children: ReactNode;
  caret?: boolean;
  className?: string;
};

export function TerminalPrompt({
  symbol = "$",
  children,
  caret = false,
  className,
}: TerminalPromptProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-2 font-mono text-sm",
        className,
      )}
    >
      <span className="text-mint" aria-hidden="true">
        {symbol}
      </span>
      <span className="text-foreground">{children}</span>
      {caret && <Caret />}
    </span>
  );
}
