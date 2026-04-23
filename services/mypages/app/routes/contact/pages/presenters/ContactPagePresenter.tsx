import { MailIcon, XIcon } from "~/shared/components/presenters/icons";
import { PageHeader } from "~/shared/components/presenters/PageHeader";
import { WidgetHead } from "~/shared/components/presenters/WidgetHead";
import type { ContactChannel, ContactData } from "../../data/contact";

type ContactPagePresenterProps = {
  contact: ContactData;
};

function channelIcon(id: ContactChannel["id"]) {
  if (id === "email")
    return <MailIcon className="h-4 w-4 shrink-0 text-mint" />;
  return <XIcon className="h-3.5 w-3.5 shrink-0 text-mint" />;
}

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
            <WidgetHead
              label="cat ./contact.md"
              meta={`${contact.sections.length} sections`}
            />
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
            <WidgetHead
              label="cat ./channels.yaml"
              meta={`${contact.channels.length} channels`}
            />
            <ul className="m-0 list-none divide-y divide-dashed divide-border px-0 py-0">
              {contact.channels.map((channel) => (
                <li
                  key={channel.id}
                  className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3 font-mono text-[13px] text-foreground">
                    {channelIcon(channel.id)}
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[10.5px] uppercase tracking-[.22em] text-muted-foreground">
                        {channel.label}
                      </span>
                      <span className="select-all break-all">
                        {channel.value}
                      </span>
                    </span>
                  </div>
                  <a
                    href={channel.href}
                    target={channel.id === "email" ? undefined : "_blank"}
                    rel={
                      channel.id === "email" ? undefined : "noopener noreferrer"
                    }
                    className="inline-flex items-center justify-center gap-2 border border-mint/50 bg-mint/10 px-3.5 py-1.5 font-mono text-[12px] text-mint transition-colors duration-fast hover:bg-mint/20"
                  >
                    <span aria-hidden="true">$</span>
                    <span>{channel.cta}</span>
                  </a>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </div>
  );
}
