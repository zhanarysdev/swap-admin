import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current path is the root path
  if (pathname === "/") {
    // Redirect to your desired path
    return NextResponse.redirect(new URL("/ads", request.url));
  }

  // Define protected routes (main app routes)
  const protectedRoutes = ["/ads", "/busines", "/categories", "/directories", "/moderation", "/notifications", "/payments"];

  // Define public routes (auth routes)
  const publicRoutes = ["/login", "/signup", "/login/forgot-password"];

  // Check if current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // Check if current path is a public route
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Get token from cookies (since middleware runs on server)
  const token = request.cookies.get('token')?.value;

  // If accessing a protected route without token, redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If accessing a public route with token, redirect to ads
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/ads", request.url));
  }

  // Return NextResponse.next() for all other paths
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    "/",
    "/ads/:path*",
    "/busines/:path*",
    "/categories/:path*",
    "/directories/:path*",
    "/moderation/:path*",
    "/notifications/:path*",
    "/payments/:path*",
    "/login/:path*",
    "/signup/:path*"
  ],
};
