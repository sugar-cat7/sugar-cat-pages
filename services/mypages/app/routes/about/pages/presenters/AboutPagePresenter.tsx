import { BiographySection } from "../../components/presenters/BiographySection";
import { CareerSection } from "../../components/presenters/CareerSection";
import { CertificationsSection } from "../../components/presenters/CertificationsSection";
import { ProfileSection } from "../../components/presenters/ProfileSection";
import type { Profile } from "../../data/profile";

type AboutPagePresenterProps = {
  profile: Profile;
};

export function AboutPagePresenter({ profile }: AboutPagePresenterProps) {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-16 md:py-24">
        {/* Page Header */}
        <div className="mb-16">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            About
          </h1>
        </div>

        <div className="space-y-24">
          <ProfileSection profile={profile} />
          <BiographySection biography={profile.biography} />
          <CareerSection career={profile.career} />
          <CertificationsSection certificationGroups={profile.certificationGroups} />
        </div>
      </div>
    </div>
  );
}
