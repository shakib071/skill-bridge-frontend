export interface Tutor {
  id: string;
  name: string;
  category: string;
  categoryId?:string;
  hourlyRate: number;
  education?:string;
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

