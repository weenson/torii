import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { TOGGLE_FOLLOW } from "@/lib/anilist/queries";
import { ToggleFollowType } from "@/types/anime";
import { fetchAniList } from "@/lib/anilist/client";

export async function POST(request: Request) {
  const { userId } = await request.json();

  const cookieStore = await cookies();
  const token = cookieStore.get("oauth-token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not Logged In" }, { status: 401 });
  }

  const data = await fetchAniList<ToggleFollowType>(
    TOGGLE_FOLLOW,
    { userId },
    undefined,
    token,
    true,
  );

  return Response.json(data.ToggleFollow);
}
