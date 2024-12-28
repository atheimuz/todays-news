"use client";

import { useNewsStore } from "@/store/news";
import styles from "./NewsDetail.module.scss";

const NewsDetail = () => {
    const newsLink = useNewsStore((state) => state.newsLink);

    if (!newsLink) return null;

    return (
        <div className={styles.wrapper}>
            {newsLink && <iframe className={styles.iframe} src={newsLink} />}
        </div>
    );
};

export default NewsDetail;
