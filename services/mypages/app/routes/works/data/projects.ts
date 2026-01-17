export type Project = {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  ogImage?: string;
  links: {
    github?: string;
    page?: string;
    article?: string;
  };
};

export const projects: Project[] = [
  {
    id: "1",
    name: "すぽじゅーる",
    description:
      "ぶいすぽっ！の配信スケジュールを集約する非公式Webアプリ。YouTube、Twitch、ツイキャス、ニコニコなど複数プラットフォームの配信情報を一元表示。",
    technologies: [],
    ogImage: "https://www.vspo-schedule.com/page-icon.png",
    links: {
      github: "https://github.com/vspo-lab/vspo-portal",
      page: "https://www.vspo-schedule.com/schedule/all",
    },
  },
];
