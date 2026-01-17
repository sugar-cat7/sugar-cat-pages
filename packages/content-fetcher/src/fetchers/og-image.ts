/**
 * Fetch OG image URL from a given URL by parsing the HTML meta tags
 */
export async function fetchOgImage(url: string): Promise<string | undefined> {
  const response = await fetch(url).catch(() => null);
  if (!response?.ok) return undefined;

  const html = await response.text().catch(() => null);
  if (!html) return undefined;

  const match = html.match(/<meta property="og:image" content="([^"]+)"/);
  return match?.[1];
}
