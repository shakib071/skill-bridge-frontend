"use client";
import { authClient } from "@/lib/auth-client";

import { createContext, useContext } from "react";


// type  SessionContextType = {
//     session:Session
// }

export type User = {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    emailVerified?: boolean;
  
};

export type Session = {
  user: User;
};

export type SessionContextType = {
  session: Session | null;
  isPending: boolean;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);;

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  return (
    <SessionContext.Provider value={{ session, isPending }}>
      {children}
    </SessionContext.Provider>
  );
}


export function useSessionContext() {
  const context = useContext(SessionContext);
  return context;
}