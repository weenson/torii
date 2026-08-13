"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import CommentBody from "./comment-body";
import { Loader2, MessageCircleX } from "lucide-react";

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

  async function handleSubmit({
    mediaId,
    content,
  }: {
    mediaId: number;
    content: string;
  }) {
    if (!content) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mediaId: mediaId,
          content: content,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [data, ...prev]);
        if (textareaRef.current) {
          textareaRef.current.value = "";
          textareaRef.current.style.height = "auto";
        }
        toast.success("Comment posted successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        {isLoggedIn ? (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget);
              const content = form.get("comment")?.toString().trim() ?? "";
              await handleSubmit({ mediaId, content });
            }}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="comment"
                className="text-2xl font-bold text-primary-text"
              >
                Comment
              </label>
              <textarea
                ref={textareaRef}
                id="comment"
                name="comment"
                rows={1}
                placeholder="Write a comment..."
                maxLength={500}
                onInput={autoResizeTextarea}
                className="min-h-24 w-full resize-none overflow-hidden rounded-md border border-border bg-background px-3 py-2 text-sm text-primary-text outline-none placeholder:text-muted-text focus:border-primary"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-text transition-colors hover:bg-primary/90"
              >
                {isSubmitting ? "Posting..." : "Post comment"}
              </button>
            </div>
          </form>
        ) : (
          <p className="text-sm text-muted-text">Sign in to leave a comment.</p>
        )}
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary-text" />
          </div>
        ) : comments.length > 0 ? (
          <div className="flex flex-col gap-3">
            {comments.map((comment) => (
              <CommentBody key={comment.id} comment={comment} />
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
