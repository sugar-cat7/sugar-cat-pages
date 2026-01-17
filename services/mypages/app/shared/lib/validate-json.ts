import { z } from "zod";
import { BlogPostSchema, TalkSchema } from "@my-pages/content-fetcher/schemas";

/**
 * Validates and parses blog posts data from JSON import.
 * This is a library boundary where type assertions are acceptable.
 */
export function validatePosts(data: unknown) {
  return z.array(BlogPostSchema).parse(data);
}

/**
 * Validates and parses talks data from JSON import.
 * This is a library boundary where type assertions are acceptable.
 */
export function validateTalks(data: unknown) {
  return z.array(TalkSchema).parse(data);
}
