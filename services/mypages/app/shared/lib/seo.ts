/**
 * SEO Helper Functions for React Router v7
 */

const SITE_CONFIG = {
  siteName: "Sugar Cat Dev",
  siteUrl: "https://sugar-cat.dev",
  twitterHandle: "@sugar235711",
  defaultImage: "https://sugar-cat.dev/ogp.png",
  locale: "ja_JP",
} as const;

export type MetaDescriptor =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string }
  | { tagName: "link"; rel: string; href: string }
  | { "script:ld+json": Record<string, unknown> };

interface GenerateMetaOptions {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
}

/**
 * Generate meta tags for a page including OGP and Twitter Card
 */
export function generateMeta({
  title,
  description,
  path,
  type = "website",
  image = SITE_CONFIG.defaultImage,
}: GenerateMetaOptions): MetaDescriptor[] {
  const url = `${SITE_CONFIG.siteUrl}${path}`;

  return [
    { title },
    { name: "description", content: description },
    // Open Graph
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:site_name", content: SITE_CONFIG.siteName },
    { property: "og:locale", content: SITE_CONFIG.locale },
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: SITE_CONFIG.twitterHandle },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    // Canonical URL
    { tagName: "link", rel: "canonical", href: url },
  ];
}

/**
 * Generate Person schema JSON-LD for homepage
 */
export function generatePersonSchema(): { "script:ld+json": Record<string, unknown> } {
  return {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Sugar Cat",
      url: SITE_CONFIG.siteUrl,
      jobTitle: "Software Engineer",
      sameAs: [
        `https://twitter.com/${SITE_CONFIG.twitterHandle.replace("@", "")}`,
        "https://github.com/sugar-cat7",
        "https://zenn.dev/king",
      ],
    },
  };
}

/**
 * Generate WebSite schema JSON-LD
 */
export function generateWebSiteSchema(): { "script:ld+json": Record<string, unknown> } {
  return {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_CONFIG.siteName,
      url: SITE_CONFIG.siteUrl,
    },
  };
}
