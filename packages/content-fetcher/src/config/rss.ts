/**
 * RSS feed configuration
 */
export const rssConfig = {
  siteUrl: "https://sugar-cat.dev",
  siteName: "Sugar Cat Dev",
  author: "Sugar Cat",
  language: "ja",
  itemLimit: 20,
  feeds: {
    blog: {
      title: "Sugar Cat Dev",
      description: "技術記事",
      path: "/feed/blog.xml",
    },
    talks: {
      title: "Sugar Cat Dev",
      description: "登壇資料",
      path: "/feed/talks.xml",
    },
  },
} as const;
