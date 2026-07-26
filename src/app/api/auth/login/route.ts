import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const clientId = process.env.ANILIST_CLIENT_ID;
  const redirectUri = process.env.ANILIST_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json({ error: "Env missing" }, { status: 500 });
  }

  const state = crypto.randomUUID();

  const cookieStore = await cookies();
  cookieStore.set("oauth-state", state, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });

  const url = new URL("https://anilist.co/api/v2/oauth/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("state", state);

  return NextResponse.redirect(url);
}
