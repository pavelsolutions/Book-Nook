import { NextRequest, NextResponse } from "next/server";
// import { getSessionCookie } from "better-auth/cookies";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request: NextRequest) {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  const user = session?.user

  if(!user){
    return NextResponse.redirect(new URL("/sign-in", request.url)) 
  }

return NextResponse.next();
}

export const config = {
  // matcher: ["/profile/:path*"],
  matcher: ['/add-book', '/dashboard', '/dashboard/:path',  '/books/:path']
};