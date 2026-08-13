"use client";

import Image from "next/image";
import { formatToTimeAgo } from "@/lib/anilist/format";
import type { Comment } from "./comments";

type CommentBodyProps = {
  comment: Comment;
};

export default function CommentBody({ comment }: CommentBodyProps) {
  return (
    <article className="flex gap-3 rounded-lg border border-border bg-card p-4">
      {comment.authorAvatarUrl ? (
        <Image
          src={comment.authorAvatarUrl}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary-text"
          aria-hidden="true"
        >
          {comment.authorName.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="font-semibold text-primary-text">
            {comment.authorName}
          </span>
          <time
            dateTime={comment.createdAt}
            className="text-xs text-muted-text"
          >
            {formatToTimeAgo(
              Math.floor(new Date(comment.createdAt).getTime() / 1000),
            )}
          </time>
        </div>
        <p className="mt-1.5 whitespace-pre-wrap wrap-break-word text-sm leading-relaxed text-primary-text">
          {comment.content}
        </p>
      </div>
    </article>
  );
}
