import { BaseError, type ErrorContext } from "./base";
import { codeToStatus, type ErrorCode } from "./code";
import type { DomainErrorCode } from "./domain-code";
import type { DomainErrorContextMap } from "./domain-context";

/**
 * エラーコードに対応するcontext型を解決
 * - ドメインエラーコードの場合: DomainErrorContextMapから型を取得（undefinedを除外）
 * - 汎用エラーコードの場合: 任意のErrorContext
 */
type ContextForCode<TCode extends ErrorCode> = TCode extends DomainErrorCode
  ? TCode extends keyof DomainErrorContextMap
    ? DomainErrorContextMap[TCode] extends undefined
      ? ErrorContext | undefined
      : DomainErrorContextMap[TCode]
    : ErrorContext
  : ErrorContext;

/**
 * AppErrorオプションの型定義
 */
export type AppErrorOptions<TCode extends ErrorCode> = {
  code: TCode;
  message: string;
  cause?: unknown;
  context?: ContextForCode<TCode>;
  retry?: boolean;
};

/**
 * ドメインエラー用のオプション型
 * - contextが必須のコード: contextプロパティが必須
 * - contextが不要のコード: contextプロパティはオプショナル
 */
export type DomainErrorOptions<TCode extends DomainErrorCode> =
  DomainErrorContextMap[TCode] extends undefined
    ? AppErrorOptions<TCode>
    : Omit<AppErrorOptions<TCode>, "context"> & {
        context: DomainErrorContextMap[TCode];
      };

export class AppError<TCode extends ErrorCode = ErrorCode> extends BaseError {
  public readonly name = "AppError";
  public readonly retry: boolean;
  public readonly code: TCode;
  public readonly status: number;
  public override readonly context: ContextForCode<TCode> | undefined;

  constructor(opts: AppErrorOptions<TCode>) {
    super({
      message: opts.message,
      ...(opts.cause instanceof Error ? { cause: opts.cause } : {}),
    });
    this.retry = opts.retry ?? false;
    this.code = opts.code;
    this.status = codeToStatus(opts.code);
    this.context = opts.context;
  }
}
