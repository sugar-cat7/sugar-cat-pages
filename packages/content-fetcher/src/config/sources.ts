/**
 * External content source configuration
 */
export const sources = {
  zenn: {
    apiUrl: "https://zenn.dev/api/articles",
    username: "king",
  },
  hatena: {
    feedUrl: "https://sugar-cat.hatenablog.com/rss",
  },
  speakerdeck: {
    feedUrl: "https://speakerdeck.com/sugarcat7.rss",
  },
} as const;
