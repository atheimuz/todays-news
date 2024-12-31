"use client";

import { useNewsStore } from "@/store/news";
import { useNews } from "@/queries/useNewsQuery";
import NewsDetailSkeleton from "./NewsDetailSkeleton";
import styles from "./NewsDetail.module.scss";

const NewsDetail = () => {
    const detailInfo = useNewsStore((state) => state.detail);
    const { data, isFetching } = useNews(detailInfo?.link);

    if (!detailInfo) return null;

    return (
        <div className={styles.wrapper}>
            <div dangerouslySetInnerHTML={{ __html: data }} />
        </div>
    );
};

export default NewsDetail;
