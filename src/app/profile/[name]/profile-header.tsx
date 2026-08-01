import { ProfileInfoType, FollowUsersType } from "@/types/anime";
import { Calendar } from "lucide-react";
import { formatDateToMMDDYY } from "@/lib/anilist/format";
import Image from "next/image";
import FollowButton from "./follow-button";

type UserProps = {
  user: ProfileInfoType["User"];
  follower: FollowUsersType;
  isLoggedIn: boolean;
  viewerId: number | null;
};

export default function ProfileHeader({
  user,
  follower,
  isLoggedIn,
  viewerId,
}: UserProps) {
  return (
    <div>
      <div className="h-[30vh] overflow-hidden w-full relative">
        <Image
          src={user.bannerImage}
          alt=""
          width={1920}
          height={1080}
          className="object-cover object-[center_35%] w-full h-full"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-background/20" />
      </div>
      <div className="relative -mt-24 mx-4">
        <div className="flex flex-col gap-6 text-primary-text md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={user.avatar.large}
              alt=""
              width={240}
              height={360}
              className="rounded-full h-32 w-32 md:h-48 md:w-48 shrink-0"
            />
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-2xl md:text-3xl">{user.name}</h2>
              <p className="text-sm text-muted-text flex items-center gap-1">
                <Calendar className="w-4 h-4 shrink-0" />
                Joined
                <span className="font-bold">
                  {formatDateToMMDDYY(user.createdAt)}
                </span>
              </p>
              <FollowButton
                userId={user.id}
                isLoggedIn={isLoggedIn}
                initialIsFollowing={user.isFollowing}
                isOwnProfile={viewerId === user.id}
                initialFollowerCount={follower.followersPage.pageInfo.total}
                initialFollowingCount={follower.followingPage.pageInfo.total}
              />
            </div>
          </div>
          <div className="flex gap-6 md:gap-8 justify-center">
            <div className="flex flex-col items-center text-sm text-muted-text">
              <span className="font-bold text-2xl md:text-3xl text-primary">
                {user.statistics.anime.count}
              </span>
              Total Anime
            </div>
            <div className="flex flex-col items-center text-sm text-muted-text">
              <span className="font-bold text-2xl md:text-3xl text-primary">
                {(user.statistics.anime.minutesWatched / 1440).toFixed(1)}
              </span>
              Days Watched
            </div>
            <div className="flex flex-col items-center text-sm text-muted-text">
              <span className="font-bold text-2xl md:text-3xl text-primary">
                {user.statistics.anime.episodesWatched}
              </span>
              Episodes Watched
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
