# タイポグラフィガイドライン

## 概要

本プロジェクトでは、柔らかく親しみやすい印象を与えるフォントを採用しています。

## フォント

### 本文フォント: M PLUS Rounded 1c

丸ゴシック体で、柔らかく親しみやすい印象を与えます。

```css
--font-body: "M PLUS Rounded 1c", "Hiragino Maru Gothic ProN", "Yu Gothic",
  "Noto Sans JP", sans-serif;
```

### 見出しフォント: Shippori Mincho B1

明朝体で、見出しに高級感と落ち着きを与えます。

```css
--font-display: "Shippori Mincho B1", "Hiragino Mincho ProN", "Yu Mincho",
  serif;
```

## Google Fonts 読み込み

```css
@import url("https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700&family=Shippori+Mincho+B1:wght@600;700&display=swap");
```

## ウェイト

| フォント | 400 | 500 | 600 | 700 |
|----------|-----|-----|-----|-----|
| M PLUS Rounded 1c | ✓ | ✓ | - | ✓ |
| Shippori Mincho B1 | - | - | ✓ | ✓ |

## 適用ルール

- `h1` ~ `h4`: `--font-display` (Shippori Mincho B1)
- その他: `--font-body` (M PLUS Rounded 1c)

```css
h1, h2, h3, h4 {
  font-family: var(--font-display);
}
```

## テキストサイズユーティリティ

| クラス | サイズ | 用途 |
|--------|--------|------|
| `text-3xs` | 0.65rem (10.4px) | 極小テキスト |
| `text-2xs` | 0.7rem (11.2px) | 小さなラベル |
| `text-xs` | 0.75rem (12px) | キャプション |
| `text-sm` | 0.875rem (14px) | 小さな本文 |
| `text-base` | 1rem (16px) | 標準本文 |

## 禁止事項

- 10px未満のフォントサイズを使用すること（可読性の確保）
- 行間を1.4未満に設定すること（日本語テキストの可読性）

## 参考リンク

- [M PLUS Rounded 1c - Google Fonts](https://fonts.google.com/specimen/M+PLUS+Rounded+1c)
- [Shippori Mincho B1 - Google Fonts](https://fonts.google.com/specimen/Shippori+Mincho+B1)
- [CSS ガイドライン](../css.md)
