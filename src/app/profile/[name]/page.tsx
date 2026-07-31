import AppNavBar from "@/components/ui/navbar/app-navbar";
import { fetchAniList } from "@/lib/anilist/client";
import {
  USER_ANIME_LIST,
  PROFILE_INFO,
  FOLLOWING_USERS,
} from "@/lib/anilist/queries";
import {
  UserAnimeListType,
  ProfileInfoType,
  FollowUsersType,
} from "@/types/anime";
import ProfileBody from "./profile-body";
import ProfileHeader from "./profile-header";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const [animeData, userInfo] = await Promise.all([
    fetchAniList<UserAnimeListType>(USER_ANIME_LIST, { userName: name }),
    fetchAniList<ProfileInfoType>(PROFILE_INFO, { userName: name }),
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

  return (
    <main className="flex flex-col gap-6">
      <AppNavBar overlay />
      <section>
        <ProfileHeader user={user} follower={followerInfo} />
      </section>
      <section className="px-4">
        <ProfileBody
          watching={watchingList}
          completed={completedList}
          planning={planningList}
          dropped={droppedList}
        />
      </section>
    </main>
  );
}
