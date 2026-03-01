# 設定ファイル見直し: 重複削減・aqua導入・CI整理

## Context

設定ファイル（biome, tsconfig, knip, turbo, vitest等）に重複・stale参照が多数存在し、CIとの不整合もある。biomeのインストール方法が不明確（npm依存にもaquaにもない）。設定をシンプルに保ちつつ、base/extends パターンで共通化する。

## 問題の全体像

| 問題 | 影響度 |
|------|--------|
| biome がどこにもインストールされていない（npm依存にもaqua.yamlにもない） | **致命的** |
| `turbo type-check` vs mypages `typecheck`（名前不一致） | **致命的** |
| CI の `@mypages/errors` → 正しくは `@my-pages/errors` | **致命的** |
| tsconfig.json が4パッケージで重複 | 中 |
| knip.json に存在しない `services/server`、欠けている `dayjs`, `content-fetcher` | 中 |
| .octocov.yml が完全にstale | 低 |
| turbo.json に不要なbiomeタスク5個 + `dev:subscriber` | 中 |
| lefthook pre-push が pre-commit と完全重複 | 低 |
| renovate groupLinters に eslint/prettier/stylelint（未使用） | 低 |

---

## 実装プラン

### Phase 1: aqua導入 + biome実行の修正

biomeがnpm依存に存在しないため、aquaで管理する。

**1-1. `/aqua.yaml` 作成**
```yaml
---
registries:
  - type: standard
    ref: v4.311.0
packages:
  - name: biomejs/biome
    version: 2.3.8
```

**1-2. `.gitignore` に `.aqua/` 追加**

**1-3. `biome.base.json` → `biome.json` にリネーム**
- `--config-path` が不要になり、全ての呼び出しが簡素化
- biome.json 内の `$schema` はそのまま

**1-4. root `package.json` の biome スクリプト変更**
```json
"biome": "biome check .",
"biome:fix": "biome check --write ."
```

**1-5. `turbo.json` から biome タスク5個を削除**
- `biome`, `biome:check`, `biome:format`, `biome:unsafe-fix`, `biome:lint` → 全削除
- biome はプロジェクト全体に対して1回実行するツールなので、turbo経由は不適切

**1-6. `turbo.json` から `dev:subscriber` 削除**（対応するスクリプトが存在しない）

**1-7. `turbo.json` build outputs から `.next/**` 削除**（Next.js未使用）

### Phase 2: tsconfig 共通化

**2-1. `/tsconfig.base.json` 作成**
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "noEmit": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "exactOptionalPropertyTypes": true,
    "skipLibCheck": true
  }
}
```

変更点:
- `outDir: "./dist"` 削除（`noEmit: true` と矛盾。ビルドはtsupが担当）
- `module: "CommonJS"` → `"ESNext"` + `moduleResolution: "bundler"`（tsupバンドラー前提に合わせる）

**2-2. 各パッケージの tsconfig.json を extends に変更**

`packages/errors/tsconfig.json`, `packages/logger/tsconfig.json`, `packages/dayjs/tsconfig.json`:
```json
{ "extends": "../../tsconfig.base.json" }
```

`packages/content-fetcher/tsconfig.json`:
```json
{
  "extends": "../../tsconfig.base.json",
  "include": ["src/**/*"]
}
```

`services/mypages/tsconfig.json` はproject references方式で独自構成のため変更なし。

### Phase 3: type-check 名前不一致の修正

**3-1. `services/mypages/package.json`**: `"typecheck"` → `"type-check"` にリネーム

**3-2. 各パッケージに `type-check` スクリプト追加**

`packages/errors`, `packages/logger`, `packages/dayjs`, `packages/content-fetcher` の package.json:
```json
"type-check": "tsc --noEmit"
```

### Phase 4: knip.json 修正

- `services/server` ワークスペース削除（ディレクトリ不在）
- `packages/dayjs` ワークスペース追加
- `packages/content-fetcher` ワークスペース追加（entry: `src/index.ts`, `src/schemas.ts`, `src/cli.ts`）
- `services/mypages` の `.next/**` ignore → 不要なので削除

### Phase 5: staleファイル削除・整理

**5-1. `.octocov.yml` 削除**（`services/server` 参照。CIのtest jobもコメントアウト済み）

**5-2. `renovate/groupLinters.json` 整理**
```json
{
  "packageRules": [
    {
      "matchPackageNames": ["@biomejs/biome"],
      "groupName": "linters"
    }
  ]
}
```
eslint, prettier, stylelint 関連を削除。

### Phase 6: lefthook 簡素化

pre-push から pre-commit と重複する4ジョブ（biome, knip, type-check, textlint）を削除し、build のみに:
```yaml
pre-push:
  parallel: true
  jobs:
    - name: build
      run: pnpm build
```

### Phase 7: CI（pr-check.yaml）修正

**7-1. パッケージ名修正（済）**: `@mypages/errors` → `@my-pages/errors`, `@mypages/dayjs` → `@my-pages/dayjs`

**7-2. biome-check ジョブ: aqua → pnpm に変更**

aqua registry が biome 2.x のリリースアセットを解決できない（`github_release package requires asset` エラー）。
biome は既に `@biomejs/biome` として root devDependency に追加済みなので、pnpm install 経由で biome を実行する:
```yaml
biome-check:
  runs-on: ubuntu-latest
  timeout-minutes: 5
  steps:
    - uses: actions/checkout@v6
    - name: Set up pnpm
      uses: pnpm/action-setup@v4
      with:
        version: 10.28.0
    - name: Install dependencies
      run: pnpm install --frozen-lockfile
    - name: Biome Check
      run: pnpm biome
```

**7-3. type-check ジョブ: content-fetcher のビルド追加**

mypages が `@my-pages/content-fetcher` に依存しているが、CIでビルドされていないため `Cannot find module` エラー。
個別の `--filter` 指定を `pnpm turbo build --filter='./packages/*'` に置き換え、全パッケージを確実にビルド:
```yaml
      - name: Build packages
        run: pnpm turbo build --filter='./packages/*'
```

**7-4. コメントアウト済みの test ジョブ**: パッケージ名だけ修正して残す（復活は別タスク）

---

## 対象ファイル一覧

### 新規作成
- `/aqua.yaml`
- `/tsconfig.base.json`

### 変更
- `/biome.base.json` → `/biome.json`（リネーム）
- `/package.json` — biome スクリプト
- `/turbo.json` — biomeタスク削除, dev:subscriber削除, .next削除
- `/knip.json` — ワークスペース修正
- `/lefthook.yml` — pre-push 簡素化
- `/renovate/groupLinters.json` — 未使用linter削除
- `/packages/errors/tsconfig.json` — extends化
- `/packages/logger/tsconfig.json` — extends化
- `/packages/dayjs/tsconfig.json` — extends化
- `/packages/content-fetcher/tsconfig.json` — extends化
- `/packages/errors/package.json` — type-check追加
- `/packages/logger/package.json` — type-check追加
- `/packages/dayjs/package.json` — type-check追加
- `/packages/content-fetcher/package.json` — type-check追加
- `/services/mypages/package.json` — typecheck→type-check
- `/.github/workflows/pr-check.yaml` — パッケージ名修正, biome job変更
- `/.gitignore` — .aqua/ 追加
- `/scripts/post-edit-check.sh` — biome.base.json → biome.json に伴う変更は不要（pnpm biome 経由のため）

### 削除
- `/.octocov.yml`

## スコープ外（今回は対応しない）

- vitest.config.ts の共通化（3ファイル10行の重複。抽象化コストに見合わない）
- tsup.config.ts の共通化（同上）
- CI test ジョブの復活（別タスク）
- security-scan.yaml の変更（問題なし）

## 検証方法

1. `pnpm install` → 正常完了
2. `pnpm build` → 全パッケージビルド成功
3. `pnpm type-check` → turbo経由で全ワークスペースの型チェック成功
4. `biome check .` → root から直接実行可能
5. `pnpm knip` → staleワークスペースのエラーが消える
6. `pnpm textlint` → 変更なしで成功
7. `./scripts/post-edit-check.sh` → 全チェック通過
