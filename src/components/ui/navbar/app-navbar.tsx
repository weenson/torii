import NavBar from "./navbar";
import { fetchAniList } from "@/lib/anilist/client";
import { UserInfoType, UnreadNotificationsType } from "@/types/anime";
import { USER_INFO, UNREAD_NOTIFICATIONS } from "@/lib/anilist/queries";
import getIsLoggedIn from "@/lib/anilist/auth";

export default async function AppNavBar({ overlay }: { overlay?: boolean }) {
  const isLoggedIn = await getIsLoggedIn();
  const [userData, unreadNotificationsData] = await Promise.all([
    isLoggedIn.IsLoggedIn
      ? fetchAniList<UserInfoType>(
          USER_INFO,
          undefined,
          undefined,
          isLoggedIn.token,
        )
      : null,
    isLoggedIn.IsLoggedIn
      ? fetchAniList<UnreadNotificationsType>(
          UNREAD_NOTIFICATIONS,
          undefined,
          undefined,
          isLoggedIn.token,
        )
      : null,
  ]);

  const user = userData?.Viewer;
  return (
    <NavBar
      overlay={overlay}
      isLoggedIn={isLoggedIn.IsLoggedIn}
      userInfo={user}
      unreadNotificationsCount={
        unreadNotificationsData?.Viewer?.unreadNotificationCount ?? 0
      }
    />
  );
}
