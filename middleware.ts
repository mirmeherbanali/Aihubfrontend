import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken");
  const isAuthRoute = req.nextUrl.pathname.startsWith("/auth");
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard");

  if (!token && isProtectedRoute) return NextResponse.redirect(new URL("/auth/login", req.url));
  if (token && isAuthRoute) return NextResponse.redirect(new URL("/dashboard", req.url));

  return NextResponse.next();
}
