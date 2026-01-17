import type { BiographyYear } from "../../types";

type BiographySectionProps = {
  biography: BiographyYear[];
};

export function BiographySection({ biography }: BiographySectionProps) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-foreground mb-8">
        Biography
      </h2>

      <div className="relative pl-6">
        {/* 連続した縦線 */}
        <div className="absolute left-[5px] top-1 bottom-1 w-0.5 bg-coral/40" />

        <div className="space-y-8">
          {biography.map((yearData) => (
            <div key={yearData.year} className="relative">
              {/* ドット（縦線上） */}
              <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-coral" />

              {/* 年 */}
              <div className="text-lg font-bold text-foreground mb-3">
                {yearData.year}
              </div>

              {/* アクティビティリスト */}
              <ul className="space-y-2">
                {yearData.activities.map((activity, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-coral mt-0.5 shrink-0 text-sm">
                      ・
                    </span>
                    {activity.url ? (
                      <a
                        href={activity.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground-soft hover:text-accent transition-colors duration-fast flex items-center gap-1 text-sm leading-relaxed"
                      >
                        {activity.title}
                        <svg
                          className="w-3.5 h-3.5 shrink-0 opacity-60"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    ) : (
                      <span className="text-foreground-soft text-sm leading-relaxed">
                        {activity.title}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
