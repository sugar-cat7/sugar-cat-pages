# Portfolio Design Refresh: Terminal/CRT Aesthetic

## Context

`/Users/suga-cat/Downloads/portfolio/` に Terminal/CRT 美学のプロトタイプ（深い黒背景 + oklch アクセント + JetBrains Mono/Space Grotesk + 48px グリッド + スキャンライン + ガラスモーフィズム topbar + typewriter アニメ + コーナーブラケット）がある。現行 `sugar-cat-pages` は明るめの Tailwind v4 デザインだが、**ルーティング・データ（posts.json/talks.json/projects.ts/profile.ts）・Presenter 契約はそのまま使える**。本計画は "コンテンツとファイル構造はそのまま、**デザインのみ**を Terminal 美学へ全面刷新" を目的とする。

## Decisions（ユーザー確定事項）

1. **テーマモード**: ダーク単一に簡素化。`ThemeToggle` と `[data-theme="light"]` 系スタイルは削除。`themeScript` も簡素化。
2. **アーカイブ行のタグ**: 既存 `source` フィールド（`zenn` / `hatena` / `speakerdeck` 等）をタグとして表示・色分けする。新規フィールド追加・手動タグ付けは行わない。

## 全体方針

**変更しない**
- `app/routes.ts`、全ルートの loader、`packages/content-fetcher`、`routes/*/data/*`、`feed/route.tsx`（RSS XML）
- Presenter コンポーネントの **props 契約**（`ArticleCard`/`TalkCard`/`ProjectCard` など同じ引数で受ける）
- 型定義・Zod スキーマ・`shared/lib/seo.ts`・`entry.server.tsx`

**変更する（デザイン / JSX 構造のみ）**
- `app.css`（トークン・@theme・@utility をダーク前提に全面差し替え）
- `root.tsx`（フォント link 差し替え、theme-color meta、themeScript 簡素化）
- `_layout.tsx`（背景グリッド + スキャンラインのデコレーション層を追加）
- 共通 Presenter（Header / Footer / Tag / SectionHeading / Pagination）
- 各ルート配下の Presenter（Hero / LatestPosts / LatestTalks / ProfileSection / CareerSection / BiographySection / CertificationsSection / BlogPagePresenter / ArticleCard / TalksPagePresenter / TalkCard / WorksPagePresenter / ProjectCard）

**削除**
- `shared/components/presenters/ThemeToggle.tsx` と利用箇所
- `shared/lib/theme.ts` のうち light 分岐（script 簡素化）

**新規追加**
- `shared/components/presenters/`: `TerminalPrompt.tsx`, `Caret.tsx`, `GridBackground.tsx`, `ScanlineOverlay.tsx`, `CornerBracket.tsx`, `TypeWriter.tsx`, `StatusDot.tsx`
- `shared/lib/tag-color.ts`（source → 色 variant のマッピング）

## 1. デザイントークン刷新 (`services/mypages/app/app.css`)

3 層構造（palette → semantic → `@theme`）は維持。値だけ差し替え。`[data-theme="light"]` 分岐は削除して単一 `:root` に統合。

```css
:root {
  /* Base palette */
  --palette-bg-900: #0a0d0c;
  --palette-bg-800: #0f1413;
  --palette-bg-700: #161c1a;
  --palette-bg-600: #1d2522;
  --palette-line:   #20272a;
  --palette-line-2: #2e3638;
  --palette-fg:     #e7ece4;
  --palette-fg-dim: #94a09a;
  --palette-fg-mute:#60706a;
  --palette-mint:   oklch(0.82 0.17 140);
  --palette-amber:  oklch(0.82 0.15 65);
  --palette-violet: oklch(0.72 0.18 295);
  --palette-coral:  oklch(0.72 0.19 25);

  /* Semantic (既存のキー名を踏襲して Tailwind クラス流用) */
  --token-canvas: var(--palette-bg-900);
  --token-surface: var(--palette-bg-700);
  --token-surface-raised: var(--palette-bg-600);
  --token-text: var(--palette-fg);
  --token-text-soft: var(--palette-fg-dim);
  --token-text-muted: var(--palette-fg-mute);
  --token-border: var(--palette-line);
  --token-border-strong: var(--palette-line-2);
  --token-accent: var(--palette-mint);
}
```

`@theme` では以下を追加／差し替え:
- `--font-body: "JetBrains Mono", ui-monospace, ...;`
- `--font-display: "Space Grotesk", "JetBrains Mono", ui-monospace, ...;`
- `--font-jp: "M PLUS Rounded 1c", "Hiragino Maru Gothic ProN", sans-serif;`
- `--color-mint / --color-amber / --color-violet / --color-coral / --color-line-2` を追加
- `--radius-*` を 2px 基調にフラット化（Tailwind の `rounded-lg/md/sm` が自動でシャープ化）

`@layer base`:
- `body` に radial-gradient orbs（mint × 14%、violet × 10%）+ `--color-background` の複合背景
- `:lang(ja) { font-family: var(--font-jp); }` で日本語ブロックのみ M PLUS を強制
- `::selection { background: color-mix(in oklch, var(--color-mint) 28%, transparent); }`
- `:focus-visible { outline: 2px solid var(--color-mint); outline-offset: 2px; }`
- `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } }`

`@utility`（再利用フラグメント）:
- `fx-grid` — 48px 線グリッド画像 + radial mask
- `fx-scan` — 3px 繰り返し linear-gradient + `mix-blend-mode: overlay`
- `glass-topbar` — `backdrop-filter: blur(14px) saturate(1.5)` + `background: rgb(10 13 12 / 0.76)`

`@theme` keyframes: `blink`, `pulse`, `scan` を定義。

## 2. `root.tsx` と共通レイアウト

- `root.tsx` の `links()`: Google Fonts を `JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;600;700&family=M+PLUS+Rounded+1c:wght@400;500;700&display=swap` に差し替え。M PLUS の太字は JP 見出し用に保持、不要なら weight 削減。
- `<meta name="theme-color" content="#0a0d0c">` 追加。
- `themeScript` を「常に `data-theme="dark"` を付けるだけ」に簡素化、あるいは属性自体を廃止。
- `_layout.tsx`: 最上段に `<GridBackground />`（z-0, `aria-hidden`, pointer-events:none）と `<ScanlineOverlay />`（z-1）を固定配置、コンテンツを `relative z-[2]` で載せる。Header/Footer の呼び出しは現状維持。

## 3. 共通 Presenter

**Header** (`shared/components/presenters/Header.tsx`)
- 左ブランド: `<TerminalPrompt label="sugar-cat" />`（`$ sugar-cat` + blinking caret）
- ナビ: 既存 `navLinks` に番号プレフィックス（`01 home` / `02 about` …）を JSX 側でレンダリング（配列は不変）
- 右上: `<StatusDot />` + `connected · 100%` ステータス（lg 以上）
- 背景: `glass-topbar` utility + `border-b border-token-border`

**Footer** (`shared/components/presenters/Footer.tsx`)
- 左: `~/sugar-cat $ exit — © 2026`
- 右: 社外リンクをブラケット mono 表記（`[github]` `[x]` `[zenn]` `[qiita]` `[rss]`）
- 既存の `socialLinks` 配列は据え置き、装飾だけ変更

**Tag** (`shared/components/presenters/Tag.tsx`)
- variant union を拡張: 既存の `default/zenn/hatena/speakerdeck/external` に加え `mint/amber/violet/coral` を追加
- 各 variant クラスを `bg-{color}/10 text-{color} border border-{color}/40 font-mono text-xs` 形式に統一
- source タグの色マッピングは `shared/lib/tag-color.ts` の `tagVariant()` を介して呼び出し（下記 §5）

**SectionHeading** — 見出しの前に `~/` プロンプトを差し込むスタイル（例: `~/writings`）。props 不変。

**Pagination** — クラス差し替えのみ（ボーダー + mono + mint フォーカス）。

## 4. 各ルートの Presenter 刷新

### home
- **HeroSection**: 2 カラム（320px 1fr）。
  - 左: アバター（1px mint ボーダー + radial mint glow + 四隅 `<CornerBracket />` + `<ScanlineOverlay />` 重畳 + `filter: grayscale(0.2) contrast(1.1) brightness(0.95) drop-shadow(0 0 8px var(--color-mint)/40) mix-blend-mode: screen`）とキャプション（`status` / `tz` / `handle`）
  - 右: `<HeroTag>available-for-contact</HeroTag>` → `<TypeWriter text="const engineer = \"Sugar Cat\"" />`（syntax highlight 風に `n-op/n-var/n-str` 相当のスパンで色分け）→ `› Software Engineer` + caret → 既存 tagline + social links
- **LatestPostsSection / LatestTalksSection**: 構造維持、カードに `.post-feature` 風スタイル（1px border、hover で `translate(-2px,-2px) + 4px 4px 0 color-mix(mint 40%,_)`）。

### about
- Page タイトル: `~/about`（`SectionHeading` 経由）
- 先頭に `<CommandBreadcrumb>$ cat profile.md</CommandBreadcrumb>`
- **ProfileSection**: bordered card、左にアバター（Hero と同じ処理を軽量化）、右に bio + skills（既存 `profile.skills` があればそれを使用、無ければ profile.ts に追加）
- **CareerSection / BiographySection**: 既存タイムライン縦線を `bg-mint/40` に、dot を `bg-mint` に。日付は tabular-nums で mono。
- **CertificationsSection**: flat border + dashed separator。

### blog
- **BlogPagePresenter**: グリッドからアーカイブリストへ切替。`posts` を `publishedAt` の年で groupBy し、`.arc-year-head`（年 + dashed rule）の下に `<ArticleRow />` を並べる。
- **ArticleCard.tsx**: ファイル名・公開 API は維持しつつ、内部を行レイアウト `[date] [source-tag] title [↗]` に再実装。`<Tag variant={tagVariant(post.source)}>{post.source}</Tag>`。

### talks
- **TalksPagePresenter** / **TalkCard.tsx**: blog と同様にアーカイブ行化。`source: "speakerdeck"` 等を mint/amber/violet から tagVariant で割当。

### works
- **WorksPagePresenter**: グリッド維持。
- **ProjectCard.tsx**: `.post-feature` 風カード + 技術スタックチップ行（`project.technologies` を `<Tag variant="mint">` で並べる）。`technologies` が空の場合は非表示。

### feed
- `feed/route.tsx` は変更なし。

## 5. タグ色マッピング（`shared/lib/tag-color.ts`）

```ts
import type { TagVariant } from "../components/presenters/Tag";

const MAP: Record<string, TagVariant> = {
  zenn: "violet",
  hatena: "amber",
  speakerdeck: "mint",
  qiita: "amber",
  external: "coral",
};

export function tagVariant(source: string | undefined): TagVariant {
  if (!source) return "default";
  return MAP[source.toLowerCase()] ?? "default";
}
```

`Tag.tsx` の variant union は `TagVariant` として再 export。利用箇所（`ArticleCard`/`TalkCard`/`ProjectCard`）で `variant={tagVariant(source)}` を渡す。

## 6. 新規 util Presenter（いずれも 20-40 行程度の小物）

- `TerminalPrompt.tsx` — `<span className="font-display"><span className="text-mint">$</span>&nbsp;{label}<Caret/></span>`
- `Caret.tsx` — blinking block、`@keyframes blink` を参照、`prefers-reduced-motion` で停止
- `GridBackground.tsx` — `<div aria-hidden className="fixed inset-0 fx-grid pointer-events-none z-0" />`
- `ScanlineOverlay.tsx` — `<div aria-hidden className="fixed inset-0 fx-scan pointer-events-none z-[1]" />`
- `CornerBracket.tsx` — `position: "tl"|"tr"|"bl"|"br"` を受け取り、絶対配置の14x14 ブラケットを返す
- `TypeWriter.tsx` — props `{ text: string; speedMs?: number; className?: string }`。`useSyncExternalStore` で `matchMedia('(prefers-reduced-motion: reduce)')` を監視し、reduce 時は即時全文描画（アニメ無し）。
- `StatusDot.tsx` — `animate-[pulse_2s_ease-in-out_infinite]` の小円

## 7. 変更対象ファイル

**Modify**
- `services/mypages/app/app.css`
- `services/mypages/app/root.tsx`
- `services/mypages/app/shared/lib/theme.ts`（light 分岐削除）
- `services/mypages/app/routes/_layout.tsx`
- `services/mypages/app/shared/components/presenters/Header.tsx`
- `services/mypages/app/shared/components/presenters/Footer.tsx`
- `services/mypages/app/shared/components/presenters/Tag.tsx`
- `services/mypages/app/shared/components/presenters/SectionHeading.tsx`
- `services/mypages/app/shared/components/presenters/Pagination.tsx`
- `services/mypages/app/routes/home/components/presenters/HeroSection.tsx`
- `services/mypages/app/routes/home/components/presenters/LatestPostsSection.tsx`
- `services/mypages/app/routes/home/components/presenters/LatestTalksSection.tsx`
- `services/mypages/app/routes/about/pages/presenters/AboutPagePresenter.tsx`
- `services/mypages/app/routes/about/components/presenters/ProfileSection.tsx`
- `services/mypages/app/routes/about/components/presenters/CareerSection.tsx`
- `services/mypages/app/routes/about/components/presenters/BiographySection.tsx`
- `services/mypages/app/routes/about/components/presenters/CertificationsSection.tsx`
- `services/mypages/app/routes/blog/pages/presenters/BlogPagePresenter.tsx`
- `services/mypages/app/routes/blog/components/presenters/ArticleCard.tsx`
- `services/mypages/app/routes/talks/pages/presenters/TalksPagePresenter.tsx`
- `services/mypages/app/routes/talks/components/presenters/TalkCard.tsx`
- `services/mypages/app/routes/works/pages/presenters/WorksPagePresenter.tsx`
- `services/mypages/app/routes/works/components/presenters/ProjectCard.tsx`

**Add**
- `services/mypages/app/shared/components/presenters/TerminalPrompt.tsx`
- `services/mypages/app/shared/components/presenters/Caret.tsx`
- `services/mypages/app/shared/components/presenters/GridBackground.tsx`
- `services/mypages/app/shared/components/presenters/ScanlineOverlay.tsx`
- `services/mypages/app/shared/components/presenters/CornerBracket.tsx`
- `services/mypages/app/shared/components/presenters/TypeWriter.tsx`
- `services/mypages/app/shared/components/presenters/StatusDot.tsx`
- `services/mypages/app/shared/lib/tag-color.ts`

**Delete**
- `services/mypages/app/shared/components/presenters/ThemeToggle.tsx` と `Header.tsx` 内の import/利用

## 8. 段階的実装順序

1. **トークン + フォント** — `app.css` / `root.tsx` / `theme.ts` 整理 → 全画面で即座にダーク化が反映されることを確認
2. **装飾レイヤー** — `_layout.tsx` に `GridBackground` + `ScanlineOverlay` を差し込み
3. **共通 Presenter** — Header / Footer / Tag / SectionHeading / Pagination（`ThemeToggle` 撤去もここで）
4. **新規 util Presenter** — `TerminalPrompt` / `Caret` / `TypeWriter` / `CornerBracket` / `StatusDot`
5. **home** — HeroSection + Latest 系
6. **about** — Profile / Career / Biography / Certifications
7. **blog / talks** — アーカイブ化と `tag-color.ts`
8. **works** — ProjectCard + tech stack chips
9. **仕上げ** — `prefers-reduced-motion` 手動検証、フォーカスリング、コントラスト比、`/feed` が壊れていないか確認

## 9. Out of Scope

- `Downloads/portfolio/` 側のコンテンツ（20 writings / 11 talks / 3 works など）を sugar-cat-pages に取り込むこと。現行の content-fetcher 由来データを正とする。
- ルート追加・削除、`routes.ts` の変更
- `packages/content-fetcher` / `feed/route.tsx` の挙動変更
- SEO メタ文面・OG 画像の刷新（`shared/lib/seo.ts` は触らない）
- モバイルメニューのロジック変更（クラス調整のみ）

## 10. 検証方法

- `pnpm dev` → `/`, `/about`, `/blog`, `/talks`, `/works` を目視確認。`/feed` は XML がそのまま返ることを `curl -s http://localhost:xxxx/feed | head` で確認。
- `pnpm type-check` — Presenter props 不変なのでグリーン維持
- `pnpm biome` / `pnpm textlint`（対象があれば）
- `./scripts/post-edit-check.sh`（CLAUDE.md 規約）
- DevTools の `prefers-reduced-motion` を `reduce` にして blink / scan / pulse / TypeWriter が停止することを確認
- コントラスト: `--palette-fg (#e7ece4)` on `--palette-bg-900 (#0a0d0c)` = 約 13:1（本文 OK）。mint は本文ではなくボーダー・アクセントに限定し、本文は必ず `text-foreground` を使う。
- キーボード操作: Tab で全リンクに mint の 2px フォーカスリングが出ることを確認
- VRT（Storybook + Playwright があれば）: 全 story diff が出る前提で、目視承認後にスナップショット更新

## Critical files to touch first

1. `services/mypages/app/app.css` — すべての基盤
2. `services/mypages/app/routes/_layout.tsx` — 背景装飾の土台
3. `services/mypages/app/shared/components/presenters/Header.tsx` — 全画面に出るブランド
4. `services/mypages/app/routes/home/components/presenters/HeroSection.tsx` — トップの印象を決める要
5. `services/mypages/app/routes/blog/pages/presenters/BlogPagePresenter.tsx` — archive 行レイアウトのリファレンス実装（talks も同形）
