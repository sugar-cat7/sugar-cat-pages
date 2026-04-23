import { PageHeader } from "~/shared/components/presenters/PageHeader";
import { BiographySection } from "../../components/presenters/BiographySection";
import { CareerSection } from "../../components/presenters/CareerSection";
import { ProfileSection } from "../../components/presenters/ProfileSection";
import type { Profile } from "../../data/profile";

type AboutPagePresenterProps = {
  profile: Profile;
};

export function AboutPagePresenter({ profile }: AboutPagePresenterProps) {
  return (
    <div>
      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 md:py-24">
        <PageHeader
          title="about"
          command="whoami && cat ./bio.md"
          meta={
            <>
              <span>{profile.name}</span>
              <span className="opacity-50">·</span>
              <span>{profile.title}</span>
              <span className="opacity-50">·</span>
              <span>{profile.location}</span>
            </>
          }
        />

        <div className="space-y-14">
          <ProfileSection profile={profile} />
          <div className="grid gap-4 md:grid-cols-2">
            <CareerSection career={profile.career} />
            <BiographySection biography={profile.biography} />
          </div>
        </div>
      </div>
    </div>
  );
}
