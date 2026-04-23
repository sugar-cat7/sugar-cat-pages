import type { ReactNode } from "react";
import { CodeName } from "~/shared/components/presenters/CodeName";
import { CornerBracket } from "~/shared/components/presenters/CornerBracket";
import {
  GitHubIcon,
  HatenaIcon,
  RssIcon,
  XIcon,
  ZennIcon,
} from "~/shared/components/presenters/icons";
import { MultiTypeWriter } from "~/shared/components/presenters/MultiTypeWriter";

type Social = {
  href: string;
  label: string;
  handle?: string;
  icon: ReactNode;
};

const socials: Social[] = [
  {
    href: "https://github.com/sugar-cat7",
    label: "github",
    handle: "/sugar-cat7",
    icon: <GitHubIcon className="h-3.5 w-3.5" />,
  },
  {
    href: "https://x.com/sugar235711",
    label: "x",
    handle: "/sugar235711",
    icon: <XIcon className="h-3.5 w-3.5" />,
  },
  {
    href: "https://zenn.dev/king",
    label: "zenn",
    handle: "/king",
    icon: <ZennIcon className="h-3.5 w-3.5" />,
  },
  {
    href: "https://sugar-cat.hatenablog.com/",
    label: "hatena",
    handle: "/sugar-cat",
    icon: <HatenaIcon className="h-3.5 w-3.5" />,
  },
  {
    href: "/feed",
    label: "rss",
    icon: <RssIcon className="h-3.5 w-3.5" />,
  },
];

const phrases = [
  "何でも屋さんです。",
  "infra · observability · realtime",
  "ご依頼等はXのDMまで。",
];

function AvatarFrame() {
  return (
    <div
      className="relative aspect-square overflow-hidden border border-border-strong"
      style={{
        background:
          "radial-gradient(circle at 50% 40%, color-mix(in oklch, var(--palette-mint) 18%, var(--palette-bg-700)) 0%, var(--palette-bg-700) 75%)",
        boxShadow:
          "0 0 0 1px var(--palette-line), 0 20px 40px -30px rgba(0,0,0,.7), inset 0 0 60px color-mix(in oklch, var(--palette-mint) 12%, transparent)",
      }}
    >
      <img
        src="/sugar-cat.png"
        alt="Sugar Cat avatar"
        className="absolute inset-[14%] h-[72%] w-[72%] object-contain opacity-95 mix-blend-screen"
        style={{
          filter:
            "grayscale(1) contrast(0.85) brightness(1.3) drop-shadow(0 0 18px color-mix(in oklch, var(--palette-mint) 60%, transparent))",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "repeating-linear-gradient(to bottom, transparent 0 3px, rgba(255,255,255,.04) 3px 4px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 z-[3] h-[12%] motion-safe:animate-[scan_5s_linear_infinite]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, color-mix(in oklch, var(--palette-mint) 30%, transparent) 50%, transparent 100%)",
          top: "-12%",
        }}
      />
      <CornerBracket position="tl" className="z-[4]" />
      <CornerBracket position="tr" className="z-[4]" />
      <CornerBracket position="bl" className="z-[4]" />
      <CornerBracket position="br" className="z-[4]" />
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="pt-12 pb-10 sm:pt-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid items-start gap-10 md:grid-cols-[320px_minmax(0,1fr)] md:gap-12">
          <div>
            <AvatarFrame />
          </div>

          <div className="min-w-0">
            <span className="mb-6 inline-flex items-center gap-2.5 border border-border bg-card/60 px-2.5 py-1 font-mono text-[11.5px] text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_8px_theme(colors.mint)] motion-safe:animate-[pulse-dot_2s_ease-in-out_infinite]" />
              <span>
                {"// root@sugar-cat.dev — session "}
                <span className="text-foreground-soft">#0x01</span>
              </span>
            </span>

            <CodeName name="Sugar Cat" />

            <div className="mt-4 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-sm text-foreground-soft">
              <span className="text-mint" aria-hidden="true">
                ▸
              </span>
              <span className="text-foreground-soft">software engineer</span>
              <span className="text-muted-foreground" aria-hidden="true">
                {"//"}
              </span>
              <MultiTypeWriter phrases={phrases} className="text-foreground" />
            </div>

            <div className="mt-4 mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-dashed border-border-strong pb-4 text-xs text-foreground-soft">
              <span className="inline-flex items-baseline gap-1.5">
                <span className="text-mint" aria-hidden="true">
                  ~/
                </span>
                <span>Tokyo, JP</span>
              </span>
              <span className="text-muted-foreground">·</span>
              <span>何でも屋</span>
              <span className="text-muted-foreground">·</span>
              <span>
                accepting offers via{" "}
                <a
                  href="https://x.com/sugar235711"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mint underline decoration-dotted underline-offset-[3px]"
                >
                  X DM
                </a>
              </span>
            </div>

            <ul className="flex flex-wrap gap-1.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      s.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group inline-flex items-center gap-2 border border-border bg-card/40 px-3 py-1.5 font-mono text-xs text-foreground-soft transition-all duration-fast hover:-translate-x-px hover:-translate-y-px hover:border-mint hover:bg-mint/10 hover:text-foreground hover:shadow-[2px_2px_0_color-mix(in_oklch,theme(colors.mint)_40%,theme(colors.border))]"
                  >
                    {s.icon}
                    <span>{s.label}</span>
                    {s.handle && (
                      <span className="text-muted-foreground transition-colors duration-fast group-hover:text-mint">
                        {s.handle}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
