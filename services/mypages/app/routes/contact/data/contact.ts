export type ContactChannel = {
  id: "email" | "x";
  label: string;
  value: string;
  href: string;
  cta: string;
};

export type ContactData = {
  date: string;
  sections: string[];
  channels: ContactChannel[];
};

export const contact: ContactData = {
  date: "2026.04.24",
  sections: [
    "ご相談はメール、もしくは X の DM までお気軽にご連絡ください。",
    "スタートアップから大手事業会社まで複数社での開発・運用経験があり、フロントエンドからインフラまで横断的に支援できます。抽象的な悩みや課題を具体化し、解決に向けた実現可能なプランを立てて推進するところまで伴走いたします。ご依頼内容が明確にまとまっていない場合でも、構想や悩みベースで構いませんのでご相談いただければと思います。",
    "ご依頼は基本的にクリエイター様・企業様からのみお受けしております。",
  ],
  channels: [
    {
      id: "email",
      label: "email",
      value: "sugar.cat.235711@gmail.com",
      href: "mailto:sugar.cat.235711@gmail.com",
      cta: "open mailto",
    },
    {
      id: "x",
      label: "x / twitter",
      value: "@sugar235711",
      href: "https://x.com/sugar235711",
      cta: "open x dm",
    },
  ],
};
