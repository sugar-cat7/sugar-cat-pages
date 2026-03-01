import type { BlogPost, Talk } from "@my-pages/content-fetcher";
import { HeroSection } from "../../components/presenters/HeroSection";
import { LatestPostsSection } from "../../components/presenters/LatestPostsSection";
import { LatestTalksSection } from "../../components/presenters/LatestTalksSection";

type HomePagePresenterProps = {
  posts: BlogPost[];
  talks: Talk[];
};

export function HomePagePresenter({ posts, talks }: HomePagePresenterProps) {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <div className="container mx-auto px-6 py-16 space-y-24">
        <LatestPostsSection posts={posts} />
        <LatestTalksSection talks={talks} />
      </div>
    </div>
  );
}
