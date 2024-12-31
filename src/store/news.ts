import { create } from "zustand";
import { INews } from "@/models/news";

interface NewsStore {
    detail: INews | null;
    setNewsDetail: (link: INews | null) => void;
}

export const useNewsStore = create<NewsStore>((set) => ({
    detail: null,
    setNewsDetail: (info) => set(() => ({ detail: info }))
}));
