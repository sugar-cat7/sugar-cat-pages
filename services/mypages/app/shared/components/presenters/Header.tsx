import { useState } from "react";
import { Link, useLocation } from "react-router";
import { cn } from "~/shared/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

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
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/talks", label: "Talks" },
  { href: "/works", label: "Works" },
];

export function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-center relative">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? currentPath === "/"
                : currentPath.startsWith(link.href);

            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-fast",
                  isActive
                    ? "text-foreground border-b-2 border-accent pb-0.5"
                    : "text-foreground-soft hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="/feed"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground-soft hover:text-foreground transition-colors duration-fast"
            aria-label="RSS Feed"
            title="RSS Feed"
          >
            <RssIcon className="w-5 h-5" />
          </a>
          <ThemeToggle />
        </nav>

        {/* Mobile Controls */}
        <div className="md:hidden absolute right-4 flex items-center gap-1">
          <a
            href="/feed"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-foreground-soft hover:text-foreground transition-colors duration-fast"
            aria-label="RSS Feed"
            title="RSS Feed"
          >
            <RssIcon className="w-5 h-5" />
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="p-2 text-foreground-soft hover:text-foreground transition-colors duration-fast"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden border-b border-border bg-background shadow-card">
          <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? currentPath === "/"
                  : currentPath.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={closeMenu}
                  className={cn(
                    "text-base font-medium py-3 px-2 rounded-md transition-colors duration-fast",
                    isActive
                      ? "text-foreground bg-accent/10"
                      : "text-foreground-soft hover:text-foreground hover:bg-muted"
                  )}
                >
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
