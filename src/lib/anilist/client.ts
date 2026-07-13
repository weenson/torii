const url = 'https://graphql.anilist.co'

type AniListResponse<T> = {
    data: T;
    errors?: { message: string }[];
}

export async function fetchAniList<T>(
    query: string,
    variables?: Record<string, any>,
):Promise<T> {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            query,
            variables
        }),
        next: { revalidate: 3600 },
    })

    const json: AniListResponse<T> = await response.json();
    if (json.errors?.[0].message === "Not Found.") {
        return { Media: null } as T;
      }

    if (json.errors) {
        throw new Error(json.errors[0].message);
      }
    return json.data
}