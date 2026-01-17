import { describe, expect, it } from "vitest";
import { AppError } from "./error";
import { Err, Ok, wrap } from "./result";

// ============================================
// Ok tests
// ============================================

describe("Ok", () => {
  const testCases = [
    {
      name: "値なしで作成できる",
      input: undefined,
      expectedVal: undefined,
    },
    {
      name: "文字列を値として持てる",
      input: "success",
      expectedVal: "success",
    },
    {
      name: "オブジェクトを値として持てる",
      input: { id: 1, name: "test" },
      expectedVal: { id: 1, name: "test" },
    },
    {
      name: "配列を値として持てる",
      input: [1, 2, 3],
      expectedVal: [1, 2, 3],
    },
    {
      name: "null を値として持てる",
      input: null,
      expectedVal: null,
    },
    {
      name: "数値を値として持てる",
      input: 42,
      expectedVal: 42,
    },
    {
      name: "boolean を値として持てる",
      input: true,
      expectedVal: true,
    },
  ];

  it.each(testCases)("$name", ({ input, expectedVal }) => {
    const result = Ok(input);

    expect(result.val).toEqual(expectedVal);
    expect(result.err).toBeUndefined();
  });
});

// ============================================
// Err tests
// ============================================

describe("Err", () => {
  const testCases = [
    {
      name: "基本的なエラーを保持できる",
      input: {
        message: "Something went wrong",
        code: "INTERNAL_SERVER_ERROR" as const,
      },
      expected: {
        message: "Something went wrong",
        code: "INTERNAL_SERVER_ERROR",
      },
    },
    {
      name: "NOT_FOUND エラーを保持できる",
      input: {
        message: "Not found",
        code: "NOT_FOUND" as const,
        context: { resourceId: "123" },
      },
      expected: {
        message: "Not found",
        code: "NOT_FOUND",
        context: { resourceId: "123" },
      },
    },
    {
      name: "BAD_REQUEST エラーを保持できる",
      input: {
        message: "Invalid input",
        code: "BAD_REQUEST" as const,
      },
      expected: {
        message: "Invalid input",
        code: "BAD_REQUEST",
      },
    },
  ];

  it.each(testCases)("$name", ({ input, expected }) => {
    const error = new AppError(input);
    const result = Err(error);

    expect(result.err?.message).toBe(expected.message);
    expect(result.err?.code).toBe(expected.code);
    if (expected.context) {
      expect(result.err?.context).toEqual(expected.context);
    }
    expect(result.val).toBeUndefined();
  });
});

// ============================================
// Result type discrimination tests
// ============================================

describe("Result type discrimination", () => {
  const testCases = [
    {
      name: "Ok の場合は val が存在し、err が存在しない",
      createResult: () => Ok("value"),
      isOk: true,
      expectedVal: "value",
    },
    {
      name: "Err の場合は err が存在し、val が存在しない",
      createResult: () =>
        Err(new AppError({ message: "Error", code: "BAD_REQUEST" })),
      isOk: false,
      expectedMessage: "Error",
    },
  ];

  it.each(testCases)("$name", ({ createResult, isOk, expectedVal, expectedMessage }) => {
    const result = createResult();

    if (isOk) {
      expect(result.err).toBeUndefined();
      expect(result.val).toBe(expectedVal);
    } else {
      expect(result.err).toBeDefined();
      expect(result.err?.message).toBe(expectedMessage);
      expect(result.val).toBeUndefined();
    }
  });
});

// ============================================
// wrap tests
// ============================================

describe("wrap", () => {
  const createError = (err: Error) =>
    new AppError({
      message: err.message,
      code: "INTERNAL_SERVER_ERROR",
      cause: err,
    });

  const successTestCases = [
    {
      name: "成功した Promise を Ok でラップする",
      promise: () => Promise.resolve("success"),
      expectedVal: "success",
    },
    {
      name: "オブジェクトを返す Promise をラップできる",
      promise: () => Promise.resolve({ data: "async result" }),
      expectedVal: { data: "async result" },
    },
    {
      name: "配列を返す Promise をラップできる",
      promise: () => Promise.resolve([1, 2, 3]),
      expectedVal: [1, 2, 3],
    },
    {
      name: "null を返す Promise をラップできる",
      promise: () => Promise.resolve(null),
      expectedVal: null,
    },
  ];

  it.each(successTestCases)("$name", async ({ promise, expectedVal }) => {
    const result = await wrap(promise(), createError);

    expect(result.val).toEqual(expectedVal);
    expect(result.err).toBeUndefined();
  });

  const failureTestCases = [
    {
      name: "失敗した Promise を Err でラップする",
      promise: () => Promise.reject(new Error("Failed")),
      expectedMessage: "Failed",
      expectedCode: "INTERNAL_SERVER_ERROR",
    },
    {
      name: "非同期関数のエラーをラップできる",
      promise: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1));
        throw new Error("Async error");
      },
      expectedMessage: "Async error",
      expectedCode: "INTERNAL_SERVER_ERROR",
    },
  ];

  it.each(failureTestCases)(
    "$name",
    async ({ promise, expectedMessage, expectedCode }) => {
      const result = await wrap(promise(), createError);

      expect(result.err).toBeDefined();
      expect(result.err?.message).toBe(expectedMessage);
      expect(result.err?.code).toBe(expectedCode);
      expect(result.val).toBeUndefined();
    },
  );

  const customErrorFactoryTestCases = [
    {
      name: "カスタムエラーファクトリでエラーを変換できる",
      errorFactory: (err: Error) =>
        new AppError({
          message: `Custom: ${err.message}`,
          code: "BAD_REQUEST",
          context: { original: err.message },
        }),
      originalMessage: "Original error",
      expectedMessage: "Custom: Original error",
      expectedCode: "BAD_REQUEST",
      expectedContext: { original: "Original error" },
    },
  ];

  it.each(customErrorFactoryTestCases)(
    "$name",
    async ({
      errorFactory,
      originalMessage,
      expectedMessage,
      expectedCode,
      expectedContext,
    }) => {
      const promise = Promise.reject(new Error(originalMessage));
      const result = await wrap(promise, errorFactory);

      expect(result.err?.message).toBe(expectedMessage);
      expect(result.err?.code).toBe(expectedCode);
      expect(result.err?.context).toEqual(expectedContext);
    },
  );
});

