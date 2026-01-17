import type { Profile } from "../../data/profile";

type ProfileSectionProps = {
  profile: Profile;
};

export function ProfileSection({ profile }: ProfileSectionProps) {
  return (
    <section className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12 items-start">
      {/* Avatar */}
      <div className="shrink-0">
        <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-coral/30 via-sky/20 to-mint/30 p-1">
          <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden shadow-card">
            <img
              src="/sugar-cat.png"
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1">
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          {profile.name}
        </h2>
        <p className="text-foreground-soft text-lg mb-1">{profile.title}</p>
        <p className="text-muted-foreground flex items-center gap-2 mb-6">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {profile.location}
        </p>

        {/* Social links */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground-soft hover:text-accent transition-colors duration-fast"
            aria-label="GitHub"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href={profile.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground-soft hover:text-accent transition-colors duration-fast"
            aria-label="X (Twitter)"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href={profile.social.zenn}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground-soft hover:text-accent transition-colors duration-fast"
            aria-label="Zenn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.264 23.771h4.984c.264 0 .498-.147.645-.352L19.614.874c.176-.293-.029-.645-.381-.645h-4.72c-.235 0-.44.117-.557.323L.03 23.361c-.088.176.029.41.234.41zM17.445 23.419l6.479-10.408c.205-.323-.029-.733-.41-.733h-4.691c-.176 0-.352.088-.44.235l-6.655 10.643c-.176.264.029.616.352.616h4.779c.234-.001.468-.118.586-.353z" />
            </svg>
          </a>
          <a
            href={profile.social.hatena}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground-soft hover:text-accent transition-colors duration-fast"
            aria-label="Hatena"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 300 300">
              <path d="M149.999 248.909c-54.537 0-98.906-44.367-98.906-98.909 0-54.537 44.369-98.909 98.906-98.909 54.545 0 98.908 44.372 98.908 98.909 0 54.542-44.363 98.909-98.908 98.909zm0-185.238c-47.601 0-86.33 38.723-86.33 86.329 0 47.605 38.729 86.332 86.33 86.332 47.61 0 86.338-38.727 86.338-86.332 0-47.606-38.728-86.329-86.338-86.329zM161.52 101.16c-4.832-9.785-7.783-19.3-9.273-24.845v70.055c2.447.917 4.197 3.257 4.197 6.021 0 3.559-2.887 6.442-6.443 6.442-3.56 0-6.443-2.885-6.443-6.442 0-2.896 1.925-5.317 4.558-6.131v-70.019c-1.485 5.531-4.438 15.092-9.293 24.919-7.571 15.314-17.009 28.823-17.009 28.823l6.036 82.598s5.736 6.401 22.31 6.41h.023c16.573-.009 22.312-6.41 22.312-6.41l6.035-82.598c-.003 0-9.441-13.508-17.01-28.823z" />
            </svg>
          </a>
          <a
            href={profile.social.scrapbox}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground-soft hover:text-accent transition-colors duration-fast"
            aria-label="Scrapbox"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h16v2H4V4zm0 4h16v2H4V8zm0 4h10v2H4v-2zm0 4h16v2H4v-2zm0 4h10v2H4v-2z" />
            </svg>
          </a>
        </div>

        {/* Bio */}
        <div className="prose prose-neutral max-w-none">
          {profile.bio.split("\n\n").map((paragraph, index) => (
            <p
              key={index}
              className="text-foreground-soft leading-relaxed mb-4 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
