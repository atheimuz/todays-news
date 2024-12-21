export const fetchMetaImage = async (url: string) => {
    try {
        const response = await fetch(url);
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
};
