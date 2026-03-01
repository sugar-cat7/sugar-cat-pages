import { validatePosts, validateTalks } from "~/shared/lib/validate-json";
import postsJson from "../../../blog/data/posts.json";
import talksJson from "../../../talks/data/talks.json";
import { HomePagePresenter } from "../presenters/HomePagePresenter";

const posts = validatePosts(postsJson);
const talks = validateTalks(talksJson);

// Display latest 3 posts and 3 talks on home page
const latestPosts = posts.slice(0, 3);
const latestTalks = talks.slice(0, 3);

export function HomePage() {
  return <HomePagePresenter posts={latestPosts} talks={latestTalks} />;
}
