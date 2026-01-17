type ActivityItem = {
  title: string;
  url?: string;
};

export type BiographyYear = {
  year: string;
  activities: ActivityItem[];
};

export type Certification = {
  name: string;
  note?: string;
};

export type CertificationGroup = {
  category: string;
  icon?: "national" | "gcp";
  certifications: Certification[];
};

export type CareerItem = {
  company: string;
  period: string;
  role: string;
};
