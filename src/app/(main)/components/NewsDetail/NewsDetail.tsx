"use client";

import { useNewsStore } from "@/store/news";
import { useNews } from "@/queries/useNewsQuery";
import styles from "./NewsDetail.module.scss";

const NewsDetail = () => {
    const newsLink = useNewsStore((state) => state.newsLink);
    const { data } = useNews(newsLink);

    if (!newsLink || !data) return null;

    return (
        <div className={styles.wrapper}>
            <div dangerouslySetInnerHTML={{ __html: data }} />
        </div>
    );
};

export default NewsDetail;
