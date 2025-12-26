import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const auth = req.cookies.get("auth_user");

  const protectedRoutes = [
    "/dashboard",
    "/courses",
  ];

  if (
    protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path)) &&
    !auth
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/courses/:path*"],
};
