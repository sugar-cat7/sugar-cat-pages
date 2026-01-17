import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import type { Result } from "@my-pages/errors";
import type { BaseError } from "@my-pages/errors";
import {
  fetchZennPosts,
  fetchHatenaPosts,
  fetchSpeakerDeckTalks,
  fetchOgImage,
} from "./fetchers";
import { manualPosts } from "./config";
import type { BlogPost, Talk } from "./schemas";

const OUTPUT_BASE = process.env.OUTPUT_DIR ?? resolve(__dirname, "../../..");

const BLOG_OUTPUT_PATH = resolve(
  OUTPUT_BASE,
  "services/mypages/app/routes/blog/data/posts.json"
);
const TALKS_OUTPUT_PATH = resolve(
  OUTPUT_BASE,
  "services/mypages/app/routes/talks/data/talks.json"
);

async function generateBlogPosts(): Promise<Result<BlogPost[], BaseError>> {
  console.log("Fetching Zenn posts...");
  const zennResult = await fetchZennPosts();
  if (zennResult.err) {
    return zennResult;
  }
  const zennPosts = zennResult.val;
  console.log(`  Found ${zennPosts.length} Zenn posts`);

  console.log("Fetching Hatena posts...");
  const hatenaResult = await fetchHatenaPosts();
  if (hatenaResult.err) {
    return hatenaResult;
  }
  const hatenaPosts = hatenaResult.val;
  console.log(`  Found ${hatenaPosts.length} Hatena posts`);

  // Convert manual posts to BlogPost format with OG image fetching
  console.log("Fetching external posts OG images...");
  const externalPosts: BlogPost[] = await Promise.all(
    manualPosts.map(async (post, index) => ({
      id: `external-${index}-${post.url.replace(/[^a-z0-9]/gi, "-")}`,
      title: post.title,
      description: post.description,
      url: post.url,
      source: "external" as const,
      publishedAt: post.publishedAt,
      thumbnail: post.thumbnail ?? (await fetchOgImage(post.url)),
    }))
  );
  console.log(`  Found ${externalPosts.length} external posts`);

  // Merge and sort by publishedAt descending
  const allPosts = [...zennPosts, ...hatenaPosts, ...externalPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return { val: allPosts };
}

async function generateTalks(): Promise<Result<Talk[], BaseError>> {
  console.log("Fetching SpeakerDeck talks...");
  const talksResult = await fetchSpeakerDeckTalks();
  if (talksResult.err) {
    return talksResult;
  }
  const talks = talksResult.val;
  console.log(`  Found ${talks.length} talks`);

  return { val: talks };
}

function writeJson(path: string, data: unknown): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2), "utf-8");
  console.log(`Written: ${path}`);
}

async function main(): Promise<void> {
  console.log("=== Content Fetcher ===\n");

  const [postsResult, talksResult] = await Promise.all([
    generateBlogPosts(),
    generateTalks(),
  ]);

  if (postsResult.err) {
    console.error("Error fetching blog posts:", postsResult.err.message);
    process.exit(1);
  }

  if (talksResult.err) {
    console.error("Error fetching talks:", talksResult.err.message);
    process.exit(1);
  }

  const posts = postsResult.val;
  const talks = talksResult.val;

  console.log("\nWriting JSON files...");
  writeJson(BLOG_OUTPUT_PATH, posts);
  writeJson(TALKS_OUTPUT_PATH, talks);

  console.log("\n=== Done ===");
  console.log(`Total blog posts: ${posts.length}`);
  console.log(`Total talks: ${talks.length}`);
}

main();
