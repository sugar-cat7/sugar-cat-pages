export type Project = {
  id: string;
  name: string;
  chip: string;
  description: string;
  ogImage?: string;
  secret?: boolean;
  links: {
    github?: string;
    page?: string;
    article?: string;
  };
};

export type ProjectGroup = {
  id: string;
  title: string;
  command: string;
  projects: Project[];
};

export const projectGroups: ProjectGroup[] = [
  {
    id: "support",
    title: "支援実績",
    command: "ls ~/works/support",
    projects: [
      {
        id: "puchi-holo-mura",
        name: "ぷちホロの村 - 剣とお店と田舎暮らし",
        chip: "ゲーム",
        description:
          "holo Indie 作品。ホロライブのタレントと村づくり・冒険を楽しむ RPG。サーバーインフラの構築を担当。",
        links: {
          page: "https://store.steampowered.com/app/3856280/_/",
        },
      },
      {
        id: "fan-communication-service",
        name: "ファンコミュニケーションサービス",
        chip: "Webサービス",
        description:
          "クリエイターとファンをつなぐコミュニケーションサービスの開発支援。詳細は非公開。",
        secret: true,
        links: {},
      },
    ],
  },
  {
    id: "personal",
    title: "個人制作",
    command: "ls ~/works/personal",
    projects: [
      {
        id: "vspo-schedule",
        name: "すぽじゅーる",
        chip: "Webサイト",
        description:
          "ぶいすぽっ！の配信スケジュールを集約する非公式 Web サイト。YouTube / Twitch / ツイキャス / ニコニコなど複数プラットフォームの配信情報を一元表示する。",
        ogImage: "https://www.vspo-schedule.com/page-icon.png",
        links: {
          github: "https://github.com/vspo-lab/vspo-portal",
          page: "https://www.vspo-schedule.com/schedule/all",
        },
      },
      {
        id: "vspo-discord-bot",
        name: "すぽじゅーる Bot",
        chip: "Discord Bot",
        description:
          "ぶいすぽっ！メンバーの配信予定を Discord へ自動で届ける Bot。ブラウザ操作だけで通知設定が完了する管理画面付きで、500 サーバー超で稼働中。",
        ogImage: "/works/vspo-discord-bot.png",
        links: {
          page: "https://discord.vspo-schedule.com/",
        },
      },
    ],
  },
];
