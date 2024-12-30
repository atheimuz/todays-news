import { JSDOM } from "jsdom";

export const fetchMetaImage = async (htmlData: string) => {
    try {
        const ogImageMatch = htmlData.match(/<meta property="og:image" content="([^"]+)"/);
        const twitterImageMatch = htmlData.match(/<meta name="twitter:image" content="([^"]+)"/);

        if (ogImageMatch) return ogImageMatch[1];
        if (twitterImageMatch) return twitterImageMatch[1];

        return null;
    } catch (error) {
        console.error("Error fetching the meta image:", error);
        return null;
    }
};

export const fetchMetaText = async (htmlData: string) => {
    try {
        const dom = new JSDOM(htmlData);
        const document = dom.window.document;
        const article =
            document.querySelector(".article-body") || document.querySelector(".article_body");

        if (article) {
            return article.innerHTML;
        }
        return null;
    } catch (error) {
        console.error("Error fetching the meta content:", error);
        return null;
    }
};
