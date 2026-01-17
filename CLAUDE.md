# sugar-cat-pages

## 技術スタック

- React Router v7 (Framework Mode)
- Tailwind CSS v4
- TypeScript 5.9
- Zod (スキーマバリデーション)
- Cloudflare Workers

## 開発規約

### アーキテクチャ・コーディング

- [docs/frontend-architecture.md](docs/frontend-architecture.md) - フロントエンドアーキテクチャ
- [docs/error-handling.md](docs/error-handling.md) - エラーハンドリング（Result型）
- [docs/typescript.md](docs/typescript.md) - TypeScript規約（Zodスキーマファースト）
- [docs/css.md](docs/css.md) - Tailwind CSS v4ガイドライン
- [docs/react-hooks.md](docs/react-hooks.md) - React Hooks使用法
- [docs/ui-specification.md](docs/ui-specification.md) - UI仕様

### デザイン

- [docs/design/colors.md](docs/design/colors.md) - カラーパレット
- [docs/design/typography.md](docs/design/typography.md) - タイポグラフィ
- [docs/design/design-tokens.md](docs/design/design-tokens.md) - デザイントークン
- [docs/design/accessibility.md](docs/design/accessibility.md) - アクセシビリティ
- [docs/design/icons.md](docs/design/icons.md) - アイコン
- [docs/design/logo.md](docs/design/logo.md) - ロゴ
- [docs/design/writing.md](docs/design/writing.md) - ライティング
- [docs/design/utilities.md](docs/design/utilities.md) - ユーティリティ
- [docs/design/meta.md](docs/design/meta.md) - メタ情報

## 開発コマンド

- `pnpm dev` - 開発サーバー起動
- `pnpm build` - ビルド
- `pnpm type-check` - 型チェック
- `pnpm biome` - Lint/フォーマット
- `pnpm knip` - 未使用コード検出

## パッケージ構成

- `services/mypages` - メインアプリケーション
- `packages/errors` - Result型エラーハンドリング
- `packages/logger` - ロガー
- `packages/dayjs` - 日付ユーティリティ
- `packages/content-fetcher` - コンテンツ取得
