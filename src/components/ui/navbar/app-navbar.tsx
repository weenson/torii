import NavBar from "./navbar";
import { cookies } from "next/headers";
import { fetchAniList } from "@/lib/anilist/client";
import { UserInfoType, NotificationsType } from "@/types/anime";
import { USER_INFO, NOTIFICATIONS } from "@/lib/anilist/queries";
import getIsLoggedIn from "@/lib/anilist/auth";

export default async function AppNavBar({ overlay }: { overlay?: boolean }) {
  const isLoggedIn = await getIsLoggedIn();
  const [userData, notificationData] = await Promise.all([
    isLoggedIn.IsLoggedIn
      ? fetchAniList<UserInfoType>(
          USER_INFO,
          undefined,
          undefined,
          isLoggedIn.token,
        )
      : null,
    isLoggedIn.IsLoggedIn
      ? fetchAniList<NotificationsType>(
          NOTIFICATIONS,
          { page: 1, perPage: 10 },
          undefined,
          isLoggedIn.token,
          true,
        )
      : null,
  ]);

  const user = userData?.Viewer;
  const notifications = notificationData?.Page.notifications ?? [];
  return (
    <NavBar
      overlay={overlay}
      isLoggedIn={isLoggedIn.IsLoggedIn}
      userInfo={user}
      notifications={notifications}
    />
  );
}
