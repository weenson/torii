import { useState, useEffect } from "react";
import { Bell, Loader2 } from "lucide-react";
import Dropdown from "../dropdown";
import { Notification } from "@/types/anime";
import Image from "next/image";
import Link from "next/link";
import { formatToTimeAgo } from "@/lib/anilist/format";

export default function NotificationMenu({
  isLoggedIn,
  open,
  onOpenChange,
  onNotificationCountChange,
}: {
  isLoggedIn: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNotificationCountChange: (count: number) => void;
}) {
  const [notification, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!open || !isLoggedIn) return;
    let closeDropdown = false;
    setIsLoading(true);

    async function loadNotifications() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        if (closeDropdown) return;
        setNotifications(data);
        onNotificationCountChange(0);
      } finally {
        if (!closeDropdown) setIsLoading(false);
      }
    }
    loadNotifications();

    return () => {
      closeDropdown = true;
    };
  }, [open, isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <Dropdown
        trigger={<Bell className="h-6 w-6" />}
        width="min-w-72"
        open={open}
        onOpenChange={onOpenChange}
      >
        <div className="flex items-center justify-between text-sm font-bold mb-4">
          Notifications
        </div>
        <div className="flex flex-col items-center text-center justify-between text-sm font-bold gap-2 py-4">
          <Bell className="h-10 w-10 text-muted-text" />
          <p className="text-muted-text text-sm font-bold">
            Login to see your notifications
          </p>
          <p className="text-muted-text text-xs">
            Sign in to receive updates about your comments or interactions.
          </p>
        </div>
      </Dropdown>
    );
  }

  return (
    <Dropdown
      trigger={<Bell className="h-6 w-6" />}
      width="min-w-96"
      open={open}
      onOpenChange={onOpenChange}
    >
      <div className="text-sm font-bold mb-2">
        <span className="flex gap-2 items-center">
          <Bell className="h-4 w-4" />
          Notifications
        </span>
      </div>
      <hr className="mb-2 text-muted" />
      {isLoading ? (
        <div className="flex flex-col gap-2 items-center p-4">
          <Loader2 className="animate-spin" />
          <p className="text-muted-text text-sm">Loading...</p>
        </div>
      ) : notification.length === 0 ? (
        <div className="flex flex-col gap-2 items-center p-4">
          <Bell className="text-muted-text" />
          <p className="text-muted-text text-sm">No notifications.</p>
        </div>
      ) : (
        notification.map((n) => {
          if (n.type === "FOLLOWING") {
            return (
              <div key={n.id} className="px-2 py-2 text-sm">
                <div className="flex gap-2 items-center">
                  <Image
                    src={n.user.avatar.medium}
                    alt=""
                    className="rounded-full"
                    width={42}
                    height={42}
                  />{" "}
                  <div className="flex flex-col">
                    <div>
                      <span className="font-bold hover:underline">
                        <Link href={`/profile/${n.user.name}`}>
                          {n.user.name}
                        </Link>
                      </span>{" "}
                      followed you!
                    </div>
                    <p className="text-muted-text text-xs">
                      {formatToTimeAgo(n.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            );
          }
          if (n.type === "AIRING") {
            return (
              <div key={n.id} className="px-2 py-2 text-sm">
                <span className="flex gap-2">
                  <Image
                    src={n.media.coverImage.medium}
                    alt=""
                    width={42}
                    height={42}
                  />
                  <div className="flex flex-col">
                    <div>
                      Episode {n.episode} of{" "}
                      <span className="font-bold hover:underline">
                        <Link href={`/anime/${n.media.id}`}>
                          {n.media.title.english ?? n.media.title.romaji}
                        </Link>
                      </span>{" "}
                      aired
                    </div>
                    <p className="text-muted-text text-xs">
                      {formatToTimeAgo(n.createdAt)}
                    </p>
                  </div>
                </span>
              </div>
            );
          }
          return null;
        })
      )}
    </Dropdown>
  );
}
