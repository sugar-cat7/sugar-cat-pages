import { getLogContext } from "./context";
import { formatLogEntry } from "./formatter";
import type { LogContext, LoggerConfig, LogSeverity } from "./schema";
import { LoggerConfigSchema } from "./schema";

/**
 * Log level mapping
 */
const LOG_LEVELS = {
  silly: 0,
  trace: 1,
  debug: 2,
  info: 3,
  warn: 4,
  error: 5,
  fatal: 6,
} as const;

type LogLevel = keyof typeof LOG_LEVELS;

/**
 * Severity mapping for each log level
 */
const LEVEL_TO_SEVERITY: Record<LogLevel, LogSeverity> = {
  silly: "DEBUG",
  trace: "DEBUG",
  debug: "DEBUG",
  info: "INFO",
  warn: "WARNING",
  error: "ERROR",
  fatal: "CRITICAL",
};

/**
 * Lightweight logger class for Cloudflare Workers
 */
export class Logger {
  private readonly config: LoggerConfig;
  private contextProvider: (() => LogContext | undefined) | null = null;

  constructor(config?: Partial<LoggerConfig>) {
    this.config = LoggerConfigSchema.parse(config ?? {});
  }

  /**
   * Sets a context provider function that will be called for each log entry
   */
  setContextProvider(provider: () => LogContext | undefined): void {
    this.contextProvider = provider;
  }

  /**
   * Creates a child logger with additional default configuration
   */
  child(name: string, additionalLabels?: Record<string, string>): Logger {
    const childConfig: Partial<LoggerConfig> = {
      ...this.config,
      name: this.config.name ? `${this.config.name}.${name}` : name,
      defaultLabels: {
        ...this.config.defaultLabels,
        ...additionalLabels,
      },
    };

    const childLogger = new Logger(childConfig);
    childLogger.contextProvider = this.contextProvider;
    return childLogger;
  }

  /**
   * Internal log method
   */
  private log(
    level: LogLevel,
    message: string,
    data?: Record<string, unknown>,
    error?: Error,
  ): void {
    if (LOG_LEVELS[level] < this.config.minLevel) {
      return;
    }

    const context = this.contextProvider?.();
    const severity = LEVEL_TO_SEVERITY[level];
    const entry = formatLogEntry(
      severity,
      message,
      this.config,
      context,
      data,
      error,
    );

    // biome-ignore lint/suspicious/noConsole: Logger needs direct console access
    console.log(JSON.stringify(entry));
  }

  /**
   * Log at silly level (0)
   */
  silly(message: string, data?: Record<string, unknown>): void {
    this.log("silly", message, data);
  }

  /**
   * Log at trace level (1)
   */
  trace(message: string, data?: Record<string, unknown>): void {
    this.log("trace", message, data);
  }

  /**
   * Log at debug level (2)
   */
  debug(message: string, data?: Record<string, unknown>): void {
    this.log("debug", message, data);
  }

  /**
   * Log at info level (3)
   */
  info(message: string, data?: Record<string, unknown>): void {
    this.log("info", message, data);
  }

  /**
   * Log at warn level (4)
   */
  warn(message: string, data?: Record<string, unknown>): void {
    this.log("warn", message, data);
  }

  /**
   * Log at error level (5)
   */
  error(message: string, error?: Error, data?: Record<string, unknown>): void {
    this.log("error", message, data, error);
  }

  /**
   * Log at fatal level (6)
   */
  fatal(message: string, error?: Error, data?: Record<string, unknown>): void {
    this.log("fatal", message, data, error);
  }

  /**
   * Log with explicit context override
   */
  withContext(context: LogContext): ContextLogger {
    return new ContextLogger(this.config, context);
  }
}

/**
 * Logger instance with explicit context
 */
class ContextLogger {
  constructor(
    private readonly config: LoggerConfig,
    private readonly context: LogContext,
  ) {}

  private log(
    level: LogLevel,
    message: string,
    data?: Record<string, unknown>,
    error?: Error,
  ): void {
    if (LOG_LEVELS[level] < this.config.minLevel) {
      return;
    }

    const severity = LEVEL_TO_SEVERITY[level];
    const entry = formatLogEntry(
      severity,
      message,
      this.config,
      this.context,
      data,
      error,
    );

    // biome-ignore lint/suspicious/noConsole: Logger needs direct console access
    console.log(JSON.stringify(entry));
  }

  silly(message: string, data?: Record<string, unknown>): void {
    this.log("silly", message, data);
  }

  trace(message: string, data?: Record<string, unknown>): void {
    this.log("trace", message, data);
  }

  debug(message: string, data?: Record<string, unknown>): void {
    this.log("debug", message, data);
  }

  info(message: string, data?: Record<string, unknown>): void {
    this.log("info", message, data);
  }

  warn(message: string, data?: Record<string, unknown>): void {
    this.log("warn", message, data);
  }

  error(message: string, error?: Error, data?: Record<string, unknown>): void {
    this.log("error", message, data, error);
  }

  fatal(message: string, error?: Error, data?: Record<string, unknown>): void {
    this.log("fatal", message, data, error);
  }
}

/**
 * Creates a new logger instance
 */
export function createLogger(config?: Partial<LoggerConfig>): Logger {
  return new Logger(config);
}

/**
 * Creates a logger instance with context provider pre-configured
 * This logger will automatically include context from runWithLogContext calls
 *
 * @example
 * ```ts
 * const logger = createLoggerWithContext();
 *
 * runWithLogContext({ labels: { requestId: "req-123" } }, () => {
 *   logger.info("Request received"); // Will include requestId in labels
 * });
 * ```
 */
export function createLoggerWithContext(
  config?: Partial<LoggerConfig>,
): Logger {
  const logger = new Logger(config);
  logger.setContextProvider(getLogContext);
  return logger;
}

export type { ContextLogger };
