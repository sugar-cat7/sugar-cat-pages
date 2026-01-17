import { describe, expect, it } from "vitest";
import { formatLogEntry } from "./formatter";
import type { LogContext, LoggerConfig } from "./schema";

describe("formatLogEntry", () => {
  const baseConfig: LoggerConfig = {
    name: "test-logger",
    minLevel: 0,
  };

  it("formats basic log message", () => {
    const result = formatLogEntry("INFO", "Hello world", baseConfig);

    expect(result.severity).toBe("INFO");
    expect(result.message).toBe("Hello world");
    expect(result.timestamp).toBeDefined();
    expect(result.logger).toBe("test-logger");
  });

  it("includes all severity levels", () => {
    const testCases = [
      { severity: "DEBUG" as const, expected: "DEBUG" },
      { severity: "INFO" as const, expected: "INFO" },
      { severity: "WARNING" as const, expected: "WARNING" },
      { severity: "ERROR" as const, expected: "ERROR" },
      { severity: "CRITICAL" as const, expected: "CRITICAL" },
    ];

    for (const { severity, expected } of testCases) {
      const result = formatLogEntry(severity, "Test message", baseConfig);
      expect(result.severity).toBe(expected);
    }
  });

  it("includes default labels and service info", () => {
    const config: LoggerConfig = {
      ...baseConfig,
      serviceName: "my-service",
      serviceVersion: "1.0.0",
      defaultLabels: { env: "production" },
    };

    const result = formatLogEntry("INFO", "Test message", config);

    expect(result.labels).toEqual({
      env: "production",
      serviceName: "my-service",
      serviceVersion: "1.0.0",
    });
  });

  it("includes trace context", () => {
    const context: LogContext = {
      traceId: "abc123",
      spanId: "def456",
    };

    const result = formatLogEntry("INFO", "Test message", baseConfig, context);

    expect(result.traceId).toBe("abc123");
    expect(result.spanId).toBe("def456");
  });

  it("includes HTTP request", () => {
    const context: LogContext = {
      httpRequest: {
        method: "GET",
        url: "/api/users",
        status: 200,
        userAgent: "Mozilla/5.0",
        remoteIp: "192.168.1.1",
        latencyMs: 123,
      },
    };

    const result = formatLogEntry("INFO", "Test message", baseConfig, context);

    expect(result.httpRequest).toEqual({
      method: "GET",
      url: "/api/users",
      status: 200,
      userAgent: "Mozilla/5.0",
      remoteIp: "192.168.1.1",
      latencyMs: 123,
    });
  });

  it("merges context labels with default labels", () => {
    const config: LoggerConfig = {
      ...baseConfig,
      defaultLabels: { env: "production", team: "backend" },
    };

    const context: LogContext = {
      labels: { requestId: "req-123", env: "staging" }, // env should override
    };

    const result = formatLogEntry("INFO", "Test message", config, context);

    expect(result.labels).toEqual({
      env: "staging", // overridden by context
      team: "backend",
      requestId: "req-123",
    });
  });

  it("includes structured data", () => {
    const data = { userId: "123", role: "admin" };

    const result = formatLogEntry(
      "INFO",
      "User logged in",
      baseConfig,
      undefined,
      data,
    );

    expect(result.data).toEqual({ userId: "123", role: "admin" });
  });

  it("handles Error objects", () => {
    const error = new Error("Something went wrong");
    error.stack = "Error: Something went wrong\n    at test.ts:1:1";

    const result = formatLogEntry(
      "ERROR",
      "An error occurred",
      baseConfig,
      undefined,
      undefined,
      error,
    );

    expect(result.severity).toBe("ERROR");
    expect(result.error).toEqual({
      name: "Error",
      message: "Something went wrong",
      stack: "Error: Something went wrong\n    at test.ts:1:1",
    });
  });

  it("handles data with circular references", () => {
    const circularObj: Record<string, unknown> = { name: "test" };
    circularObj.self = circularObj;

    const result = formatLogEntry(
      "INFO",
      "Test message",
      baseConfig,
      undefined,
      { circular: circularObj },
    );

    expect(result.data).toBeDefined();
    // Should not throw and should handle circular reference
    expect(typeof result.data?.circular).toBe("string");
  });

  it("omits empty labels", () => {
    const config: LoggerConfig = {
      name: "test-logger",
      minLevel: 0,
    };

    const result = formatLogEntry("INFO", "Test message", config);

    expect(result.labels).toBeUndefined();
  });

  it("omits undefined optional fields", () => {
    const result = formatLogEntry("INFO", "Test message", baseConfig);

    expect(result.traceId).toBeUndefined();
    expect(result.spanId).toBeUndefined();
    expect(result.httpRequest).toBeUndefined();
    expect(result.data).toBeUndefined();
    expect(result.error).toBeUndefined();
  });
});
