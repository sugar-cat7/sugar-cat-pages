# Result-based Error Handling

This project uses a `Result` type to unify error handling without `try-catch` in
application code. Asynchronous boundaries are wrapped with `wrap`, which returns
`Ok` or `Err`.

## Implementation

[result.ts](../packages/errors/result.ts)
[base.ts](../packages/errors/base.ts)
[error.ts](../packages/errors/error.ts)

## Usage
Example:

```ts
// third-party async function with potential to throw
const textResult = await wrap(
  response.text(),
  (error) =>
    new AppError({
      message: "Failed to read asset text",
      code: "INTERNAL_SERVER_ERROR",
      cause: error,
    }),
);

if (textResult.err) {
  return Err(textResult.err);
}

return Ok(textResult.val);
```

## How It Works
`Result<T, E>`: A union type where success holds `val` and failure holds `err`.

`wrap`: Takes a promise, awaits it, and returns `Ok(val)` or `Err(err)` with
the error created by `errorFactory`.

Benefit: This keeps error handling concise and type-safe for async operations.

## Benefits
- Type Safety: TypeScript narrows based on `result.err`.
- Simplicity: Replaces verbose try/catch blocks for promises.
- Flexibility: Customize error types with `AppError` or domain errors.

## Async Handling Rules

**Always use `await`, never use `.then()`**

```ts
// ✅ Good: Use await
const result = await wrap(fetchData(), errorFactory);

// ❌ Bad: Don't use .then()
wrap(fetchData(), errorFactory).then((result) => { ... });
```

Reason:
- `await` makes control flow explicit and easier to follow
- Error handling with Result type works naturally with `await`
- `.then()` chains lead to nested callbacks and harder debugging

Notes
- Use `wrap` at async boundaries; avoid `try-catch` in app logic.
- `wrap` treats thrown values as `Error`; refine the factory if you need stricter typing.
