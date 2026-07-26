import NavBar from "./navbar";
import { cookies } from "next/headers";
import { fetchAniList } from "@/lib/anilist/client";
import { UserInfoType } from "@/types/anime";
import { USER_INFO } from "@/lib/anilist/queries";

export default async function AppNavBar({ overlay }: { overlay?: boolean }) {
  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get("oauth-token");
  const token = cookieStore.get("oauth-token")?.value;
  const data = isLoggedIn
    ? await fetchAniList<UserInfoType>(USER_INFO, undefined, undefined, token)
    : null;
  const user = data?.Viewer;
  return <NavBar overlay={overlay} isLoggedIn={isLoggedIn} userInfo={user} />;
}
