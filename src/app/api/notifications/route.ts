import { NextResponse } from "next/server";
import getIsLoggedIn from "@/lib/anilist/auth";
import { fetchAniList } from "@/lib/anilist/client";
import { NOTIFICATIONS } from "@/lib/anilist/queries";
import { NotificationsType } from "@/types/anime";

export async function GET() {
  const isLoggedIn = await getIsLoggedIn();

  if (!isLoggedIn.IsLoggedIn) {
    return NextResponse.json({ error: "Not Logged in" }, { status: 401 });
  }

  const data = await fetchAniList<NotificationsType>(
    NOTIFICATIONS,
    {
      page: 1,
      perPage: 10,
    },
    undefined,
    isLoggedIn.token,
    true,
  );

  return NextResponse.json((data.Page.notifications ?? []).filter(Boolean));
}
