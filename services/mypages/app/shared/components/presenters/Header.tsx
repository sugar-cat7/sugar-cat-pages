import { useState } from "react";
import { Link, useLocation } from "react-router";
import { cn } from "~/shared/lib/utils";
import { Caret } from "./Caret";
import { StatusDot } from "./StatusDot";

function RssIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M6.18 15.64a2.18 2.18 0 1 1 0 4.36 2.18 2.18 0 0 1 0-4.36m12.64 4.36A14.82 14.82 0 0 0 4 5.18V8.8a11.18 11.18 0 0 1 11.2 11.2h3.62zm-5.82 0a9 9 0 0 0-9-9v3.64a5.36 5.36 0 0 1 5.36 5.36H13z" />
    </svg>
  );
}

const navLinks = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/blog", label: "writings" },
  { href: "/talks", label: "talks" },
  { href: "/works", label: "works" },
  { href: "/contact", label: "contact" },
];

export function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const isActivePath = (href: string) =>
    href === "/" ? currentPath === "/" : currentPath.startsWith(href);

  return (
    <header className="glass-topbar sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex items-baseline gap-2 font-mono text-sm"
        >
          <span className="text-mint" aria-hidden="true">
            $
          </span>
          <span className="font-display font-semibold tracking-tight text-foreground">
            sugar-cat
          </span>
          <Caret className="ml-0.5" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link, index) => {
            const isActive = isActivePath(link.href);
            const num = String(index + 1).padStart(2, "0");
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "group flex items-baseline gap-1.5 font-mono text-xs transition-colors duration-fast",
                  isActive
                    ? "text-mint"
                    : "text-foreground-soft hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "text-[10px] tabular-nums",
                    isActive ? "text-mint/80" : "text-muted-foreground",
                  )}
                >
                  {num}
                </span>
                <span className="tracking-wide">{link.label}</span>
              </Link>
            );
          })}
          <a
            href="/feed"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground-soft transition-colors duration-fast hover:text-mint"
            aria-label="RSS Feed"
            title="RSS Feed"
          >
            <RssIcon className="h-4 w-4" />
          </a>
          <div className="hidden items-center gap-2 border-l border-border pl-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground lg:flex">
            <StatusDot tone="mint" />
            <span>connected</span>
          </div>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-1 md:hidden">
          <a
            href="/feed"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-foreground-soft transition-colors duration-fast hover:text-mint"
            aria-label="RSS Feed"
            title="RSS Feed"
          >
            <RssIcon className="h-5 w-5" />
          </a>
          <button
            type="button"
            className="p-2 font-mono text-xs text-foreground-soft transition-colors duration-fast hover:text-foreground"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            {isMenuOpen ? "[ × ]" : "[ ≡ ]"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="border-t border-border bg-background/90 md:hidden">
          <div className="container mx-auto flex flex-col gap-1 px-4 py-3 sm:px-6">
            {navLinks.map((link, index) => {
              const isActive = isActivePath(link.href);
              const num = String(index + 1).padStart(2, "0");
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={closeMenu}
                  className={cn(
                    "flex items-baseline gap-2 border-l-2 px-3 py-2 font-mono text-sm transition-colors duration-fast",
                    isActive
                      ? "border-mint bg-mint/5 text-mint"
                      : "border-transparent text-foreground-soft hover:border-border hover:text-foreground",
                  )}
                >
                  <span className="text-[10px] text-muted-foreground tabular-nums">
                    {num}
                  </span>
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
