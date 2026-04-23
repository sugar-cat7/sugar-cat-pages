export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border bg-background/60 py-8">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 font-mono text-[11.5px] text-muted-foreground sm:px-6">
        <span>
          <span className="text-mint" aria-hidden="true">
            $
          </span>{" "}
          echo &quot;thanks for scrolling&quot;
        </span>
        <span>
          © {currentYear} sugar-cat · built with{" "}
          <span className="text-mint" aria-hidden="true">
            ♥
          </span>{" "}
          &amp;{" "}
          <span className="text-mint" aria-hidden="true">
            &lt;/&gt;
          </span>
        </span>
      </div>
    </footer>
  );
}
