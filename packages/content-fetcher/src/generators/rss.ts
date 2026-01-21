import { Feed } from "feed";
import type { BlogPost, Talk } from "../schemas";
import { rssConfig } from "../config";

function createBaseFeed(feedType: "blog" | "talks"): Feed {
  const { siteUrl, author, feeds } = rssConfig;
  const feedConfig = feeds[feedType];

  return new Feed({
    title: feedConfig.title,
    description: feedConfig.description,
    id: `${siteUrl}/${feedType}`,
    link: `${siteUrl}/${feedType}`,
    language: "ja",
    feedLinks: {
      rss2: `${siteUrl}${feedConfig.path}`,
    },
    copyright: `All rights reserved ${new Date().getFullYear()}, ${author}`,
    author: {
      name: author,
      link: siteUrl,
    },
  });
}

export function generateBlogRss(posts: BlogPost[]): string {
  const feed = createBaseFeed("blog");
  const limitedPosts = posts.slice(0, rssConfig.itemLimit);

  for (const post of limitedPosts) {
    feed.addItem({
      title: post.title,
      id: post.url,
      link: post.url,
      description: post.description || post.title,
      date: new Date(post.publishedAt),
    });
  }

  return feed.rss2();
}

export function generateTalksRss(talks: Talk[]): string {
  const feed = createBaseFeed("talks");
  const limitedTalks = talks.slice(0, rssConfig.itemLimit);

  for (const talk of limitedTalks) {
    feed.addItem({
      title: talk.title,
      id: talk.slideUrl,
      link: talk.slideUrl,
      description:
        talk.description || (talk.event ? `${talk.event}での発表` : talk.title),
      date: new Date(talk.publishedAt),
    });
  }

  return feed.rss2();
}
