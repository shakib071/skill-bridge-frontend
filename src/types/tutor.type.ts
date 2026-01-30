export interface Tutor {
  id: string;
  name: string;
  category: string;
  hourlyRate: number;
  image?: string;
  bio?: string;
  averageRating?:number;
  subjects?: string[];
  languages?: string[];
  experienceYears?: number;
  totalSessionsCompleted?: number;
  isFeatured?: boolean;
  totalReviews?:number;
  
}

