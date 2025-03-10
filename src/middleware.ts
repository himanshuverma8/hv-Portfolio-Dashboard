import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow the "/links" page and static files (e.g., CSS, JS, API, and public assets)
  if (path.startsWith("/links") || path.startsWith("/_next") || path.startsWith("/api") || path.startsWith("/public")) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/links", request.nextUrl));
}

// Apply middleware to all pages except the allowed ones
export const config = {
  matcher: "/((?!_next|api|public|links).*)",
};
