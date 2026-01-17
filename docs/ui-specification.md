# UI Specification - ポートフォリオサイト

## 概要

React Router v7を使用したポートフォリオ/ブログサイトのUI仕様書。
既存のデザイントークン（`docs/design/design-tokens.md`）を活用し、一貫性のあるUIを構築する。

---

## ページ構成

| パス | ページ名 | 概要 |
|------|----------|------|
| `/` | Home | ファーストビュー、簡単な自己紹介、各セクションへの導線 |
| `/about` | About | 経歴、スキル、プロフィール |
| `/blog` | Blog | Zenn/はてなブログ記事一覧 |
| `/talks` | Talks | SpeakerDeck資料、勉強会登壇情報 |
| `/works` | Works | 制作物ポートフォリオ |

---

## 共通レイアウト

### 構造

```
┌─────────────────────────────────────────┐
│  Header                                 │
│  ┌───────────────────────────────────┐  │
│  │ Logo          Nav Links           │  │
│  └───────────────────────────────────┘  │
├─────────────────────────────────────────┤
│                                         │
│  Main Content (Outlet)                  │
│                                         │
├─────────────────────────────────────────┤
│  Footer                                 │
│  ┌───────────────────────────────────┐  │
│  │ Copyright    Social Links         │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### レスポンシブ対応

| ブレークポイント | 対応 |
|-----------------|------|
| Mobile | `< 640px` - ハンバーガーメニュー |
| Tablet | `640px - 1024px` - 簡略化ナビ |
| Desktop | `> 1024px` - フルナビゲーション |

---

## 共通コンポーネント

### Header

```
┌────────────────────────────────────────────────────┐
│ [Logo]                    Home About Blog Talks Works │
└────────────────────────────────────────────────────┘
```

**仕様:**
- 背景: `bg-background` (オフホワイト)
- ボーダー: なし（シンプルに）
- 高さ: `h-16` (64px)
- ロゴ: サイト名またはアバター
- ナビリンク: `text-foreground-soft` → hover: `text-foreground`
- 現在ページ: `text-foreground` + アンダーライン（`border-b-2 border-accent`）

### Footer

```
┌────────────────────────────────────────────────────┐
│ © 2025 Sugar Cat                [GitHub] [X] [Zenn] │
└────────────────────────────────────────────────────┘
```

**仕様:**
- 背景: `bg-background`
- テキスト: `text-muted-foreground`
- パディング: `py-8`
- SNSアイコン: 24x24, hover時にアクセントカラー

### Card

記事、制作物、登壇情報などの共通カードコンポーネント。

```
┌─────────────────────────────┐
│ [Thumbnail / Icon]          │
├─────────────────────────────┤
│ Title                       │
│ Description (optional)      │
│ Meta (date, tags)           │
└─────────────────────────────┘
```

**仕様:**
- 背景: `bg-card` (白)
- 角丸: `rounded-lg` (20px)
- シャドウ: `shadow-card`
- hover: `shadow-action` + 微小な上移動 (`translate-y-[-2px]`)
- パディング: `p-4` または `p-6`
- トランジション: `duration-fast`

**バリエーション:**
| バリアント | 用途 |
|-----------|------|
| `default` | 標準カード |
| `compact` | リスト表示用（サムネイル小） |
| `featured` | 大きめ表示（ホームのピックアップ用） |

### Button

**仕様:**
- プライマリ: `bg-primary text-primary-foreground`
- セカンダリ: `bg-secondary text-secondary-foreground`
- ゴースト: `bg-transparent text-foreground` + hover: `bg-muted`
- 角丸: `rounded-md` (14px)
- パディング: `px-4 py-2`
- フォーカス: `ring-2 ring-ring`

### Link

**仕様:**
- 内部リンク: React Router の `<Link>`
- 外部リンク: `target="_blank" rel="noopener noreferrer"` + 外部アイコン
- スタイル: `text-foreground` + hover: `text-accent` + underline

### Tag / Badge

記事のタグ、ソース表示（Zenn/はてな）などに使用。

**仕様:**
- 背景: `bg-muted`
- テキスト: `text-foreground-soft text-xs`
- 角丸: `rounded-sm` (8px)
- パディング: `px-2 py-0.5`

**ソース別カラー:**
| ソース | カラー |
|--------|--------|
| Zenn | `bg-sky/20 text-sky` |
| はてなブログ | `bg-coral/20 text-coral` |
| SpeakerDeck | `bg-mint/20 text-mint` |

---

## ページ別仕様

### Home (`/`)

**構成:**
```
┌─────────────────────────────────────────┐
│ Hero Section                            │
│ ┌─────────────────────────────────────┐ │
│ │ Avatar                              │ │
│ │ Name / Tagline                      │ │
│ │ Short Bio                           │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ Latest Posts (2-3件)                    │
│ [Card] [Card] [Card]                    │
│                        → View All Blog  │
├─────────────────────────────────────────┤
│ Featured Works (2-3件)                  │
│ [Card] [Card]                           │
│                        → View All Works │
└─────────────────────────────────────────┘
```

**Hero Section:**
- アバター: `w-24 h-24 rounded-full`
- 名前: `font-display text-2xl` (Shippori Mincho)
- タグライン: `text-foreground-soft text-base`
- 中央揃え

**セクション:**
- 見出し: `font-display text-xl`
- カードグリッド: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

### About (`/about`)

**構成:**
```
┌─────────────────────────────────────────┐
│ Profile                                 │
│ ┌─────────────────────────────────────┐ │
│ │ [Avatar]  Name                      │ │
│ │           Title / Role              │ │
│ │           Location                  │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ Bio / Introduction                      │
│ (自己紹介文)                            │
├─────────────────────────────────────────┤
│ Skills                                  │
│ [Tag] [Tag] [Tag] ...                   │
├─────────────────────────────────────────┤
│ Career / Timeline (optional)            │
│ 2020 - Company A                        │
│ 2022 - Company B                        │
└─────────────────────────────────────────┘
```

**プロフィールカード:**
- アバター: `w-32 h-32 rounded-full`
- 横並び（desktop）、縦並び（mobile）

**スキルセクション:**
- タグ形式で表示
- カテゴリ分け（Frontend, Backend, Tools等）

### Blog (`/blog`)

**構成:**
```
┌─────────────────────────────────────────┐
│ Page Title: Blog                        │
├─────────────────────────────────────────┤
│ Filter (optional): [All] [Zenn] [はてな] │
├─────────────────────────────────────────┤
│ Article List                            │
│ ┌─────────────────────────────────────┐ │
│ │ [Zenn] Title                  Date  │ │
│ │        Description (excerpt)        │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ [はてな] Title                Date  │ │
│ │          Description (excerpt)      │ │
│ └─────────────────────────────────────┘ │
│ ...                                     │
└─────────────────────────────────────────┘
```

**記事カード:**
- ソースバッジ表示（Zenn/はてな）
- タイトル: `font-display text-lg`
- 日付: `text-muted-foreground text-sm`
- 外部リンク（新規タブで開く）

**データソース:**
- `app/routes/blog/data/posts.json`（ビルド時にRSSから生成）

### Talks (`/talks`)

**構成:**
```
┌─────────────────────────────────────────┐
│ Page Title: Talks                       │
├─────────────────────────────────────────┤
│ Talk List                               │
│ ┌─────────────────────────────────────┐ │
│ │ [SpeakerDeck Embed or Thumbnail]    │ │
│ │ Title                               │ │
│ │ Event Name                    Date  │ │
│ └─────────────────────────────────────┘ │
│ ...                                     │
└─────────────────────────────────────────┘
```

**トークカード:**
- SpeakerDeck埋め込み or サムネイル
- イベント名: `text-foreground-soft`
- 日付: `text-muted-foreground`

**データ:**
- 静的JSON or ハードコード

### Works (`/works`)

**構成:**
```
┌─────────────────────────────────────────┐
│ Page Title: Works                       │
├─────────────────────────────────────────┤
│ Project Grid                            │
│ ┌───────────┐ ┌───────────┐             │
│ │ [Image]   │ │ [Image]   │             │
│ │ Title     │ │ Title     │             │
│ │ Desc      │ │ Desc      │             │
│ │ [Tags]    │ │ [Tags]    │             │
│ └───────────┘ └───────────┘             │
│ ...                                     │
└─────────────────────────────────────────┘
```

**プロジェクトカード:**
- サムネイル: アスペクト比 16:9
- タイトル: `font-display text-lg`
- 説明: 2-3行に制限（`line-clamp-2`）
- 技術タグ: Tag コンポーネント使用
- リンク: GitHub / Demo / 記事

**データ:**
- 静的JSON or ハードコード

---

## タイポグラフィ適用

| 要素 | フォント | サイズ |
|------|----------|--------|
| ページタイトル (h1) | Shippori Mincho B1 | `text-2xl` (desktop), `text-xl` (mobile) |
| セクション見出し (h2) | Shippori Mincho B1 | `text-xl` |
| カードタイトル (h3) | Shippori Mincho B1 | `text-lg` |
| 本文 | M PLUS Rounded 1c | `text-base` |
| 補足テキスト | M PLUS Rounded 1c | `text-sm` |
| メタ情報 | M PLUS Rounded 1c | `text-xs` |

---

## カラー使用ガイド

| 用途 | トークン |
|------|----------|
| ページ背景 | `bg-background` |
| カード背景 | `bg-card` |
| 主要テキスト | `text-foreground` |
| 補助テキスト | `text-foreground-soft` |
| メタ情報 | `text-muted-foreground` |
| アクセント（hover等） | `text-accent` / `bg-accent` |
| ボーダー | `border-border` |

---

## アニメーション

| 対象 | アニメーション |
|------|---------------|
| カードhover | `translate-y-[-2px]` + `shadow-action` (150ms) |
| リンクhover | underline + color change (150ms) |
| ページ遷移 | なし（シンプルに） |
| ボタンhover | `opacity-90` or background変化 (150ms) |

---

## アクセシビリティ

- すべてのインタラクティブ要素にフォーカスリング
- 外部リンクには `aria-label` または視覚的インジケーター
- 画像には適切な `alt` テキスト
- カラーコントラスト比: WCAG AA準拠
- キーボードナビゲーション対応

---

## 関連ドキュメント

- [Frontend Architecture](./frontend-architecture.md) - ディレクトリ構成、Container/Presenterパターン
- [Design Tokens](./design/design-tokens.md) - カラー、タイポグラフィ、スペーシング
