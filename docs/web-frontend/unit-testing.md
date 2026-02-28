# Unit Testing ガイド

本ドキュメントでは、フロントエンドプロジェクトに最適なユニットテストの推奨事項をまとめる。

## 関連ドキュメント

- `docs/testing/unit-testing.md` - Unitテストの最新実装方針（モック最小 + テーブルドリブン）
- `docs/web-frontend/twada-tdd.md` - t_wadaベースのTDD運用ルール

## クイックスタート

```bash
# テスト実行
pnpm --filter mypages test

# 単発実行（CI向け）
pnpm --filter mypages test:run

# カバレッジ付き
pnpm --filter mypages test:coverage
```

## 推奨: Vitest

### 選定理由

1. **ESM ネイティブサポート**: プロジェクトが `"type": "module"` を使用
2. **TypeScript ゼロコンフィグ**: ts-jest等の追加設定不要
3. **高速なフィードバック**: CI/開発時のテスト実行が高速
4. **Jest互換API**: 学習コスト低

### パフォーマンス比較

| ベンチマーク | Vitest | Jest |
|-------------|--------|------|
| コールドスタート | 4倍高速 | 基準 |
| Watch mode | 10-20倍高速 | 基準 |
| メモリ使用量 | 30%削減 | 基準 |

---

## テスト戦略

### テーブルドリブンテスト

本プロジェクトでは **Go言語スタイルのテーブルドリブンテスト** を採用する。

#### 基本パターン

```typescript
import { describe, expect, it } from "vitest";

describe("関数名", () => {
  const testCases = [
    {
      name: "ケース1の説明",
      input: { /* 入力値 */ },
      expected: { /* 期待値 */ },
    },
    {
      name: "ケース2の説明",
      input: { /* 入力値 */ },
      expected: { /* 期待値 */ },
    },
  ];

  it.each(testCases)("$name", ({ input, expected }) => {
    const result = targetFunction(input);
    expect(result).toMatchObject(expected);
  });
});
```

### テスト対象の優先順位

1. **ユーティリティ関数** (`app/shared/lib/`): 純粋関数、モック不要
2. **カスタムフック**: `renderHook` で状態遷移を検証
3. **コンポーネントロジック**: Container/Presentationalの境界でテスト

### テーブルドリブンテストのメリット

1. **網羅性**: 入力パターンを一覧で管理、漏れを防止
2. **可読性**: テストケースがデータとして整理される
3. **保守性**: 新規ケース追加が容易（配列に追加するだけ）
4. **デバッグ**: 失敗時に `$name` でどのケースか明確

---

## ディレクトリ構成

```
services/mypages/
├── app/
│   ├── shared/
│   │   ├── lib/
│   │   │   ├── format.ts
│   │   │   └── format.test.ts      # コロケーション
│   │   └── components/
│   │       ├── Button.tsx
│   │       └── Button.test.tsx
│   └── features/
│       └── blog/
│           ├── components/
│           │   ├── PostCard.tsx
│           │   └── PostCard.test.tsx
│           └── hooks/
│               ├── usePost.ts
│               └── usePost.test.ts
├── vitest.config.ts
└── vitest.setup.ts
```

**コロケーション方式**: テストファイルをソースファイルと同じディレクトリに配置

---

## テスト命名規則

日本語でテストケース名を記述する：

```typescript
const testCases = [
  { name: "正常な入力の場合、期待値を返す", ... },
  { name: "空文字の場合、デフォルト値を返す", ... },
  { name: "不正な入力の場合、エラーを返す", ... },
];
```

**命名パターン:**
- 正常系: `「〜できる」「〜を返す」`
- 異常系: `「〜の場合、エラーを返す」`
- 条件付き: `「〜が〜の場合、〜」`

---

## 参考リンク

### 公式ドキュメント
- [Vitest 公式](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [React Router Testing](https://reactrouter.com/how-to/test)

### 比較記事
- [Jest vs Vitest: Which Test Runner Should You Use in 2025?](https://medium.com/@ruverd/jest-vs-vitest-which-test-runner-should-you-use-in-2025-5c85e4f2bda9)
- [Vitest vs Jest | Better Stack](https://betterstack.com/community/guides/scaling-nodejs/vitest-vs-jest/)
