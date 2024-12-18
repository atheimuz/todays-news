import { NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";

function percentToNumber(input: string) {
    const number = parseFloat(input.replace(/,/g, "").replace("+", ""));
    return number;
}

async function fetchMetaImage(url: string) {
    try {
        const response = await fetch(url, { redirect: "follow" });
        const htmlData = await response.text();

        const ogImageMatch = htmlData.match(/<meta property="og:image" content="([^"]+)"/);
        const twitterImageMatch = htmlData.match(/<meta name="twitter:image" content="([^"]+)"/);

        if (ogImageMatch) return ogImageMatch[1];
        if (twitterImageMatch) return twitterImageMatch[1];

        return null;
    } catch (error) {
        console.error("Error fetching the meta image:", error);
        return null;
    }
}

function replaceImgUrl(url: string) {
    let returnUrl = url;
    returnUrl = returnUrl?.replace(/&amp;/g, "&");
    if (returnUrl?.includes("///")) {
        console.log("return::", returnUrl);
        returnUrl = `https://${returnUrl.split("///")[1]}`;
    }
    return returnUrl;
}

export async function GET() {
    try {
        const response = await fetch(
            `https://trends.google.com/trends/trendingsearches/daily/rss?geo=KR&hl=ko`
        );
        const xmlData = await response.text();
        const jsonData = await parseStringPromise(xmlData, { explicitArray: false });
        const items = jsonData.rss.channel.item;

        const result = await Promise.all(
            items.map(async (item) => {
                let news = [];
                if (item?.["ht:news_item"].length > 0) {
                    news = await Promise.all(
                        item?.["ht:news_item"]?.map(async (newsItem) => {
                            const thumbnail = await fetchMetaImage(newsItem["ht:news_item_url"]);
                            return {
                                link: newsItem["ht:news_item_url"],
                                title: newsItem["ht:news_item_title"],
                                thumbnail: replaceImgUrl(
                                    newsItem["ht:news_item_picture"] || thumbnail
                                ),
                                company: newsItem["ht:news_item_source"]
                            };
                        })
                    );
                }

                return {
                    name: item.title,
                    thumbnail: replaceImgUrl(item["ht:picture"]),
                    score: percentToNumber(item["ht:approx_traffic"]),
                    news
                };
            })
        );

        return NextResponse.json({ status: 200, data: result });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message: `Error fetching brand. detail: ${error.message}`
            },
            { status: 500 }
        );
    }
}
