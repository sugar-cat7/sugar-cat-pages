import { Feed } from "feed";
import posts from "~/routes/blog/data/posts.json";
import talks from "~/routes/talks/data/talks.json";

const siteUrl = "https://sugar-cat.dev";
const author = "Sugar Cat";

type FeedItem = {
  title: string;
  url: string;
  description: string;
  publishedAt: string;
};

function generateCombinedRss(blogPosts: FeedItem[], talkItems: FeedItem[]) {
  const feed = new Feed({
    title: "Sugar Cat Dev",
    description: "Sugar Catの技術記事と登壇資料",
    id: siteUrl,
    link: siteUrl,
    language: "ja",
    feedLinks: {
      rss2: `${siteUrl}/feed`,
    },
    copyright: `All rights reserved ${new Date().getFullYear()}, ${author}`,
    author: {
      name: author,
      link: siteUrl,
    },
  });

  const allItems = [
    ...blogPosts.map((post) => ({
      title: post.title,
      url: post.url,
      description: post.description || post.title,
      date: new Date(post.publishedAt),
    })),
    ...talkItems.map((talk) => ({
      title: talk.title,
      url: talk.url,
      description: talk.description || talk.title,
      date: new Date(talk.publishedAt),
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  for (const item of allItems.slice(0, 20)) {
    feed.addItem({
      title: item.title,
      id: item.url,
      link: item.url,
      description: item.description,
      date: item.date,
    });
  }

  return feed.rss2();
}

export async function loader() {
  const blogItems = posts.map((post) => ({
    title: post.title,
    url: post.url,
    description: post.description || "",
    publishedAt: post.publishedAt,
  }));

  const talkItems = talks.map((talk) => ({
    title: talk.title,
    url: talk.slideUrl,
    description: "event" in talk && talk.event ? `${talk.event}での発表` : "",
    publishedAt: talk.publishedAt,
  }));

  const rss = generateCombinedRss(blogItems, talkItems);

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
