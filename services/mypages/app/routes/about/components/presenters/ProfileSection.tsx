import type { ReactNode } from "react";
import {
  GitHubIcon,
  HatenaIcon,
  XIcon,
  ZennIcon,
} from "~/shared/components/presenters/icons";
import { WidgetHead } from "~/shared/components/presenters/WidgetHead";
import type { Profile } from "../../data/profile";
import type { CertificationGroup } from "../../types";

type ProfileSectionProps = {
  profile: Profile;
};

type SocialKey = keyof Profile["social"];

const socialIcon: Partial<Record<SocialKey, ReactNode>> = {
  github: <GitHubIcon className="h-3 w-3" />,
  twitter: <XIcon className="h-3 w-3" />,
  zenn: <ZennIcon className="h-3 w-3" />,
  hatena: <HatenaIcon className="h-3 w-3" />,
};

const socialLabel: Record<SocialKey, string> = {
  github: "github",
  twitter: "x",
  zenn: "zenn",
  hatena: "hatena",
  scrapbox: "scrapbox",
};

function BioProse({ profile }: { profile: Profile }) {
  const paragraphs = profile.bio.split("\n").filter(Boolean);

  return (
    <article className="border border-border bg-card/70">
      <WidgetHead
        label="cat ./bio.md"
        meta={`${paragraphs.length + 2} lines`}
      />
      <div className="space-y-3 px-5 py-5 text-[13px] leading-[1.9] text-foreground">
        <p className="relative pl-8">
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 w-6 border-r border-border pr-2 text-right font-mono text-[11px] text-muted-foreground"
          >
            1
          </span>
          <strong className="font-medium text-foreground">
            {profile.name}
          </strong>
          . 都内で{" "}
          <code className="rounded-sm border border-mint/30 bg-mint/10 px-1 py-px font-mono text-[12px] text-mint">
            SWE
          </code>{" "}
          /{" "}
          <code className="rounded-sm border border-mint/30 bg-mint/10 px-1 py-px font-mono text-[12px] text-mint">
            SRE
          </code>{" "}
          をやっている。フロント〜インフラまで浅く広く。
        </p>
        <p className="relative pl-8">
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 w-6 border-r border-border pr-2 text-right font-mono text-[11px] text-muted-foreground"
          >
            2
          </span>
          スタートアップ、メガベンチャー、エンタープライズでの開発運用経験あり。最近は{" "}
          <code className="rounded-sm border border-mint/30 bg-mint/10 px-1 py-px font-mono text-[12px] text-mint">
            オブザーバビリティ
          </code>{" "}
          や{" "}
          <code className="rounded-sm border border-mint/30 bg-mint/10 px-1 py-px font-mono text-[12px] text-mint">
            Edge Computing
          </code>
          に興味あり。
        </p>
        {paragraphs.map((paragraph, i) => (
          <p key={paragraph} className="relative pl-8">
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 w-6 border-r border-border pr-2 text-right font-mono text-[11px] text-muted-foreground"
            >
              {i + 3}
            </span>
            {paragraph}
          </p>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5 border-t border-dashed border-border px-5 py-4">
        {(Object.keys(profile.social) as SocialKey[]).map((key) => (
          <a
            key={key}
            href={profile.social[key]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 border border-border bg-card/60 px-2.5 py-1 font-mono text-[11.5px] text-foreground-soft transition-colors duration-fast hover:border-mint hover:text-mint"
          >
            {socialIcon[key]}
            {socialLabel[key]}
          </a>
        ))}
      </div>
    </article>
  );
}

function SkillsCard({ profile }: { profile: Profile }) {
  const total = profile.skills.reduce((a, g) => a + g.items.length, 0);
  return (
    <article className="flex h-full flex-col border border-border bg-card/70">
      <WidgetHead label="cat ./stack.json" meta={`${total} items`} />
      <div className="px-4 pb-4 pt-3">
        {profile.skills.map((group, i) => (
          <div
            key={group.category}
            className={
              i < profile.skills.length - 1
                ? "border-b border-dashed border-border py-2.5"
                : "py-2.5"
            }
          >
            <div className="mb-2 font-mono text-[11px] lowercase tracking-wider text-muted-foreground">
              <span className="mr-1 text-mint" aria-hidden="true">
                ─
              </span>
              {group.category.toLowerCase()}
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="border border-border-strong bg-card-raised/40 px-2 py-0.5 font-mono text-[11.5px] text-foreground-soft transition-all duration-fast hover:-translate-y-px hover:border-mint hover:text-mint"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}

function CertsCard({ groups }: { groups: CertificationGroup[] }) {
  const total = groups.reduce((a, g) => a + g.certifications.length, 0);
  return (
    <article className="flex h-full flex-col border border-border bg-card/70">
      <WidgetHead label="cat ./certs.yaml" meta={`${total} entries`} />
      <div className="px-4 pb-4 pt-3">
        {groups.map((group, i) => (
          <div
            key={group.category}
            className={
              i < groups.length - 1
                ? "border-b border-dashed border-border py-2.5"
                : "py-2.5"
            }
          >
            <div className="mb-2 flex items-center gap-1.5 font-mono text-[11px] lowercase tracking-wider text-muted-foreground">
              <span className="text-mint" aria-hidden="true">
                ─
              </span>
              <span>{group.category.toLowerCase()}</span>
              <span className="ml-auto border border-border-strong px-1.5 py-px text-[10px] tracking-wider text-muted-foreground">
                {group.certifications.length}
              </span>
            </div>
            <ul className="flex list-none flex-col gap-1 pl-0.5">
              {group.certifications.map((cert) => (
                <li
                  key={cert.name}
                  className="flex items-baseline gap-2 font-mono text-[11.5px] leading-[1.55] text-foreground-soft"
                >
                  <span className="shrink-0 font-semibold text-mint">✓</span>
                  <span className="text-foreground">{cert.name}</span>
                  {cert.note && (
                    <span className="text-[10.5px] text-muted-foreground">
                      ({cert.note})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}

export function ProfileSection({ profile }: ProfileSectionProps) {
  return (
    <section className="space-y-4">
      <BioProse profile={profile} />
      <div className="grid gap-4 md:grid-cols-2">
        <SkillsCard profile={profile} />
        <CertsCard groups={profile.certificationGroups} />
      </div>
    </section>
  );
}
