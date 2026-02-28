# sugar-cat-pages

## 行動の指針

- エラーハンドリング: `Result` 型を使う (`import { wrap, Ok, Err, AppError } from "@blog/errors"`)。try-catch 禁止。
- 型定義: Zod Schema First (`z.infer<typeof schema>`)。明示的な interface 禁止。
- シンプルさ: 不要なコード削除、3回以上の重複時のみ抽象化、早すぎる最適化禁止。
- コード変更後は `./scripts/post-edit-check.sh` を実行すること。

## 技術スタック

- React Router v7 (Framework Mode)
- Tailwind CSS v4
- TypeScript 5.9
- Zod (スキーマバリデーション)
- Cloudflare Workers

## 参照

- 詳細な技術ドキュメント: `docs/`
- AI エージェント用スキル: `.agent/skills/`

## 開発規約

### アーキテクチャ・コーディング

- [docs/frontend-architecture.md](docs/frontend-architecture.md) - フロントエンドアーキテクチャ
- [docs/error-handling.md](docs/error-handling.md) - エラーハンドリング（Result型）
- [docs/typescript.md](docs/typescript.md) - TypeScript規約（Zodスキーマファースト）
- [docs/css.md](docs/css.md) - Tailwind CSS v4ガイドライン
- [docs/react-hooks.md](docs/react-hooks.md) - React Hooks使用法
- [docs/ui-specification.md](docs/ui-specification.md) - UI仕様

### テスト

- [docs/testing/README.md](docs/testing/README.md) - テスト戦略概要
- [docs/testing/unit-testing.md](docs/testing/unit-testing.md) - Unitテスト
- [docs/testing/ui-testing.md](docs/testing/ui-testing.md) - UIテスト
- [docs/testing/e2e-testing.md](docs/testing/e2e-testing.md) - E2Eテスト
- [docs/testing/vrt-testing.md](docs/testing/vrt-testing.md) - VRT
- [docs/web-frontend/twada-tdd.md](docs/web-frontend/twada-tdd.md) - TDD戦略

### デザイン

- [docs/design/colors.md](docs/design/colors.md) - カラーパレット
- [docs/design/typography.md](docs/design/typography.md) - タイポグラフィ
- [docs/design/design-tokens.md](docs/design/design-tokens.md) - デザイントークン
- [docs/design/accessibility.md](docs/design/accessibility.md) - アクセシビリティ
- [docs/design/design-principles.md](docs/design/design-principles.md) - デザイン原則
- [docs/design/design-patterns.md](docs/design/design-patterns.md) - デザインパターン
- [docs/design/content-guidelines.md](docs/design/content-guidelines.md) - コンテンツガイドライン
- [docs/design/icons.md](docs/design/icons.md) - アイコン
- [docs/design/logo.md](docs/design/logo.md) - ロゴ
- [docs/design/writing.md](docs/design/writing.md) - ライティング
- [docs/design/utilities.md](docs/design/utilities.md) - ユーティリティ
- [docs/design/meta.md](docs/design/meta.md) - メタ情報

### セキュリティ・品質

- [docs/security/lint.md](docs/security/lint.md) - Lint / Quality Check
- [docs/security/textlint.md](docs/security/textlint.md) - textlint運用

## Spec-Driven Development

- 機能開発は「仕様策定 → チェックリスト生成 → フェーズ実装」の順で進める。
- 仕様ドキュメントは `docs/plan/<feature>/` に配置する。
- **Spec更新 → 実装**: 仕様変更が発生したら、まず `docs/plan/` を更新してからコードを変更する。口頭の合意は仕様ではない。
- スキル: `/plan-feature`（仕様策定）、`/init-impl`（チェックリスト生成）。

## 開発コマンド

- `pnpm dev` - 開発サーバー起動
- `pnpm build` - ビルド
- `pnpm type-check` - 型チェック
- `pnpm biome` - Lint/フォーマット
- `pnpm textlint` - 日本語技術文書lint
- `pnpm knip` - 未使用コード検出

## Claude Code 運用

- 許可ポリシーと hooks は `.claude/settings.json` で管理する。
- カスタム `/` は `.agent/skills/` に skill として置く。
- `PreToolUse` hook で危険な Bash 操作（`git push`, `git add -A`, `git reset --hard`）をブロックする。
- コード編集時は hook が `.claude/.post_edit_check_pending` を立て、応答終了時に `./scripts/post-edit-check.sh` を実行する。

## パッケージ構成

- `services/mypages` - メインアプリケーション
- `packages/errors` - Result型エラーハンドリング
- `packages/logger` - ロガー
- `packages/dayjs` - 日付ユーティリティ
- `packages/content-fetcher` - コンテンツ取得
