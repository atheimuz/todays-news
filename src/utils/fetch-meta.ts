import { JSDOM } from "jsdom";

// 요소 제거
const removeElements = async (elements: NodeListOf<Element> | Element[]): Promise<void> => {
    elements.forEach((element) => element.remove());
};

// HTML에서 기사 컨텐츠를 추출
const extractArticleContent = (document: Document): HTMLElement | null => {
    const selectors = [
        "#CmAdContent",
        "#divNewsContent",
        '[itemprop^="article"]',
        ".article-body",
        ".article_body",
        ".article_content",
        ".article",
        "#art",
        ".content"
    ];

    for (const selector of selectors) {
        const element = document.body.querySelector(selector);
        if (element) {
            return element as HTMLElement;
        }
    }

    return null;
};

// 불필요한 요소 제거
const cleanArticleContent = async (article: HTMLElement): Promise<void> => {
    const selectorsToRemove = [
        "iframe",
        "button",
        '[id*="ad"], [id*="banner"], [id*="support"], [id*="info"], [id*="writer"]',
        '[id*="Ad"], [id*="Banner"], [id*="Support"], [id*="Info"], [id*="Writer"]',
        '[class*="ad"], [class*="banner"], [class*="support"], [class*="info"], [class*="writer"]',
        '[class*="Ad"], [class*="Banner"], [class*="Support"], [class*="Info"], [class*="Writer"]',
        "script",
        "h1",
        "h2",
        "ul"
    ];

    for (const selector of selectorsToRemove) {
        const elements = article.querySelectorAll(selector);
        await removeElements(elements);
    }
};

// 이미지 src 속성 처리
const cleanImageSources = (document: Document): void => {
    const images = document.querySelectorAll("img");
    images.forEach((img: HTMLImageElement) => {
        if (img.src.includes("/_ir50_/")) {
            img.src = img.src.replace(/\/_ir50_\//g, ""); // "/_ir50_/" 부분 제거
        }
    });
};

// 기사 이미지를 가져오는 함수
export const fetchMetaImage = async (htmlData: string) => {
    const ogImageMatch = htmlData.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/);
    const twitterImageMatch = htmlData.match(
        /<meta[^>]*name="twitter:image"[^>]*content="([^"]+)"/
    );

    if (ogImageMatch) return ogImageMatch[1];
    if (twitterImageMatch) return twitterImageMatch[1];

    return null;
};

// 기사 텍스트를 가져오는 함수
export const fetchMetaText = async (htmlData: string): Promise<string | null> => {
    try {
        const dom = new JSDOM(htmlData);
        const document = dom.window.document;

        const article = extractArticleContent(document);
        if (!article) {
            return null;
        }

        await cleanArticleContent(article);
        cleanImageSources(document);

        return article.innerHTML;
    } catch (error) {
        console.error("Error fetching the meta content:", error);
        return null;
    }
};
