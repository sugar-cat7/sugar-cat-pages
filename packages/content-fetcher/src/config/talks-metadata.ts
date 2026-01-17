import type { TalkMetadata } from "../schemas";

/**
 * Manual metadata for talks (SpeakerDeck RSS does not include event name, description, etc.)
 * Key: slideUrl
 *
 * Only add entries here if you need to supplement the RSS data.
 * New slides will be automatically fetched from RSS even without entries here.
 */
export const talksMetadata: Record<string, TalkMetadata> = {
  // Example:
  // "https://speakerdeck.com/sugarcat7/frontend-architecture": {
  //   event: "Frontend Conference 2025",
  //   description: "大規模Webアプリのアーキテクチャについて",
  // },
};

/**
 * Manual slides that are not on SpeakerDeck (e.g., Google Slides)
 * These will be merged with RSS results
 */
export const manualSlides: Array<{
  title: string;
  slideUrl: string;
  publishedAt: string;
  thumbnail?: string;
  event?: string;
  videoUrl?: string;
  description?: string;
}> = [
  {
    title: "AIを活用したChatBot・VoiceBotのシステム概観",
    slideUrl:
      "https://speakerdeck.com/cyberagentdevelopers/dui-hua-xing-aipurodakutonojin-tozhan-wang-chatbotvoicebotnokai-fa-ji-shu-wojie-shuo?slide=20",
    publishedAt: "2023-12-14",
    event: "CyberAgent Developers",
    thumbnail:
      "https://files.speakerdeck.com/presentations/c889977363864cd6a1f85e8dab3750a6/slide_19.jpg",
  },
  {
    title:
      "メタバースプロジェクトにおけるObservability構築とユーザー視点での信頼性可視化の現在地",
    slideUrl:
      "https://docs.google.com/presentation/d/1GuL0e7nS-A_X7yBQ7itFNZTOftMooDFJgLjefUD91QU/edit",
    publishedAt: "2025-07-11",
  },
  {
    title:
      "リアルタイムサーバー運用改善〜メタバースプラットフォームにおけるEKS運用とDatadog活用によるオートスケール実践〜",
    slideUrl:
      "https://docs.google.com/presentation/d/10ffQJ5D_uYzFBmRPJSLR882_u8m_uobyKwpy-jjaW4U/edit",
    publishedAt: "2025-11-18",
  },
];
