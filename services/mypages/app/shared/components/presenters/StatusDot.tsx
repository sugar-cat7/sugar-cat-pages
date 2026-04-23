import { cn } from "~/shared/lib/utils";

type StatusDotProps = {
  tone?: "mint" | "amber" | "coral";
  className?: string;
};

const toneClass = {
  mint: "bg-mint shadow-[0_0_8px_theme(colors.mint)]",
  amber: "bg-amber shadow-[0_0_8px_theme(colors.amber)]",
  coral: "bg-coral shadow-[0_0_8px_theme(colors.coral)]",
} satisfies Record<"mint" | "amber" | "coral", string>;

export function StatusDot({ tone = "mint", className }: StatusDotProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block h-2 w-2 rounded-full",
        "motion-safe:animate-[pulse-dot_2s_ease-in-out_infinite]",
        toneClass[tone],
        className,
      )}
    />
  );
}
