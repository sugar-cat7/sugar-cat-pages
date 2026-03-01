import type { ReactNode } from "react";
import { cn } from "~/shared/lib/utils";

type TagVariant = "default" | "zenn" | "hatena" | "speakerdeck" | "external";

type TagProps = {
  variant?: TagVariant;
  children: ReactNode;
};

const variantStyles = {
  default: "bg-muted text-foreground-soft",
  zenn: "bg-sky/20 text-sky",
  hatena: "bg-coral/20 text-coral",
  speakerdeck: "bg-mint/20 text-mint",
  external: "bg-violet/20 text-violet",
} satisfies Record<TagVariant, string>;

export function Tag({ variant = "default", children }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium",
        variantStyles[variant],
      )}
    >
      {children}
    </span>
  );
}
