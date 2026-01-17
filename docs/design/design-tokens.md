# デザイントークン

## 概要

デザイントークンは、一貫性のあるUIを効率的に構築するための基盤です。

## トークンアーキテクチャ

**3層トークン構造**を採用:

```
Base Palette → Semantic Tokens → Component Tokens
```

1. **Base Palette**: 生のカラー値（OKLch形式）
2. **Semantic Tokens**: 意図を表現するトークン（`--token-*`）
3. **Component Tokens**: Tailwindで使用する最終トークン（`--color-*`）

---

## Base Palette

```css
/* ニュートラル */
--palette-ink-900: oklch(0.21 0.02 285);  /* ダークテキスト */
--palette-ink-800: oklch(0.28 0.02 285);  /* ソフトテキスト */
--palette-ink-500: oklch(0.50 0.01 285);  /* ミュートテキスト */
--palette-cream-50: oklch(0.97 0.005 90); /* オフホワイト */
--palette-white: oklch(1 0 0);            /* 純白 */

/* アクセントカラー */
--palette-mint-100: oklch(0.82 0.06 195); /* ミントグリーン */
--palette-sky-100: oklch(0.72 0.12 260);  /* ソフトブルー */
--palette-coral-100: oklch(0.90 0.08 50); /* コーラル */
--palette-amber-100: oklch(0.65 0.20 35); /* ビビッドオレンジ */
--palette-beige-100: oklch(0.82 0.015 80);/* ウォームベージュ */

/* ボーダー */
--palette-line: oklch(0.87 0 0 / 0.3);    /* ライトグレー */
```

---

## Semantic Tokens

```css
/* 背景 */
--token-canvas: var(--palette-cream-50);     /* メイン背景 */
--token-surface: var(--palette-white);       /* カード/パネル背景 */
--token-surface-ink: var(--palette-ink-900); /* ダーク背景 */

/* テキスト */
--token-text: var(--palette-ink-900);        /* プライマリテキスト */
--token-text-soft: var(--palette-ink-800);   /* セカンダリテキスト */
--token-text-muted: var(--palette-ink-500);  /* ミュートテキスト */

/* ボーダー */
--token-border: var(--palette-line);

/* アクセント */
--token-accent: var(--palette-coral-100);
```

---

## Component Tokens（Tailwind用）

```css
/* 背景 */
--color-background: var(--token-canvas);
--color-card: var(--token-surface);

/* テキスト */
--color-foreground: var(--token-text);
--color-foreground-soft: var(--token-text-soft);
--color-muted-foreground: var(--token-text-muted);

/* プライマリ */
--color-primary: var(--token-surface-ink);
--color-primary-foreground: oklch(1 0 0);

/* アクセント */
--color-accent: var(--token-accent);

/* ボーダー */
--color-border: var(--token-border);

/* パレットカラー（直接参照用）*/
--color-mint: var(--palette-mint-100);
--color-sky: var(--palette-sky-100);
--color-coral: var(--palette-coral-100);
--color-amber: var(--palette-amber-100);
--color-beige: var(--palette-beige-100);
```

---

## レディアストークン

| トークン | 値 | 用途 |
|----------|-----|------|
| `--radius-sm` | 0.5rem (8px) | 小さな要素、チップ |
| `--radius-md` | 0.875rem (14px) | 標準要素、ボタン |
| `--radius-lg` | 1.25rem (20px) | カード、パネル |
| `--radius-xl` | 1.5rem (24px) | 大きなパネル |
| `--radius-2xl` | 2rem (32px) | モーダル、大きなカード |

---

## シャドウトークン

| トークン | 用途 |
|----------|------|
| `--shadow-card` | カード、軽い浮遊感 |
| `--shadow-action` | ボタン、インタラクティブ要素 |

```css
--shadow-card: 0 20px 40px oklch(0.21 0.02 285 / 0.08);
--shadow-action: 0 12px 24px oklch(0.21 0.02 285 / 0.2);
```

---

## モーショントークン

| トークン | 値 | 用途 |
|----------|-----|------|
| `--duration-fast` | 150ms | ホバー、フォーカス |
| `--duration-md` | 300ms | パネル開閉 |
| `--ease-standard` | cubic-bezier(0.2, 0.7, 0.2, 1) | 標準イージング |

---

## Tailwindでの使用例

```tsx
// 背景色
<div className="bg-background" />
<div className="bg-card" />

// テキスト色
<p className="text-foreground" />
<p className="text-foreground-soft" />

// ボーダー
<div className="border border-border" />

// 角丸
<div className="rounded-lg" />

// シャドウ
<div className="shadow-card" />
```

---

## 参考リンク

- [CSS ガイドライン](../css.md)
- [カラーガイドライン](./colors.md)
- [タイポグラフィガイドライン](./typography.md)
