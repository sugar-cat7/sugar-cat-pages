import type { BiographyYear, CareerItem, CertificationGroup } from "../types";

export const profile = {
  name: "Sugar Cat",
  title: "Software Engineer",
  location: "Tokyo, Japan",
  avatarUrl: "/images/avatar.png",
  bio: `
何でも屋さんです。
ご依頼等はXのDMまでお願いします。
  `.trim(),
  social: {
    github: "https://github.com/sugar-cat7",
    twitter: "https://x.com/sugar235711",
    zenn: "https://zenn.dev/king",
    hatena: "https://sugar-cat.hatenablog.com/",
    scrapbox: "https://scrapbox.io/sugar-dev/",
  },
  biography: [
    {
      year: "2025",
      activities: [
        {
          title: "CloudNative Days Winter2025登壇",
          url: "https://event.cloudnativedays.jp/cndw2025/talks/2692",
        },
        {
          title: "Hono Conference登壇",
          url: "https://fortee.jp/honoconf-2025/proposal/7820d0e2-9f1f-428f-865f-c5d26d2bfce3",
        },
        {
          title: "SRE NEXT登壇",
          url: "https://sre-next.dev/2025/schedule/#slot100",
        },
      ],
    },
    {
      year: "2024",
      activities: [
        {
          title: "TSKaigi Kansai登壇",
          url: "https://kansai.tskaigi.org/talks/sugar-cat7",
        },
        {
          title: "Offers Event登壇",
          url: "https://offers-jp.connpass.com/event/331066/",
        },
        { title: "転職(10月~)" },
        {
          title: "Hono Conference登壇",
          url: "https://hono.connpass.com/event/319062/",
        },
        {
          title: "TSKaigi登壇",
          url: "https://tskaigi.org/talks/sugar235711",
        },
      ],
    },
    {
      year: "2023",
      activities: [{ title: "転職(Sier→事業会社)" }],
    },
    {
      year: "2022",
      activities: [{ title: "筑波大学大学院修了→Sier" }],
    },
    {
      year: "2021",
      activities: [
        {
          title: "JPHACKS2021 決勝進出",
          url: "https://jphacks.com/2021/result/finalist/",
        },
        {
          title: "NYLE HACKATHON IN TSUKUBA 2021 準優勝",
          url: "https://prtimes.jp/main/html/rd/p/000000091.000055900.html",
        },
        { title: "実験力学会" },
      ],
    },
  ] satisfies BiographyYear[],
  career: [
    { company: "???", period: "2024/10 ~", role: "SRE" },
    {
      company: "Cyber Agent, Inc.",
      period: "2023/7 ~ 2024/9",
      role: "AI業務改善システムの開発",
    },
    {
      company: "Accenture Japan Ltd.",
      period: "2022/5 ~ 2023/6",
      role: "金融領域のシステム開発",
    },
    {
      company: "Sozi, inc.",
      period: "2021/12 ~ 2022/4",
      role: "Pib-Webの開発",
    },
    {
      company: "Stadium, Inc.",
      period: "2021/4 ~ 2021/10",
      role: "インタビューメーカーの開発",
    },
    {
      company: "Works Applications, Inc.",
      period: "2020/12 ~ 2021/2",
      role: "不動産会計システムの開発",
    },
  ] satisfies CareerItem[],
  certificationGroups: [
    {
      category: "IPA",
      icon: "national",
      certifications: [{ name: "情報処理安全確保支援士", note: "未登録" }],
    },
    {
      category: "Google Cloud",
      icon: "gcp",
      certifications: [
        { name: "Professional Cloud Network Engineer" },
        { name: "Professional Cloud DevOps Engineer" },
        { name: "Professional Cloud Developer" },
        { name: "Professional Cloud Architect" },
      ],
    },
  ] satisfies CertificationGroup[],
};

export type Profile = typeof profile;
