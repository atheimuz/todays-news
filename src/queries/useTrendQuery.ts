import { useSuspenseQuery } from "@tanstack/react-query";
import { getTrendsAPI } from "@/remote/trend";

export const TRENDS_QUERY_KEY = "trends";

export const useTrends = () => {
    return useSuspenseQuery({
        queryKey: [TRENDS_QUERY_KEY],
        queryFn: getTrendsAPI
    });
};
