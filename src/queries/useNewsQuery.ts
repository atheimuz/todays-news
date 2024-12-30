import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { getNewsAPI, getNewsListAPI } from "@/remote/news";

export const NEWS_LIST_QUERY_KEY = "newsList";
export const NEWS_QUERY_KEY = "news";

export const useNewsList = (keyword: string) => {
    return useSuspenseQuery({
        queryKey: [NEWS_LIST_QUERY_KEY, keyword],
        queryFn: () => getNewsListAPI(keyword)
    });
};

export const useNews = (link: string | null) => {
    return useQuery({
        queryKey: [NEWS_QUERY_KEY, link],
        queryFn: () => getNewsAPI(link as string),
        enabled: !!link
    });
};
