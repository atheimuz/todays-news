import { create } from "zustand";

interface NewsStore {
    newsLink: string | null;
    setNewsLink: (link: string | null) => void;
}

export const useNewsStore = create<NewsStore>((set) => ({
    newsLink: null,
    setNewsLink: (link) => set(() => ({ newsLink: link }))
}));
