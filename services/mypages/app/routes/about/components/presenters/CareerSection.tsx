import type { CareerItem } from "../../types";

type CareerSectionProps = {
  career: CareerItem[];
};

export function CareerSection({ career }: CareerSectionProps) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-foreground mb-8">
        Career
      </h2>

      <div className="relative pl-6">
        {/* 連続した縦線 */}
        <div className="absolute left-[5px] top-1 bottom-1 w-0.5 bg-coral/40" />

        <div className="space-y-8">
          {career.map((item, index) => (
            <div key={index} className="relative">
              {/* ドット（縦線上） */}
              <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-coral" />

              {/* 期間 */}
              <div className="text-base font-bold text-foreground mb-2">
                {item.period}
              </div>

              {/* 会社・役割 */}
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-foreground">
                  {item.company}
                </h3>
                <p className="text-sm text-muted-foreground">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
