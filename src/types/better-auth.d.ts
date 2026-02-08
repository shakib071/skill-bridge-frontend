import { User as BetterAuthUser, Session as BetterAuthSession } from "better-auth";


type Role = "STUDENT" | "TUTOR" | "ADMIN";
type UserStatus = "ACTIVE" | "BANNED" | "SUSPENDED";

declare module "better-auth" {
  interface User extends BetterAuthUser {
    role: Role;
    profile_image: string | null;
    isActive: boolean | null;
    phone: string | null;
    status: UserStatus;
  }

  interface Session extends BetterAuthSession {
    user: User;
  }
}

declare module "better-auth/react" {
  interface User extends BetterAuthUser {
    role: Role;
    profile_image: string | null;
    isActive: boolean | null;
    phone: string | null;
    status: UserStatus;
  }

  interface Session extends BetterAuthSession {
    user: User;
  }
}