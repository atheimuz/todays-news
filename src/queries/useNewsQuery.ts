import { useSuspenseQuery } from "@tanstack/react-query";
import { getNewsAPI } from "@/remote/news";

export const NEWS_LIST_QUERY_KEY = "newsList";

export const useNewsList = (keyword: string) => {
    return useSuspenseQuery({
        queryKey: [NEWS_LIST_QUERY_KEY, keyword],
        queryFn: () => getNewsAPI(keyword)
    });
};
