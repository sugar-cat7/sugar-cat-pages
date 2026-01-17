/**
 * Manual blog posts that are not on Zenn/Hatena (e.g., external sites)
 * These will be merged with RSS results
 */
export const manualPosts: Array<{
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  thumbnail?: string;
}> = [
  {
    title: "Datadogのエラートラッキングにおける効果的なアラート設計について考える",
    description: "",
    url: "https://sre-magazine.net/articles/7/sugar_cat/",
    publishedAt: "2025-03-24",
  },
  {
    title: "メタバースプラットフォームにおけるSentryの導入と活用",
    description: "",
    url: "https://findy-tools.io/products/sentry/22/550",
    publishedAt: "2025-07-04",
  },
];
