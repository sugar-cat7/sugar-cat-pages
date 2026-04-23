import { MailIcon } from "~/shared/components/presenters/icons";
import { PageHeader } from "~/shared/components/presenters/PageHeader";
import { WidgetHead } from "~/shared/components/presenters/WidgetHead";
import type { ContactData } from "../../data/contact";

type ContactPagePresenterProps = {
  contact: ContactData;
};

export function ContactPagePresenter({ contact }: ContactPagePresenterProps) {
  return (
    <div>
      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 md:py-24">
        <PageHeader
          title="contact"
          command="cat ./contact.md"
          meta={
            <>
              <span>Contacts / お問い合わせ</span>
              <span className="opacity-50">·</span>
              <span className="tabular-nums">{contact.date}</span>
            </>
          }
        />

        <div className="mx-auto grid max-w-3xl gap-6">
          <article className="border border-border bg-card/70">
            <WidgetHead label="cat ./contact.md" meta="3 sections" />
            <div className="space-y-5 px-5 py-6 text-[13.5px] leading-[1.9] text-foreground">
              {contact.sections.map((paragraph, i) => (
                <p key={paragraph} className="relative pl-8">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 w-6 border-r border-border pr-2 text-right font-mono text-[11px] text-muted-foreground"
                  >
                    {i + 1}
                  </span>
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          <article className="border border-border bg-card/70">
            <WidgetHead label="cat ./mailto.txt" meta="1 address" />
            <div className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 font-mono text-[13px] text-foreground">
                <MailIcon className="h-4 w-4 shrink-0 text-mint" />
                <span className="select-all break-all">{contact.email}</span>
              </div>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center justify-center gap-2 border border-mint/50 bg-mint/10 px-3.5 py-1.5 font-mono text-[12px] text-mint transition-colors duration-fast hover:bg-mint/20"
              >
                <span aria-hidden="true">$</span>
                <span>open mailto</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
