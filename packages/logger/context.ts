import type { LogContext } from "./schema";

/**
 * Current log context (simple module-level state)
 * Note: In Cloudflare Workers, each request runs in isolation,
 * so module-level state is effectively request-scoped.
 */
let currentContext: LogContext | undefined;

/**
 * Gets the current log context
 */
export function getLogContext(): LogContext | undefined {
  return currentContext;
}

/**
 * Sets the current log context
 */
export function setLogContext(context: LogContext | undefined): void {
  currentContext = context;
}

/**
 * Runs a function with the given log context
 * The context will be available to all code executed within the callback
 *
 * @example
 * ```ts
 * runWithLogContext({ labels: { requestId: "req-123" } }, () => {
 *   // All logs within this callback will include requestId
 *   logger.info("Processing request");
 * });
 * ```
 */
export function runWithLogContext<T>(context: LogContext, fn: () => T): T {
  const previousContext = currentContext;
  currentContext = context;
  try {
    return fn();
  } finally {
    currentContext = previousContext;
  }
}

/**
 * Runs an async function with the given log context
 *
 * @example
 * ```ts
 * await runWithLogContextAsync({ labels: { requestId: "req-123" } }, async () => {
 *   await someAsyncOperation();
 *   logger.info("Operation completed");
 * });
 * ```
 */
export async function runWithLogContextAsync<T>(
  context: LogContext,
  fn: () => Promise<T>,
): Promise<T> {
  const previousContext = currentContext;
  currentContext = context;
  try {
    return await fn();
  } finally {
    currentContext = previousContext;
  }
}

/**
 * Updates the current log context by merging with existing context
 *
 * @example
 * ```ts
 * runWithLogContext({ labels: { requestId: "req-123" } }, () => {
 *   // Later in the code, add more context
 *   updateLogContext({ labels: { userId: "user-456" } });
 *   // Now logs will include both requestId and userId
 * });
 * ```
 */
export function updateLogContext(partialContext: Partial<LogContext>): void {
  if (currentContext) {
    currentContext = {
      ...currentContext,
      ...partialContext,
      labels: {
        ...currentContext.labels,
        ...partialContext.labels,
      },
    };
  }
}

/**
 * Middleware-style function for frameworks like Hono
 * that automatically sets up log context for each request
 *
 * @example
 * ```ts
 * // Hono middleware
 * app.use(async (c, next) => {
 *   const requestId = c.req.header("x-request-id") ?? crypto.randomUUID();
 *   await withRequestContext({
 *     labels: { requestId, path: c.req.path },
 *   }, () => next());
 * });
 * ```
 */
export async function withRequestContext<T>(
  context: LogContext,
  fn: () => T | Promise<T>,
): Promise<T> {
  const previousContext = currentContext;
  currentContext = context;
  try {
    return await fn();
  } finally {
    currentContext = previousContext;
  }
}

/**
 * Extended log context with common request fields
 */
export interface RequestLogContext extends LogContext {
  /** Unique request identifier in labels */
  labels?: LogContext["labels"] & {
    requestId?: string;
    userId?: string;
    sessionId?: string;
  };
}

/**
 * Gets the current request ID from context labels
 */
export function getRequestId(): string | undefined {
  return currentContext?.labels?.requestId;
}

/**
 * Creates a log context with request ID in labels
 */
export function createRequestContext(
  requestId: string,
  additionalContext?: Partial<LogContext>,
): LogContext {
  return {
    ...additionalContext,
    labels: {
      ...additionalContext?.labels,
      requestId,
    },
  };
}
