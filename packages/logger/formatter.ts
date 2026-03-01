import type {
  HttpRequest,
  LogContext,
  LogEntry,
  LoggerConfig,
  LogSeverity,
} from "./schema";

/**
 * Safely stringify a value, handling circular references
 */
function safeStringify(value: unknown): string {
  const seen = new WeakSet();
  const result = JSON.stringify(value, (_key, val) => {
    if (typeof val === "object" && val !== null) {
      if (seen.has(val)) {
        return "[Circular]";
      }
      seen.add(val);
    }
    return val;
  });
  return result ?? String(value);
}

/**
 * Formats a log entry for structured JSON output
 */
export function formatLogEntry(
  severity: LogSeverity,
  message: string,
  config: LoggerConfig,
  context?: LogContext,
  data?: Record<string, unknown>,
  error?: Error,
): LogEntry {
  const entry: LogEntry = {
    severity,
    message,
    timestamp: new Date().toISOString(),
  };

  // Add logger name
  if (config.name) {
    entry.logger = config.name;
  }

  // Build labels (merge default labels with context labels)
  const labels: Record<string, string> = {};

  if (config.defaultLabels) {
    for (const [key, value] of Object.entries(config.defaultLabels)) {
      labels[key] = value;
    }
  }

  if (context?.labels) {
    for (const [key, value] of Object.entries(context.labels)) {
      labels[key] = value;
    }
  }

  if (config.serviceName) {
    labels.serviceName = config.serviceName;
  }
  if (config.serviceVersion) {
    labels.serviceVersion = config.serviceVersion;
  }

  if (Object.keys(labels).length > 0) {
    entry.labels = labels;
  }

  // Add trace information
  if (context?.traceId) {
    entry.traceId = context.traceId;
  }
  if (context?.spanId) {
    entry.spanId = context.spanId;
  }

  // Add HTTP request
  if (context?.httpRequest) {
    entry.httpRequest = context.httpRequest;
  }

  // Add structured data
  if (data && Object.keys(data).length > 0) {
    // Safely handle potential circular references
    const safeData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      try {
        // Test if it's serializable
        JSON.stringify(value);
        safeData[key] = value;
      } catch {
        safeData[key] = safeStringify(value);
      }
    }
    entry.data = safeData;
  }

  // Add error information
  if (error) {
    entry.error = {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return entry;
}

/**
 * Creates a transport function that outputs JSON to console
 */
export function createTransport(
  config: LoggerConfig,
  getContext?: () => LogContext | undefined,
): (
  severity: LogSeverity,
  message: string,
  data?: Record<string, unknown>,
  error?: Error,
) => void {
  return (severity, message, data, error) => {
    const context = getContext?.();
    const entry = formatLogEntry(
      severity,
      message,
      config,
      context,
      data,
      error,
    );
    console.log(JSON.stringify(entry));
  };
}

export type { HttpRequest, LogEntry };
