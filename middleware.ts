import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectRoutes = ["/posts/create"];
const authRoutes = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  if (token && authRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && protectRoutes.includes(request.nextUrl.pathname)) {
    const from = request.nextUrl.pathname.substring(1);

    return NextResponse.redirect(new URL(`/login?from=${from}`, request.url));
  }

  if (/^\/api/.test(request.nextUrl.pathname)) {
    const newResponse = NextResponse.next();

    newResponse.headers.set("Authorization", `Bearer ${token}`);

    return newResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
