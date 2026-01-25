import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  route("feed", "routes/feed/route.tsx"),
  layout("routes/_layout.tsx", [
    index("routes/home/route.tsx"),
    route("about", "routes/about/route.tsx"),
    route("blog", "routes/blog/route.tsx"),
    route("talks", "routes/talks/route.tsx"),
    route("works", "routes/works/route.tsx"),
  ]),
] satisfies RouteConfig;
