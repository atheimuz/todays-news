import { NextRequest, NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";
import fetch from "node-fetch";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get("keyword");

    if (!keyword) {
        return NextResponse.json({ status: 200, data: [] });
    }

    try {
        const response = await fetch(
            `https://news.google.com/rss/search?q=${keyword}+when:1d&hl=ko&gl=KR&ceid=KR:ko`
        );
        const xmlData = await response.text();
        const jsonData = await parseStringPromise(xmlData, { explicitArray: false });
        const items = jsonData.rss.channel.item;

        const result = items.map((item) => {
            const company = item.source._;
            const title = item.title.replace(` - ${company}`, "");
            return {
                link: item.link,
                title,
                company,
                date: item.pubDate
            };
        });

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
