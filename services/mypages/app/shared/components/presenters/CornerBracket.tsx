import { cn } from "~/shared/lib/utils";

type Position = "tl" | "tr" | "bl" | "br";

type CornerBracketProps = {
  position: Position;
  size?: number;
  className?: string;
};

const positionClass: Record<Position, string> = {
  tl: "top-0 left-0 border-t-2 border-l-2",
  tr: "top-0 right-0 border-t-2 border-r-2",
  bl: "bottom-0 left-0 border-b-2 border-l-2",
  br: "bottom-0 right-0 border-b-2 border-r-2",
};

export function CornerBracket({
  position,
  size = 14,
  className,
}: CornerBracketProps) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={cn(
        "pointer-events-none absolute border-mint",
        positionClass[position],
        className,
      )}
    />
  );
}
