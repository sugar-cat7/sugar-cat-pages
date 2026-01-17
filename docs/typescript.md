# TypeScript Type System Usage Instructions

## Core Guidelines

1. Use Zod schemas as the source of truth for type definitions
2. Infer types from schemas instead of writing explicit interfaces
3. Restrict `as` to library boundaries, never in app logic
4. Use `satisfies` for object literal type checking

---

## Schema-First Development

Define Zod schemas as the source of truth for data structures:

```typescript
// Base schema (source of truth)
const baseSchema = z.object({
  id: z.string(),
  createdAt: z.date()
});

// Extended schema
const extendedSchema = baseSchema.extend({
  additionalField: z.boolean()
});

// Inferred types
type Base = z.infer<typeof baseSchema>;
type Extended = z.infer<typeof extendedSchema>;
```

---

## `satisfies` Operator

Always use `satisfies` instead of type annotations (`: Type`) when defining object literals.

**Why `satisfies`?**
- Validates object shape at compile time
- Preserves literal types (not widened to `string`)
- Catches missing properties at definition site

**Pattern: Object literals**

```typescript
// ❌ BAD: Type annotation widens literal types
const styles: Record<Variant, string> = {
  primary: "bg-blue-500",
  secondary: "bg-gray-500",
};

// ✅ GOOD: satisfies preserves literal types
const styles = {
  primary: "bg-blue-500",
  secondary: "bg-gray-500",
} satisfies Record<Variant, string>;
```

**Pattern: Configuration objects**

```typescript
const config = {
  apiEndpoint: "/api/v1",
  timeout: 5000,
} satisfies ApiConfig;
```

**When to use `satisfies`:**
- Object literal assignments: `const x = {...} satisfies Type`
- Return statements with object literals
- Configuration objects and constants

**When type annotation is still appropriate:**
- Variable declarations without initializer: `let x: Type;`
- Function parameters: `function foo(x: Type)`
- Generic type parameters: `useState<Type>()`

---

## Type Safety

- Enable `strict` in `tsconfig.json`
- Leverage `Partial`, `Pick`, `Omit` for type variations
- Use control flow analysis with early returns for type narrowing
- Isolate `as` to utils with comments explaining why

---

## Best Practices

1. Import base schemas from their source of truth
2. Use schema composition over type composition
3. Leverage Zod's built-in validation
4. Keep validation logic in the schema definition
