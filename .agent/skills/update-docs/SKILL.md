---
name: ドキュメント更新
description: コード変更に伴う docs/ の更新。docs/ を常に最新に保つ。
---

# トリガー条件

- 新機能の実装やアーキテクチャ変更を行った後
- 既存の仕様・規約を変更した後
- ユーザーから docs の更新を依頼されたとき

# ルール

- `docs/` が全ての技術ドキュメントの Single Source of Truth
- コード変更に伴い、関連する docs/ ファイルを必ず更新する
- 新しい概念・パターンを導入した場合は、対応する docs/ ファイルを新規作成する
- Skills の SKILL.md は docs/ へのポインタのみ。詳細を skills に書かない

# docs 構成

- `docs/plan/` - 機能仕様（Spec-Driven Development、機能ごとの仕様・チェックリスト）
- `docs/testing/` - テスト実装方針（Unit/UI/VRT/E2E）
- `docs/web-frontend/` - フロントエンド（TDD、テスト、アクセシビリティ）
- `docs/design/` - デザインシステム（トークン、カラー、タイポグラフィ、UIパターン、原則、a11y）
- `docs/security/` - セキュリティ（lint、スキャン）
- `docs/` (root) - アーキテクチャ、CSS、エラーハンドリング、TypeScript、React Hooks、UI仕様
