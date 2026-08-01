const url = "https://graphql.anilist.co";

type AniListResponse<T> = {
  data: T;
  errors?: { message: string }[];
};

export async function fetchAniList<T>(
  query: string,
  variables?: Record<string, any>,
  signal?: AbortSignal,
  token?: string,
  noStore?: boolean,
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
    signal,
    ...(noStore ? { cache: "no-store" } : { next: { revalidate: 3600 } }),
  });

  const json: AniListResponse<T> = await response.json();
  if (json.errors?.[0].message === "Not Found.") {
    return { Media: null } as T;
  }

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }
  return json.data;
}
