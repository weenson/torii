"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import { LogIn, UserPlus, UserMinus, UserPen, Loader2 } from "lucide-react";

type FollowButtonProps = {
  userId: number;
  isLoggedIn: boolean;
  initialIsFollowing: boolean;
  isOwnProfile: boolean;
  initialFollowerCount: number;
  initialFollowingCount: number;
};

export default function FollowButton({
  userId,
  isLoggedIn,
  initialIsFollowing,
  isOwnProfile,
  initialFollowerCount,
  initialFollowingCount,
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isLoading, setIsLoading] = useState(false);
  const [followerCount, setFollowerCount] = useState(initialFollowerCount);

  if (!isLoggedIn) {
    return (
      <Button link="/api/auth/login" size="md" variant="signup">
        <LogIn className="w-4 h-4" /> Sign in
      </Button>
    );
  }

  if (isOwnProfile) {
    return (
      <Button link="https://anilist.co/settings" size="md" variant="signup">
        <UserPen className="w-4 h-4" /> Edit Profile
      </Button>
    );
  }

  async function handleClick() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsFollowing(data.isFollowing);
        setFollowerCount((c) => (data.isFollowing ? c + 1 : c - 1));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const label = isFollowing ? "Unfollow" : "Follow";
  const Icon = isFollowing ? UserMinus : UserPlus;
  return (
    <>
      <div className="flex gap-3">
        <p className="text-sm text-muted-text">
          <span className="font-bold text-primary-text">{followerCount}</span>{" "}
          Followers
        </p>
        <p className="text-sm text-muted-text">
          <span className="font-bold text-primary-text">
            {initialFollowingCount}
          </span>{" "}
          Following
        </p>
      </div>
      <div className="mt-2">
        <Button size="md" variant="signup">
          <span
            onClick={handleClick}
            className="inline-flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Icon className="w-4 h-4" />
            )}
            {label}
          </span>
        </Button>
      </div>
    </>
  );
}
