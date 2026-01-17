import { z } from "zod";

export const TalkSchema = z.object({
  id: z.string(),
  title: z.string(),
  slideUrl: z.string().url(),
  publishedAt: z.string(),
  thumbnail: z.string().url().optional(),
  event: z.string().optional(),
  videoUrl: z.string().url().optional(),
  description: z.string().optional(),
});

export type Talk = z.infer<typeof TalkSchema>;

export const TalkMetadataSchema = z.object({
  event: z.string().optional(),
  videoUrl: z.string().url().optional(),
  description: z.string().optional(),
});

export type TalkMetadata = z.infer<typeof TalkMetadataSchema>;
