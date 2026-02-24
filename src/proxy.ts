import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./services/action.service";


export async function proxy(request: NextRequest) {

  const pathname = request.nextUrl.pathname;


   // Skip middleware for verify-email route

  if (pathname.startsWith("/verify-email")) {

    return NextResponse.next();

  }

  let isAuthenticated = false;
  let isAdmin = false;
  let isStudent = false;
  let isTutor = false;
  let isActive = false;

  const { data } = await getSession();

  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === "ADMIN";
    isStudent = data.user.role === "STUDENT";
    isTutor = data.user.role === "TUTOR";
    // isActive = data.user.status === "ACTIVE";

  }





  //* User in not authenticated at all
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // check for banned status

  // if (!isActive) {
  //     if (pathname.startsWith("/banned")) {
  //         return NextResponse.next(); 
  //     }
      
  //     const response = NextResponse.redirect(new URL("/banned", request.url));
  //     response.cookies.delete("better-auth.session_token");
  //     response.cookies.delete("better-auth.session_data");
  //     response.cookies.delete("__Secure-better-auth.session_token");
  //     response.cookies.delete("__Secure-better-auth.session_data");
  //     return response;
  // }


  //redirect logics



  if(isAdmin && pathname.startsWith("/dashboard")){
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if(isStudent && pathname.startsWith("/dashboard")){
    return NextResponse.redirect(new URL("/students/dashboard", request.url));
  }

  if(isTutor && pathname.startsWith("/dashboard")){
    return NextResponse.redirect(new URL("/tutors/dashboard", request.url));
  }

  if(isTutor && ((pathname.startsWith("/admin")) || (pathname.startsWith("/students")))){
    return NextResponse.redirect(new URL("/", request.url));
  }

  if(isStudent && ((pathname.startsWith("/admin")) || (pathname.startsWith("/tutors/create-availability")) || (pathname.startsWith("/tutors/dashboard")) || (pathname.startsWith("/create-tutor-profile")))){
    return NextResponse.redirect(new URL("/", request.url));
  }

  if(isAdmin && ((pathname.startsWith("/students")) || (pathname.startsWith("/tutors/create-availability")) || (pathname.startsWith("/tutors/dashboard")) || (pathname.startsWith("/create-tutor-profile")))){
    return NextResponse.redirect(new URL("/", request.url));
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
    "/dashboard/:path*",
    // "/banned/:path*",
    
  ],

};

