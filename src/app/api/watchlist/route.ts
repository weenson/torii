import { NextResponse } from "next/server";
import getIsLoggedIn from "@/lib/anilist/auth";
import {
  SAVE_MEDIA_LIST_ENTRY,
  DELETE_MEDIA_LIST_ENTRY,
} from "@/lib/anilist/queries";
import {
  SaveMediaListEntryType,
  DeleteMediaListEntryType,
} from "@/types/anime";
import { fetchAniList } from "@/lib/anilist/client";

export async function POST(request: Request) {
  const {
    mediaId,
    status,
    progress,
    score,
    notes,
    startedAt,
    completedAt,
    repeat,
  } = await request.json();

  const { IsLoggedIn, token } = await getIsLoggedIn();
  if (!IsLoggedIn) {
    return NextResponse.json({ error: "Not Logged In" }, { status: 401 });
  }

  const data = await fetchAniList<SaveMediaListEntryType>(
    SAVE_MEDIA_LIST_ENTRY,
    { mediaId, status, progress, score, notes, startedAt, completedAt, repeat },
    undefined,
    token,
    true,
  );

  return Response.json(data.SaveMediaListEntry);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  const { IsLoggedIn, token } = await getIsLoggedIn();
  if (!IsLoggedIn) {
    return NextResponse.json({ error: "Not Logged In" }, { status: 401 });
  }

  const data = await fetchAniList<DeleteMediaListEntryType>(
    DELETE_MEDIA_LIST_ENTRY,
    { id },
    undefined,
    token,
    true,
  );

  return Response.json(data.DeleteMediaListEntry);
}
