"use client";

import { Sheet } from "react-modal-sheet";
import { useNewsStore } from "@/store/news";
import { useNews } from "@/queries/useNewsQuery";
import { formatDate } from "@/utils/date";
import NewsDetailSkeleton from "./NewsDetailSkeleton";
import styles from "./NewsDetail.module.scss";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const setNewsDetail = useNewsStore((state) => state.setNewsDetail);
    const isMobile = window.innerWidth < 768;

    const onClose = () => {
        setNewsDetail(null);
    };

    if (!isMobile) return children;
    return (
        <Sheet isOpen onClose={onClose}>
            <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>{children}</Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop onTap={onClose} />
        </Sheet>
    );
};

const NewsDetail = () => {
    const detailInfo = useNewsStore((state) => state.detail);
    const { data, isFetching } = useNews(detailInfo?.link);

    if (!detailInfo) return null;

    return (
        <Wrapper>
            <div className={styles.wrapper}>
                <h2
                    className={styles.title}
                    dangerouslySetInnerHTML={{ __html: detailInfo.title }}
                />
                <p className={styles.date}>{formatDate(detailInfo.date)}</p>
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
        </Wrapper>
    );
};

export default NewsDetail;
