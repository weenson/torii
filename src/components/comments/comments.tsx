"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import CommentBody from "./comment-body";
import { Loader2, MessageCircleX, MessageSquarePlus } from "lucide-react";

type CommentsProps = {
  mediaId: number;
  isLoggedIn: boolean;
};

export type Comment = {
  id: string;
  content: string;
  mediaId: number;
  authorId: number;
  authorName: string;
  authorAvatarUrl: string | "";
  createdAt: string;
  updatedAt: string;
  parentId: string | null;
  replies: Comment[];
};

export default function Comments({ mediaId, isLoggedIn }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function autoResizeTextarea() {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  useEffect(() => {
    if (!mediaId) return;

    const controller = new AbortController();
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/comments?mediaId=${mediaId}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        if (!res.ok) return;
        setComments(data);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();

    return () => {
      controller.abort();
    };
  }, [mediaId]);

  async function submitComment(content: string, parentId?: string) {
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mediaId,
        content,
        ...(parentId ? { parentId } : {}),
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error ?? "Failed to post comment");
      return false;
    }

    const newComment: Comment = { ...data, replies: data.replies ?? [] };

    if (parentId) {
      setComments((prev) =>
        prev.map((c) =>
          c.id === parentId
            ? { ...c, replies: [...(c.replies ?? []), newComment] }
            : c,
        ),
      );
      toast.success("Reply posted");
    } else {
      setComments((prev) => [newComment, ...prev]);
      toast.success("Comment posted successfully");
    }

    return true;
  }

  async function handleSubmit({
    content,
  }: {
    mediaId: number;
    content: string;
  }) {
    if (!content) return;
    setIsSubmitting(true);
    try {
      const ok = await submitComment(content);
      if (ok && textareaRef.current) {
        textareaRef.current.value = "";
        textareaRef.current.style.height = "auto";
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleReply(parentId: string, content: string) {
    try {
      return await submitComment(content, parentId);
    } catch (error) {
      console.error(error);
      toast.error("Failed to post reply");
      return false;
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-primary-text">Comments</h2>
        <p className="text-sm text-muted-text">
          Share your thoughts about this anime.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {isLoggedIn ? (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget);
              const content = form.get("comment")?.toString().trim() ?? "";
              await handleSubmit({ mediaId, content });
            }}
            className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <MessageSquarePlus
                className="h-5 w-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <label
                htmlFor="comment"
                className="text-sm font-semibold text-primary-text"
              >
                Write a comment
              </label>
            </div>
            <textarea
              ref={textareaRef}
              id="comment"
              name="comment"
              rows={3}
              placeholder="What did you think?"
              maxLength={500}
              onInput={autoResizeTextarea}
              className="min-h-24 w-full resize-none overflow-hidden rounded-md border border-border bg-background px-3 py-2.5 text-sm leading-relaxed text-primary-text outline-none transition-colors placeholder:text-muted-text focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
              <p className="text-xs text-muted-text">Max 500 characters</p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-text transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Posting..." : "Post comment"}
              </button>
            </div>
          </form>
        ) : (
          <div className="rounded-lg border border-border bg-card p-4 text-center">
            <p className="text-sm text-muted-text">
              Sign in to join the discussion.
            </p>
          </div>
        )}
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary-text" />
          </div>
        ) : comments.length > 0 ? (
          <div className="flex flex-col gap-3">
            {comments.map((comment) => (
              <CommentBody
                key={comment.id}
                comment={comment}
                isLoggedIn={isLoggedIn}
                onReply={handleReply}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <MessageCircleX className="h-10 w-10 text-muted-text" />
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-md text-muted-text">No comments yet.</p>
              <p className="text-sm text-muted-text">
                Be the first to comment.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
