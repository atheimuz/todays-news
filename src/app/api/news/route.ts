import { NextRequest, NextResponse } from "next/server";
import { fetchMetaImage } from "@/utils/fetch-meta";

interface INaverNews {
    originallink: string;
    title: string;
    pubDate: string;
    description: string;
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get("keyword");

    if (!keyword) {
        return NextResponse.json({ status: 200, data: [] });
    }

    try {
        const response = await fetch(
            `https://openapi.naver.com/v1/search/news.json?query=${keyword}`,
            {
                headers: {
                    "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID as string,
                    "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET as string
                }
            }
        );
        const data: { items: INaverNews[] } = await response.json();
        const { items } = data;

        const result = await Promise.all(
            items.map(async (item) => {
                const thumbnail = await fetchMetaImage(item.originallink);

                return {
                    link: item.originallink,
                    title: item.title,
                    date: item.pubDate,
                    description: item.description,
                    thumbnail
                };
            })
        );
        return NextResponse.json({ status: 200, data: result });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: `Error fetching brand. detail: ${
                    error instanceof Error ? error.message : "unknown"
                }`
            },
            { status: 500 }
        );
    }
}
