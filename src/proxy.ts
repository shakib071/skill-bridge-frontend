import { NextRequest, NextResponse } from "next/server";


export async function proxy(request: NextRequest) {

  const pathname = request.nextUrl.pathname;


  // Skip middleware for verify-email route

  if (pathname.startsWith("/verify-email")) {

    return NextResponse.next();

  }


  // Check for session token in cookies

  const sessionToken = request.cookies.get("better-auth.session_token");
  console.log(sessionToken);


  //* User is not authenticated at all

  if (!sessionToken) {

    return NextResponse.redirect(new URL("/login", request.url));

  }

  return NextResponse.next();

}


export const config = {

  matcher: [
    "/admin/:path*",
    "/create-tutor-profile/:path*",
    "/profile/:path*",
    "/logout/:path*",
    "/students/:path*",
    "/tutors/create-availability/:path*",
    "/tutors/dashboard/:path*",
    
  ],

};

