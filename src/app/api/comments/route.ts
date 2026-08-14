import { NextResponse } from "next/server";
import { prisma } from "@/lib/anilist/db";
import getIsLoggedIn from "@/lib/anilist/auth";
import { fetchAniList } from "@/lib/anilist/client";
import { USER_INFO } from "@/lib/anilist/queries";
import { UserInfoType } from "@/types/anime";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mediaId = Number(searchParams.get("mediaId"));

  if (!mediaId) {
    return NextResponse.json(
      { error: "Media ID is required" },
      { status: 400 },
    );
  }

  const comments = await prisma.comment.findMany({
    where: { mediaId, parentId: null },
    include: {
      replies: { orderBy: { createdAt: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(comments);
}

export async function POST(request: Request) {
  const { IsLoggedIn, token } = await getIsLoggedIn();
  if (!IsLoggedIn || !token) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { mediaId, content, parentId } = await request.json();

  if (!mediaId || !content.trim()) {
    return NextResponse.json(
      { error: "Media ID and Content is missing" },
      { status: 401 },
    );
  }

  const userData = await fetchAniList<UserInfoType>(
    USER_INFO,
    undefined,
    undefined,
    token,
    true,
  );

  const viewer = userData.Viewer;

  const comment = await prisma.comment.create({
    data: {
      mediaId,
      content: content.trim(),
      authorId: viewer.id,
      authorName: viewer.name,
      authorAvatarUrl: viewer.avatar.medium,
      ...(parentId ? { parentId } : {}),
    },
  });

  return NextResponse.json(comment);
}
