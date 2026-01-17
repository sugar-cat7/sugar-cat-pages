import Parser from "rss-parser";
import {
  type Result,
  Ok,
  Err,
  AppError,
  type BaseError,
} from "@my-pages/errors";
import { sources, talksMetadata, manualSlides } from "../config";
import type { Talk } from "../schemas";
import { fetchOgImage } from "./og-image";

const parser = new Parser({
  customFields: {
    item: [["media:content", "mediaContent", { keepArray: false }]],
  },
});

function generateId(url: string): string {
  const match = url.match(/speakerdeck\.com\/[^/]+\/([^/]+)/);
  return match ? `sd-${match[1]}` : `sd-${Date.now()}`;
}

interface ExtendedItem {
  title?: string;
  link?: string;
  pubDate?: string;
  mediaContent?: { $?: { url?: string } };
}

export async function fetchSpeakerDeckTalks(): Promise<
  Result<Talk[], BaseError>
> {
  const feed = await parser
    .parseURL(sources.speakerdeck.feedUrl)
    .catch(() => null);

  if (!feed) {
    return Err(
      new AppError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch SpeakerDeck RSS feed",
      })
    );
  }

  const rssItems = feed.items as ExtendedItem[];

  const rssTalks: Talk[] = rssItems.map((item) => {
    const slideUrl = item.link ?? "";
    const metadata = talksMetadata[slideUrl] ?? {};

    return {
      id: generateId(slideUrl),
      title: item.title ?? "",
      slideUrl,
      publishedAt: item.pubDate
        ? new Date(item.pubDate).toISOString().split("T")[0]
        : "",
      thumbnail: item.mediaContent?.$?.url,
      event: metadata.event,
      videoUrl: metadata.videoUrl,
      description: metadata.description,
    };
  });

  // Merge with manual slides (e.g., Google Slides) with OG image fetching
  const manualTalks: Talk[] = await Promise.all(
    manualSlides.map(async (slide, index) => ({
      id: `manual-${index}-${slide.slideUrl.replace(/[^a-z0-9]/gi, "-")}`,
      ...slide,
      thumbnail: slide.thumbnail ?? (await fetchOgImage(slide.slideUrl)),
    }))
  );

  const talks = [...rssTalks, ...manualTalks].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return Ok(talks);
}
