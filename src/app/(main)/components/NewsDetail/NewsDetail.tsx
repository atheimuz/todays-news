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
            <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: detailInfo.title }} />
            <p className={styles.date}>{detailInfo.date}</p>
            <div className={styles.content}>
                {isFetching ? (
                    <NewsDetailSkeleton />
                ) : data ? (
                    <div dangerouslySetInnerHTML={{ __html: data }} />
                ) : (
                    <>
                        {detailInfo.thumbnail && (
                            <img className={styles.thumbnail} src={detailInfo.thumbnail} />
                        )}
                        <div dangerouslySetInnerHTML={{ __html: detailInfo.description }} />
                    </>
                )}
            </div>
            <a className={styles.link} href={detailInfo.link} target="_blank">
                뉴스 원본 링크
            </a>
        </div>
    );
};

export default NewsDetail;
