import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const isAuthRoute = req.nextUrl.pathname.startsWith("/auth");
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard");

  // Redirect to login if accessing protected route without token
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Redirect to dashboard if logged in user accesses auth pages
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}
