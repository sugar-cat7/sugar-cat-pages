import { z } from "zod";

export const BlogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string().url(),
  source: z.enum(["zenn", "hatena", "external"]),
  publishedAt: z.string(),
  thumbnail: z.string().url().optional(),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;
