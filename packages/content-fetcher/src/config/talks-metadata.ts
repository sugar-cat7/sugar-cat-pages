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
      "https://speakerdeck.com/covercorp/niokeru-observability-kouchiku-to-yuza-shiten-deno-shinraisei-kashika-no-genzaichi",
    publishedAt: "2025-07-11",
    thumbnail:
      "https://files.speakerdeck.com/presentations/bc971d8bf33e4311ad115c2271346841/slide_0.jpg?40569966",
  },
  {
    title:
      "リアルタイムサーバー運用改善 〜メタバースプラットフォームにおけるEKS運用とDatadog活用によるオートスケール実践〜",
    slideUrl:
      "https://speakerdeck.com/covercorp/riarutaimu-saba-unyou-kaizen-niokeru-eks-unyou-to-datadog-katsuyou-niyoru-oto-sukeru-jissen",
    publishedAt: "2025-11-18",
    thumbnail:
      "https://files.speakerdeck.com/presentations/2c78b837124e499cb0226d8fb915fb1a/slide_0.jpg?40569766",
  },
];
