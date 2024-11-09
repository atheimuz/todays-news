export interface ITrend {
    name: string;
    score: number;
    percent: number;
    keywords: string[];
    news: { link: string; thumbnail: string; title: string; company: string }[];
}
