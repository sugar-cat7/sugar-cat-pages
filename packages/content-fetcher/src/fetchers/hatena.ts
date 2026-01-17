import Parser from "rss-parser";
import {
  type Result,
  Ok,
  Err,
  AppError,
  type BaseError,
} from "@my-pages/errors";
import { sources } from "../config";
import type { BlogPost } from "../schemas";

const parser = new Parser();

function generateId(url: string): string {
  const match = url.match(/\/entry\/(.+)$/);
  if (match) {
    return `hatena-${match[1].replace(/\//g, "-")}`;
  }
  return `hatena-${Date.now()}`;
}

function extractDescription(content: string | undefined): string {
  if (!content) return "";
  // Remove HTML tags and truncate
  const text = content.replace(/<[^>]*>/g, "").trim();
  return text.length > 200 ? `${text.slice(0, 200)}...` : text;
}

export async function fetchHatenaPosts(): Promise<
  Result<BlogPost[], BaseError>
> {
  const feed = await parser.parseURL(sources.hatena.feedUrl).catch(() => null);

  if (!feed) {
    return Err(
      new AppError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch Hatena RSS feed",
      })
    );
  }

  const posts = feed.items.map((item) => ({
    id: generateId(item.link ?? ""),
    title: item.title ?? "",
    description: extractDescription(item.contentSnippet ?? item.content),
    url: item.link ?? "",
    source: "hatena" as const,
    publishedAt: item.pubDate
      ? new Date(item.pubDate).toISOString().split("T")[0]
      : "",
    thumbnail: item.enclosure?.url,
  }));

  return Ok(posts);
}
