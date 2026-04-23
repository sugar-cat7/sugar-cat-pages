import { useEffect, useState, useSyncExternalStore } from "react";
import { Caret } from "./Caret";

type MultiTypeWriterProps = {
  phrases: string[];
  speedMs?: number;
  pauseMs?: number;
  className?: string;
};

function subscribeReducedMotion(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function MultiTypeWriter({
  phrases,
  speedMs = 55,
  pauseMs = 1600,
  className,
}: MultiTypeWriterProps) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerSnapshot,
  );

  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setSub(phrases[idx] ?? "");
      return;
    }
    const current = phrases[idx] ?? "";
    if (!del && sub === current) {
      const t = window.setTimeout(() => setDel(true), pauseMs);
      return () => window.clearTimeout(t);
    }
    if (del && sub === "") {
      setDel(false);
      setIdx((prev) => (prev + 1) % phrases.length);
      return;
    }
    const t = window.setTimeout(
      () => {
        setSub(
          del
            ? current.slice(0, Math.max(sub.length - 1, 0))
            : current.slice(0, sub.length + 1),
        );
      },
      del ? speedMs / 2 : speedMs,
    );
    return () => window.clearTimeout(t);
  }, [sub, del, idx, phrases, speedMs, pauseMs, prefersReducedMotion]);

  return (
    <span className={className}>
      <span className="text-foreground">{sub}</span>
      <Caret className="ml-1" />
    </span>
  );
}
