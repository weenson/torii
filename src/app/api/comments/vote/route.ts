import { NextResponse } from "next/server";
import { prisma } from "@/lib/anilist/db";
import getIsLoggedIn from "@/lib/anilist/auth";
import { fetchAniList } from "@/lib/anilist/client";
import { USER_INFO } from "@/lib/anilist/queries";
import { UserInfoType } from "@/types/anime";

export async function POST(request: Request) {
  const { IsLoggedIn, token } = await getIsLoggedIn();

  if (!IsLoggedIn || !token) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const {
    commentId,
    clickedButton,
  }: { commentId: string; clickedButton: "like" | "dislike" } =
    await request.json();

  if (!commentId)
    return NextResponse.json(
      { error: "Comment ID is required" },
      { status: 400 },
    );

  if (clickedButton !== "like" && clickedButton !== "dislike") {
    return NextResponse.json(
      { error: "Missing like/dislike" },
      { status: 400 },
    );
  }

  const userData = await fetchAniList<UserInfoType>(
    USER_INFO,
    undefined,
    undefined,
    token,
    true,
  );

  const viewer = userData.Viewer.id;

  const checkUserVote = await prisma.commentVote.findUnique({
    where: {
      commentId_userId: {
        commentId: commentId,
        userId: viewer,
      },
    },
  });

  let myVote;

  const value = clickedButton === "like" ? 1 : -1;

  if (!checkUserVote) {
    await prisma.commentVote.create({
      data: {
        commentId: commentId,
        userId: viewer,
        value: value,
      },
    });
    myVote = value;
  } else if (checkUserVote.value === value) {
    await prisma.commentVote.delete({
      where: {
        commentId_userId: {
          commentId: commentId,
          userId: viewer,
        },
      },
    });
    myVote = null;
  } else {
    await prisma.commentVote.update({
      where: {
        commentId_userId: {
          commentId: commentId,
          userId: viewer,
        },
      },
      data: {
        value: value,
      },
    });
    myVote = value;
  }

  const likeCount = await prisma.commentVote.count({
    where: {
      commentId: commentId,
      value: 1,
    },
  });

  const dislikeCount = await prisma.commentVote.count({
    where: {
      commentId: commentId,
      value: -1,
    },
  });

  return NextResponse.json({ likeCount, dislikeCount, myVote });
}
