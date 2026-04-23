import { cn } from "~/shared/lib/utils";

type CaretProps = {
  className?: string;
};

export function Caret({ className }: CaretProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block h-[1em] w-[0.55em] translate-y-[0.12em] bg-mint align-baseline",
        "motion-safe:animate-[blink_1s_steps(2,end)_infinite]",
        className,
      )}
    />
  );
}
