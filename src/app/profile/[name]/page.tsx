import AppNavBar from "@/components/ui/navbar/app-navbar";
import { fetchAniList } from "@/lib/anilist/client";
import {
  USER_INFO,
  USER_ANIME_LIST,
  PROFILE_INFO,
  FOLLOWING_USERS,
} from "@/lib/anilist/queries";
import {
  UserInfoType,
  UserAnimeListType,
  ProfileInfoType,
  FollowUsersType,
} from "@/types/anime";
import ProfileBody from "./profile-body";
import ProfileHeader from "./profile-header";
import getIsLoggedIn from "@/lib/anilist/auth";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const isLoggedIn = await getIsLoggedIn();

  const [loggedInUserInfo, animeData, userInfo] = await Promise.all([
    isLoggedIn?.token
      ? fetchAniList<UserInfoType>(
          USER_INFO,
          undefined,
          undefined,
          isLoggedIn?.token,
          true,
        )
      : null,
    fetchAniList<UserAnimeListType>(
      USER_ANIME_LIST,
      { userName: name },
      undefined,
      undefined,
      true,
    ),
    fetchAniList<ProfileInfoType>(
      PROFILE_INFO,
      { userName: name },
      undefined,
      isLoggedIn?.token,
      true,
    ),
  ]);

  const anime = animeData.MediaListCollection.lists;
  const user = userInfo.User;

  const followerInfo = await fetchAniList<FollowUsersType>(FOLLOWING_USERS, {
    userId: Number(user.id),
  });

  const watchingList =
    anime.find((list) => list.status === "CURRENT")?.entries ?? [];
  const completedList =
    anime.find((list) => list.status === "COMPLETED")?.entries ?? [];
  const planningList =
    anime.find((list) => list.status === "PLANNING")?.entries ?? [];
  const droppedList =
    anime.find((list) => list.status === "DROPPED")?.entries ?? [];
  const pausedList =
    anime.find((list) => list.status === "PAUSED")?.entries ?? [];
  return (
    <main className="flex flex-col">
      <AppNavBar overlay />
      <section>
        <ProfileHeader
          user={user}
          follower={followerInfo}
          isLoggedIn={isLoggedIn.IsLoggedIn}
          viewerId={loggedInUserInfo?.Viewer.id ?? null}
        />
      </section>
      <section className="px-4 py-6 pb-14">
        <ProfileBody
          watching={watchingList}
          completed={completedList}
          planning={planningList}
          dropped={droppedList}
          paused={pausedList}
        />
      </section>
    </main>
  );
}
