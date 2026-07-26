import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const cookieStore = await cookies();
  const savedState = cookieStore.get("oauth-state")?.value;

  if (!code || !state || !savedState || state !== savedState) {
    return NextResponse.json({ error: "Invalid OAuth State" });
  }

  const clientId = process.env.ANILIST_CLIENT_ID;
  const clientSecret = process.env.ANILIST_CLIENT_SECRET;
  const redirectUri = process.env.ANILIST_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json({ error: "Missing env" }, { status: 500 });
  }

  try {
    const res = await fetch("https://anilist.co/api/v2/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code,
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Token exchange failed" },
        { status: res.status },
      );
    }
    const data = await res.json();
    const accessToken = data.access_token;

    cookieStore.delete("oauth-state");
    cookieStore.set("oauth-token", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 3600 * 24 * 30, // 3600 sec x 24 hour x 30 days
    });

    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (err) {
    return NextResponse.json(
      { error: "Request failed", detail: err },
      { status: 500 },
    );
  }
}
