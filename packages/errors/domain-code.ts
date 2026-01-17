import { z } from "zod";

/**
 * ドメインエラーコード（E + 4桁数字）
 *
 * E1xxx - Interview関連
 * E2xxx - Billing関連
 * E3xxx - Auth関連
 * E4xxx - User関連
 */
export const DomainErrorCodeSchema = z.enum([
  // E1xxx - Interview
  "E1001", // セッション期限切れ
  "E1002", // セッション未開始/進行中ではない
  "E1003", // セッション完了済み

  // E2xxx - Billing
  "E2001", // プラン上限超過
  "E2002", // サブスクリプション期限切れ

  // E3xxx - Auth
  "E3001", // 認証コード期限切れ
  "E3002", // 認証コード不正

  // E4xxx - User
  "E4001", // オンボーディング未完了
  "E4002", // 電話番号未認証
]);

export type DomainErrorCode = z.infer<typeof DomainErrorCodeSchema>;

/**
 * ドメインコード → HTTPステータス
 */
export const domainCodeToStatus = (code: DomainErrorCode): number => {
  const prefix = code.slice(1, 2); // "E1001" → "1"
  switch (prefix) {
    case "1": // Interview
      return 400;
    case "2": // Billing
      return 403;
    case "3": // Auth
      return 400;
    case "4": // User
      return 403;
    default:
      return 400;
  }
};

/**
 * ドメインコードかどうか判定
 */
export const isDomainErrorCode = (code: string): code is DomainErrorCode =>
  /^E\d{4}$/.test(code) && DomainErrorCodeSchema.safeParse(code).success;
