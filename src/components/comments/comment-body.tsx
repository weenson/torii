"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { formatToTimeAgo } from "@/lib/anilist/format";
import type { Comment } from "./comments";
import { MessageSquareReply, X } from "lucide-react";

type CommentBodyProps = {
  comment: Comment;
  isLoggedIn: boolean;
  onReply: (parentId: string, content: string) => Promise<boolean>;
};

export default function CommentBody({
  comment,
  isLoggedIn,
  onReply,
}: CommentBodyProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const canReply = isLoggedIn && comment.parentId === null;

  function autoResizeTextarea() {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  async function handleReplySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const content = form.get("reply")?.toString().trim() ?? "";
    if (!content) return;

    setIsSubmitting(true);
    try {
      const ok = await onReply(comment.id, content);
      if (ok) {
        setIsReplying(false);
        if (textareaRef.current) {
          textareaRef.current.value = "";
          textareaRef.current.style.height = "auto";
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
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
          {canReply && !isReplying && (
            <button
              type="button"
              onClick={() => setIsReplying(true)}
              className="mt-2.5 inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-muted-text transition-colors hover:text-primary"
            >
              <MessageSquareReply className="h-3.5 w-3.5" aria-hidden="true" />
              Reply
            </button>
          )}
        </div>
      </article>

      {isReplying && (
        <form
          onSubmit={handleReplySubmit}
          className="ml-8 mt-3 flex flex-col gap-2.5 rounded-lg border border-border bg-card/80 p-3 shadow-sm"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold text-primary-text">
              Reply to {comment.authorName}
            </p>
            <button
              type="button"
              onClick={() => setIsReplying(false)}
              className="cursor-pointer rounded p-0.5 text-muted-text transition-colors hover:text-primary-text"
              aria-label="Cancel reply"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <textarea
            ref={textareaRef}
            name="reply"
            rows={2}
            autoFocus
            placeholder="Write a reply..."
            maxLength={500}
            onInput={autoResizeTextarea}
            className="min-h-16 w-full resize-none overflow-hidden rounded-md border border-border bg-background px-3 py-2 text-sm leading-relaxed text-primary-text outline-none transition-colors placeholder:text-muted-text focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsReplying(false)}
              className="cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium text-muted-text transition-colors hover:text-primary-text"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-text transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Posting..." : "Post reply"}
            </button>
          </div>
        </form>
      )}

      {comment.replies?.map((reply) => (
        <div key={reply.id} className="ml-8 mt-3">
          <CommentBody
            comment={reply}
            isLoggedIn={isLoggedIn}
            onReply={onReply}
          />
        </div>
      ))}
    </div>
  );
}
