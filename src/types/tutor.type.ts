export interface Tutor {
  id: string;
  name: string;
  category: string;
  rating: number;
  hourlyRate: number;
  image?: string;
  bio?: string;
  subjects?: string[];
  languages?: string[];
  experienceYears?: number;
  totalSessionsCompleted?: number;
  isFeatured?: boolean;
}
