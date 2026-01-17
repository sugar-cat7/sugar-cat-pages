# Frontend Architecture

## Overview

React Router v7 (Framework Mode) を使用したフロントエンドアーキテクチャ。ルートベースの機能コロケーションと Container/Presentational パターンを組み合わせる。

## Directory Structure

```
services/mypages/
├── app/
│   ├── root.tsx                 # HTML shell, meta, fonts
│   ├── routes.ts                # Route configuration
│   ├── app.css                  # Global styles (Tailwind)
│   │
│   ├── routes/
│   │   ├── _layout.tsx          # Root layout (Header, Footer)
│   │   ├── home/
│   │   │   ├── route.tsx        # Entry point
│   │   │   ├── pages/
│   │   │   │   ├── containers/
│   │   │   │   │   └── HomePage.tsx
│   │   │   │   └── presenters/
│   │   │   │       └── HomePagePresenter.tsx
│   │   │   └── components/
│   │   │       └── presenters/
│   │   │
│   │   ├── about/
│   │   ├── blog/
│   │   ├── talks/
│   │   └── works/
│   │
│   └── shared/
│       ├── components/
│       │   └── presenters/      # Card, Button, Tag, etc.
│       └── lib/
│           └── utils.ts         # cn() utility
```

---

## Route Configuration

`routes.ts` でプログラマティックにルートを定義:

```typescript
import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/_layout.tsx", [
    index("routes/home/route.tsx"),
    route("about", "routes/about/route.tsx"),
    route("blog", "routes/blog/route.tsx"),
    route("talks", "routes/talks/route.tsx"),
    route("works", "routes/works/route.tsx"),
  ]),
] satisfies RouteConfig;
```

---

## Route Module Structure

```typescript
// routes/home/route.tsx
import type { Route } from "./+types/route";
import { HomePage } from "./pages/containers/HomePage";

export const meta: Route.MetaFunction = () => [
  { title: "Home | Sugar Cat" },
  { name: "description", content: "Sugar Cat's portfolio" },
];

export default function HomeRoute() {
  return <HomePage />;
}
```

---

## Container/Presentational Pattern

### Container Components

Responsible for "what to do":
- Data loading and transformation
- Event handling

```tsx
// pages/containers/HomePage.tsx
import { HomePagePresenter } from "../presenters/HomePagePresenter";

export const HomePage = () => {
  const posts = validatePosts(postsJson);
  const talks = validateTalks(talksJson);

  return <HomePagePresenter posts={posts} talks={talks} />;
};
```

### Presentational Components

Responsible for "how to look":
- UI rendering
- Styling

```tsx
// pages/presenters/HomePagePresenter.tsx
type Props = {
  posts: BlogPost[];
  talks: Talk[];
};

export const HomePagePresenter = ({ posts, talks }: Props) => {
  return (
    <main className="container mx-auto">
      <HeroSection />
      <LatestPostsSection posts={posts} />
      <LatestTalksSection talks={talks} />
    </main>
  );
};
```

### Key Differences

| Container | Presenter |
|-----------|-----------|
| Data loading | Props only |
| Business logic | Pure rendering |
| Minimal JSX | Rich JSX & styling |

---

## Shared Components

```
shared/components/presenters/
├── Header.tsx
├── Footer.tsx
├── Card.tsx
├── Button.tsx
└── Tag.tsx
```

Usage:
```tsx
import { Card } from "~/shared/components/presenters/Card";
```

---

## Dependency Direction

```
     shared/
        ↓
   app/routes/
```

- **shared/** can be imported by any route
- **routes** should NOT import from other routes
- Container → Presenter (one-way)

---

## Path Aliases

```typescript
// tsconfig.json
{
  "paths": {
    "~/*": ["./app/*"]
  }
}

// Usage
import { Card } from "~/shared/components/presenters/Card";
```
