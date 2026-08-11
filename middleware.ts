import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const roleForPath = (pathname: string) => {
  if (pathname.startsWith("/admin")) return "ADMIN";
  if (pathname.startsWith("/professional")) return "PROFESSIONAL";
  if (pathname.startsWith("/dashboard")) return "CLIENT";
  return null;
};

export default auth((req) => {
  const requiredRole = roleForPath(req.nextUrl.pathname);
  if (!requiredRole) return;

  if (!req.auth) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (req.auth.user.role !== requiredRole) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/professional/:path*", "/admin/:path*"],
};
