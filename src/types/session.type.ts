export interface User  {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    emailVerified?: boolean;
  
};

export interface Session {
  user: User;
};

export interface SessionContextType {
  session: Session | null;
  isPending: boolean;
};