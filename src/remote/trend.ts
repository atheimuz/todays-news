import { ITrend } from "@/models/trend";

export const getTrendsAPI = async () => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URI}/api/trends`;
        const res = await fetch(url);
        const resJson = await res.json();
        const data: ITrend = resJson.data;

        return data;
    } catch (e) {
        return {
            error: e instanceof Error ? e.message : "An unknown error occurred"
        };
    }
};
