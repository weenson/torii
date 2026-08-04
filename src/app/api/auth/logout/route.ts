import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete("oauth-token");

  const referer = request.headers.get("referer");
  const fallback = new URL("/dashboard", request.url);

  if (referer) {
    const url = new URL(referer);
    return NextResponse.redirect(url);
  }

  return NextResponse.redirect(fallback);
}
