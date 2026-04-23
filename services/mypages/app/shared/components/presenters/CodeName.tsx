export function CodeName({ name }: { name: string }) {
  return (
    <h1 className="m-0 flex flex-col font-display text-[clamp(40px,7vw,76px)] font-bold leading-[1.02] tracking-[-0.03em]">
      <span className="block">
        <span className="font-normal text-muted-foreground">const</span>{" "}
        <span className="text-mint">name</span>{" "}
        <span className="font-normal text-muted-foreground">=</span>
      </span>
      <span className="block">
        <span className="text-foreground">&quot;{name}&quot;</span>
        <span className="font-normal text-muted-foreground">;</span>
      </span>
    </h1>
  );
}
