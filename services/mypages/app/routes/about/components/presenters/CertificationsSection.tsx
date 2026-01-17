import type { CertificationGroup } from "../../types";

type CertificationsSectionProps = {
  certificationGroups: CertificationGroup[];
};

function CategoryIcon({ icon }: { icon?: "national" | "gcp" }) {
  if (icon === "gcp") {
    return (
      <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CertificationsSection({
  certificationGroups,
}: CertificationsSectionProps) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-foreground mb-8">
        Certifications
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificationGroups.map((group) => (
          <div
            key={group.category}
            className="p-5 rounded-lg bg-card shadow-card"
          >
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                <CategoryIcon icon={group.icon} />
              </div>
              <h3 className="font-display text-base font-semibold text-foreground">
                {group.category}
              </h3>
            </div>

            <ul className="space-y-2">
              {group.certifications.map((cert) => (
                <li key={cert.name} className="flex items-start gap-2">
                  <svg
                    className="w-4 h-4 text-mint mt-0.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-foreground">
                    {cert.name}
                    {cert.note && (
                      <span className="text-xs text-muted-foreground ml-1">
                        ({cert.note})
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
