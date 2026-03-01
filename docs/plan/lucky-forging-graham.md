# biome check 指摘修正

## Context

PR #28 で biome を導入したが、既存コード全体に biome check を適用すると 114 errors + 166 warnings が検出される。
内容はフォーマット（trailing comma, indent）と import 順序整理がほぼ全て。自動修正で対応する。

## 手順

1. `pnpm biome:fix` (`biome check --write .`) を実行して一括自動修正
2. `pnpm biome` で修正漏れがないことを確認
3. `./scripts/post-edit-check.sh` で全体チェック

## 検証

- `pnpm biome` がエラー 0 で通ること
- `pnpm build` が成功すること
- `pnpm type-check` が成功すること
