export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;

  role: "STUDENT" | "TUTOR";
  status: "ACTIVE" | "BANNED" | "SUSPENDED ";

  image?: string | null;
  profile_image?: string | null;
  phone?: string | null;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}
