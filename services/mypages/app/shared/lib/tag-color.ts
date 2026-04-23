export function inferTalkSource(slideUrl: string | undefined): string {
  if (!slideUrl) return "external";
  if (slideUrl.includes("speakerdeck.com")) return "speakerdeck";
  if (slideUrl.includes("docs.google.com")) return "slides";
  if (slideUrl.includes("slideshare")) return "slideshare";
  return "external";
}
