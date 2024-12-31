export interface INewsItem {
    id: number;
    category: "politics" | "economy" | "society" | "entertainment" | "sports" | "it" | "health";
    thumbnail: string;
    title: string;
    summary: string;
    description: string;
    company: string;
    writer: string;
    link: string;
    date: string;
}

export interface INews {
    link: string;
    thumbnail: string | null;
    title: string;
    description: string;
    date: string;
}
