import NavBar from "./navbar";
import { cookies } from "next/headers";
import { fetchAniList } from "@/lib/anilist/client";
import { UserInfoType } from "@/types/anime";
import { USER_INFO } from "@/lib/anilist/queries";
import getIsLoggedIn from "@/lib/anilist/auth";

export default async function AppNavBar({ overlay }: { overlay?: boolean }) {
  const isLoggedIn = await getIsLoggedIn();
  const data = isLoggedIn?.token
    ? await fetchAniList<UserInfoType>(
        USER_INFO,
        undefined,
        undefined,
        isLoggedIn.token,
      )
    : null;
  const user = data?.Viewer;
  return (
    <NavBar
      overlay={overlay}
      isLoggedIn={isLoggedIn.IsLoggedIn}
      userInfo={user}
    />
  );
}
