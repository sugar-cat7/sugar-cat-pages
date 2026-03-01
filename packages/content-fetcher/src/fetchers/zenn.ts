import {
  AppError,
  type BaseError,
  Err,
  Ok,
  type Result,
} from "@my-pages/errors";
import { sources } from "../config";
import type { BlogPost } from "../schemas";
import { fetchOgImage } from "./og-image";

interface ZennArticle {
  id: number;
  title: string;
  slug: string;
  path: string;
  published_at: string;
  emoji: string;
  article_type: "tech" | "idea";
  liked_count: number;
  body_letters_count: number;
}

interface ZennApiResponse {
  articles: ZennArticle[];
  next_page: number | null;
}

export async function fetchZennPosts(): Promise<Result<BlogPost[], BaseError>> {
  const allArticles: ZennArticle[] = [];
  let page = 1;

  while (true) {
    const url = `${sources.zenn.apiUrl}?username=${sources.zenn.username}&order=latest&page=${page}`;
    const response = await fetch(url).catch(() => null);

    if (!response) {
      return Err(
        new AppError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch from Zenn API: Network error",
        }),
      );
    }

    if (!response.ok) {
      return Err(
        new AppError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Zenn API error: ${response.status}`,
        }),
      );
    }

    const data: ZennApiResponse = await response.json();
    allArticles.push(...data.articles);

    if (data.next_page === null) break;
    page = data.next_page;
  }

  const posts = await Promise.all(
    allArticles.map(async (article) => {
      const articleUrl = `https://zenn.dev${article.path}`;
      const thumbnail = await fetchOgImage(articleUrl);
      return {
        id: `zenn-${article.slug}`,
        title: article.title,
        description: "",
        url: articleUrl,
        source: "zenn" as const,
        publishedAt: article.published_at.split("T")[0],
        thumbnail,
      };
    }),
  );

  return Ok(posts);
}
