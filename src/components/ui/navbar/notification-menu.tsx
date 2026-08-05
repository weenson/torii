import { Bell } from "lucide-react";
import Dropdown from "../dropdown";
import { Notification } from "@/types/anime";
import Image from "next/image";
import Link from "next/link";
import { formatToTimeAgo } from "@/lib/anilist/format";

export default function NotificationMenu({
  isLoggedIn,
  open,
  onOpenChange,
  notifications = [],
}: {
  isLoggedIn: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notifications: Notification[];
}) {
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
      width="min-w-72"
      open={open}
      onOpenChange={onOpenChange}
    >
      <div className="text-sm font-bold mb-2">Notifications</div>
      <hr className="mb-2 text-muted-text" />
      {notifications.length === 0 ? (
        <p className="text-muted-text text-sm">No notifications</p>
      ) : (
        notifications.map((n) => {
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
                Episode {n.episode} of{" "}
                {n.media.title.english ?? n.media.title.romaji} aired
              </div>
            );
          }
          return null;
        })
      )}
    </Dropdown>
  );
}
