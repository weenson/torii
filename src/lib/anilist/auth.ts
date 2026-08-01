import { cookies } from "next/headers";

const getIsLoggedIn = async () => {
  const cookieStore = await cookies();
  const IsLoggedIn = !!cookieStore.get("oauth-token");
  const token = cookieStore.get("oauth-token")?.value;
  return { IsLoggedIn, token };
};

export default getIsLoggedIn;
