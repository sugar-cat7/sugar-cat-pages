import { z } from "zod";

/**
 * Log Severity levels (compatible with Cloudflare Workers)
 */
export const LogSeveritySchema = z.enum([
  "DEBUG",
  "INFO",
  "WARNING",
  "ERROR",
  "CRITICAL",
]);
export type LogSeverity = z.infer<typeof LogSeveritySchema>;

/**
 * HTTP Request schema for structured logging
 */
export const HttpRequestSchema = z.object({
  method: z.string().optional(),
  url: z.string().optional(),
  status: z.number().optional(),
  userAgent: z.string().optional(),
  remoteIp: z.string().optional(),
  latencyMs: z.number().optional(),
  protocol: z.string().optional(),
});
export type HttpRequest = z.infer<typeof HttpRequestSchema>;

/**
 * Structured log entry
 */
export const LogEntrySchema = z.object({
  severity: LogSeveritySchema,
  message: z.string(),
  timestamp: z.string(),
  logger: z.string().optional(),
  traceId: z.string().optional(),
  spanId: z.string().optional(),
  labels: z.record(z.string(), z.string()).optional(),
  httpRequest: HttpRequestSchema.optional(),
  data: z.record(z.string(), z.unknown()).optional(),
  error: z
    .object({
      name: z.string(),
      message: z.string(),
      stack: z.string().optional(),
    })
    .optional(),
});
export type LogEntry = z.infer<typeof LogEntrySchema>;

/**
 * Logger configuration schema
 */
export const LoggerConfigSchema = z.object({
  /** Logger name for identification */
  name: z.string().optional(),
  /** Minimum log level (0=silly, 3=info, 5=error, 6=fatal) */
  minLevel: z.number().min(0).max(6).default(0),
  /** Default labels to include in every log entry */
  defaultLabels: z.record(z.string(), z.string()).optional(),
  /** Service name for identification */
  serviceName: z.string().optional(),
  /** Service version */
  serviceVersion: z.string().optional(),
});
export type LoggerConfig = z.infer<typeof LoggerConfigSchema>;

/**
 * Log context that can be passed to individual log calls
 */
export const LogContextSchema = z.object({
  /** Trace ID for distributed tracing */
  traceId: z.string().optional(),
  /** Span ID for distributed tracing */
  spanId: z.string().optional(),
  /** HTTP request information */
  httpRequest: HttpRequestSchema.optional(),
  /** Additional labels for this log entry */
  labels: z.record(z.string(), z.string()).optional(),
});
export type LogContext = z.infer<typeof LogContextSchema>;
