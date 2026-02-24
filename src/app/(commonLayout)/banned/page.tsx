"use client";

import { TutorCardSkeleton } from "@/components/modules/Tutor/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { useSessionContext } from "@/providers/SessionProvider";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const context = useSessionContext();
  const user = context?.session?.user;
  if(context?.isPending){
    return <TutorCardSkeleton />;
  }
  if (user && "status" in user && user?.status === "ACTIVE") {
    return router.push("/");
  }
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 font-mono">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#ff3b3b 1px, transparent 1px), linear-gradient(90deg, #ff3b3b 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-red-900/20 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Top bar */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-[1px] flex-1 bg-red-900/50" />
          <span className="text-red-600 text-xs tracking-[0.3em] uppercase">
            Access Terminated
          </span>
          <div className="h-[1px] flex-1 bg-red-900/50" />
        </div>

        {/* Main card */}
        <div className="border border-red-900/40 bg-[#0f0f0f] p-8 relative overflow-hidden">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-600" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-600" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-600" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-600" />

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-red-600/60 flex items-center justify-center bg-red-950/30">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
              </div>
              {/* Ping animation */}
              <div className="absolute inset-0 rounded-full border border-red-600/30 animate-ping" />
            </div>
          </div>

          {/* Error code */}
          <div className="text-center mb-2">
            <span className="text-red-600/60 text-xs tracking-[0.4em] uppercase">
              Error 403
            </span>
          </div>

          {/* Title */}
          <h1 className="text-white text-2xl font-bold text-center tracking-tight mb-3">
            Account Banned or Suspended
          </h1>

          {/* Description */}
          <p className="text-zinc-500 text-sm text-center leading-relaxed mb-8">
            Your account has been banned or suspended due to a violation of our
            terms of service. If you believe this is a mistake, please contact
            support.
          </p>

          {/* Divider */}
          <div className="h-[1px] bg-zinc-800 mb-8" />

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => router.push("/")}
              className="w-full bg-white hover:bg-zinc-200 text-black font-semibold tracking-wide transition-all duration-200 rounded-none h-11"
            >
              Go Home
            </Button>
            <Button
              onClick={() => router.push("/register")}
              variant="outline"
              className="w-full border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-white bg-transparent hover:bg-zinc-900 font-semibold tracking-wide transition-all duration-200 rounded-none h-11"
            >
              Create New Account
            </Button>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 text-center">
          <span className="text-zinc-700 text-xs tracking-widest uppercase">
            Need help?{" "}
            <a
              href="mailto:shakibhasan071@gmail.com"
              className="text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-4"
            >
              Contact Support
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}