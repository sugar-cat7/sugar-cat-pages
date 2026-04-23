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
    <div>
      <HeroSection />

      <div className="container mx-auto px-4 pb-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:grid-rows-[auto_auto_1fr] lg:gap-x-6 lg:gap-y-3">
          <LatestPostsSection posts={posts} />
          <LatestTalksSection talks={talks} />
        </div>
      </div>
    </div>
  );
}
