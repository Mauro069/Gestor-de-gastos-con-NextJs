import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { routes } from "./routes";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  try {
    const jwt = request.cookies.get("gdi_cookie");

    if (jwt === undefined) {
      return NextResponse.redirect(new URL(routes.login, request.url));
    }

    await jwtVerify(
      jwt.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL(routes.login, request.url));
  }
}

export const config = {
  matcher: ["/home", "/day/:day*"],
};
