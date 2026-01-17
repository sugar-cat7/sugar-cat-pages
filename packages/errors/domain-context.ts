import { z } from "zod";

/**
 * 各ドメインエラーコードのcontextスキーマ
 *
 * contextが不要なエラーはz.undefined()を使用
 */
export const DomainErrorContextSchemas = {
  // E1xxx - Interview
  E1001: z.object({
    // セッション期限切れ
    sessionId: z.string(),
    expiredAt: z.string(),
  }),
  E1002: z.undefined(), // セッション未開始
  E1003: z.undefined(), // セッション完了済み

  // E2xxx - Billing
  E2001: z.object({
    // プラン上限超過
    currentPlan: z.string(),
    limit: z.number(),
    currentUsage: z.number(),
  }),
  E2002: z.undefined(), // サブスクリプション期限切れ

  // E3xxx - Auth
  E3001: z.object({
    // 認証コード期限切れ
    expiresAfterMinutes: z.number(),
  }),
  E3002: z.undefined(), // 認証コード不正

  // E4xxx - User
  E4001: z.undefined(), // オンボーディング未完了
  E4002: z.undefined(), // 電話番号未認証
} as const;

/**
 * エラーコードごとのcontext型マップ
 */
export type DomainErrorContextMap = {
  [K in keyof typeof DomainErrorContextSchemas]: z.infer<
    (typeof DomainErrorContextSchemas)[K]
  >;
};
