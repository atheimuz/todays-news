import { NextRequest, NextResponse } from "next/server";
import { fetchMetaImage } from "@/utils/fetch-meta";

interface INaverNews {
    originallink: string;
    link: string;
    title: string;
    pubDate: string;
    description: string;
}

interface INewsItem {
    link: string;
    title: string;
    date: string;
    description: string;
    thumbnail: string | null;
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
                const itemInfo: INewsItem = {
                    link: item.originallink,
                    title: item.title,
                    date: item.pubDate,
                    description: item.description,
                    thumbnail: null
                };

                try {
                    const response = await fetch(item.originallink);
                    const htmlData = await response.text();
                    const thumbnail = await fetchMetaImage(htmlData);
                    itemInfo.thumbnail = thumbnail;
                } catch (e) {
                    console.log("e:::", e);
                } finally {
                    return itemInfo;
                }
            })
        );
        return NextResponse.json({ status: 200, data: result });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: `Error fetching news. detail: ${
                    error instanceof Error ? error.message : "unknown"
                }`
            },
            { status: 500 }
        );
    }
}
