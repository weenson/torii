import { ProfileInfoType, FollowUsersType } from "@/types/anime";
import { Calendar } from "lucide-react";
import { formatDateToMMDDYY } from "@/lib/anilist/format";
import Image from "next/image";
type UserProps = {
  user: ProfileInfoType["User"];
  follower: FollowUsersType;
};

export default function ProfileHeader({ user, follower }: UserProps) {
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
        <div className="flex flex-row gap-4 items-center text-primary-text">
          <Image
            src={user.avatar.large}
            alt=""
            width={240}
            height={360}
            className="rounded-full h-48 w-48"
          />
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-3xl">{user.name}</h2>
            <p className="text-sm text-muted-text">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Joined on{" "}
                <span className="font-bold">
                  {formatDateToMMDDYY(user.createdAt)}
                </span>
              </span>
            </p>
            <div className="flex flex-row gap-2">
              <p className="text-sm text-muted-text">
                <span className="font-bold text-primary-text">
                  {follower.followersPage.pageInfo.total}
                </span>{" "}
                Followers
              </p>
              <p className="text-sm text-muted-text">
                <span className="font-bold text-primary-text">
                  {follower.followingPage.pageInfo.total}
                </span>{" "}
                Following
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
