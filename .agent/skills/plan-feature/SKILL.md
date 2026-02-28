---
name: 機能仕様策定
description: あいまいな要件から docs/plan/<feature>/ に構造化された仕様ドキュメントを生成する。
user_invocable: true
---

# 概要

機能開発の仕様を策定する skill。
あいまいな要件をヒアリングし、構造化された仕様ドキュメントを `docs/plan/<feature>/` に生成する。

# 実行手順

## Step 1: 要件ヒアリング

以下を1回の質問でまとめて確認する。

1. 機能名（英語ケバブケース: 例 `user-profile`）
2. 機能の目的と背景（なぜ作るのか）
3. 対象ユーザーと利用シナリオ
4. In Scope / Out of Scope
5. 主要ユースケース（1-5個）
6. フロントエンドの画面構成（想定）
7. 未確定事項

## Step 2: 仕様ドキュメント生成

回答をもとに `docs/plan/<feature>/` に以下のファイルを作成する。
各ファイルの記載項目は `docs/plan/README.md` の仕様ファイル概要を参照すること。

- `00_OVERVIEW.md` - 機能概要、目的、スコープ
- `01_FRONTEND.md` - フロントエンドUI仕様

必要に応じて追加:
- `02_DATA_MODEL.md` - データモデル、Zod Schema
- `03_API_INTEGRATION.md` - 外部API連携仕様

未確定の部分は `TBD` と明記する。

## Step 3: 仕様レビューサマリー

生成後に以下を提示する。

1. 生成したファイル一覧
2. 確定事項のサマリー
3. 未確定事項と次に決めるべき論点

# ルール

- 仕様は `docs/plan/<feature>/` に集約する（他の場所に分散させない）
- 型定義は Zod Schema First（`docs/typescript.md` 準拠）

# 参照ドキュメント

- `docs/plan/README.md`
- `docs/frontend-architecture.md`
- `docs/typescript.md`
