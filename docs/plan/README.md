# Feature Plan (Spec-Driven Development)

機能開発の仕様書をここに集約する。
仕様が Single Source of Truth であり、口頭での決定は無効とする。

## 原則: Spec更新 → 実装

1. 仕様変更が発生したら、まず `docs/plan/<feature>/` のドキュメントを更新する
2. ドキュメント更新後に、初めてコードを変更する
3. 口頭やチャットでの合意は仕様ではない。書かれたものだけが仕様である

## ディレクトリ構成

```
docs/plan/
├── README.md                    # 本ドキュメント
└── <feature-name>/              # 機能ごとのディレクトリ
    ├── 00_OVERVIEW.md           # 機能概要、目的、スコープ
    ├── 01_FRONTEND.md           # フロントエンドUI仕様
    └── CHECKLIST.md             # 実装チェックリスト（フェーズ・セッションノート）
```

Claude Code の plan mode で自動生成されたファイル（`.md`）もこのディレクトリに保存される。
feature ディレクトリと自動生成ファイルは名前形式が異なるため衝突しない。

## ワークフロー

### Step 1: 仕様生成 (`/plan-feature`)

あいまいな要件から構造化された仕様ドキュメントを作成する。

- 要件をヒアリングし、上記のファイル構成で仕様を書き出す
- 未確定事項は `TBD` と明記し、次アクションを記録する

### Step 2: チェックリスト生成 (`/init-impl`)

仕様を読み込み、フェーズ分けされた実装チェックリストを生成する。

- 各フェーズに目標、チェックリスト、テストコマンド、セッションノートを含む
- セッションノートには Done / Next / Risks・TODO を記録する

### Step 3: フェーズ実行

チェックリストに従い、フェーズごとに実装を進める。

- 各フェーズの開始時にセッションノートを初期化する
- 完了したタスクにチェックを付ける
- 仕様変更が必要な場合は、まず仕様ドキュメントを更新してからコードを変更する

## 仕様ファイル概要

| ファイル | 内容 |
| --- | --- |
| `00_OVERVIEW.md` | 機能の目的、背景、スコープ、成功指標 |
| `01_FRONTEND.md` | ページ構成、コンポーネント、状態管理 |
| `CHECKLIST.md` | フェーズ分け実装チェックリスト、セッションノート |

## チェックリスト構造

`CHECKLIST.md` は以下の構造で作成する。各フェーズに Goal / Checklist / Testing / Session Notes を含む。

```markdown
# Implementation Checklist: <feature-name>

Spec: `docs/plan/<feature>/`

## Phase 1: Frontend

Document: `01_FRONTEND.md`
Status: Not started

### Goal
フロントエンド実装と UI テスト

### Checklist
- [ ] React Router ルート作成
- [ ] Feature モジュール作成（components/, hooks/, types/）
- [ ] Container コンポーネント
- [ ] Presenter コンポーネント
- [ ] UI テスト

### Testing
pnpm test -- services/mypages/

### Session Notes
- Done:
- Next:
- Risks/TODO:
```

仕様に記載のない層のフェーズは省略してよい。

## セッションノートの書き方

各フェーズの Session Notes には以下の3項目を必ず記録する。

```markdown
### Session Notes
YYYY-MM-DD
- Done: 完了したこと
- Next: 次にやること
- Risks/TODO: 未解決課題
```

日をまたぐ場合やセッション復帰時に、この3項目で文脈を復元する。

## Claude Code 連携

- `.claude/settings.json` の `plansDirectory` を `"./docs/plan"` に設定済み
- Claude Code のプランモードで作成されたファイルも `docs/plan/` に保存される
- プランファイルはバージョン管理対象とする

## 参照

- `/plan-feature` - 仕様生成スキル
- `/init-impl` - チェックリスト生成スキル
- `docs/frontend-architecture.md` - フロントエンドアーキテクチャ
