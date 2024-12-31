"use client";

import { INews } from "@/models/news";
import { formatRelativeTime } from "@/utils/date";
import { useNewsStore } from "@/store/news";
import styles from "./NewsItem.module.scss";

const NewsItem = (props: INews) => {
    const { thumbnail, title, date } = props;
    const setNewsDetail = useNewsStore((state) => state.setNewsDetail);

    return (
        <div className={styles.wrapper} tabIndex={0} onClick={() => setNewsDetail(props)}>
            {thumbnail && <img src={thumbnail} className={styles.thumbnail} alt="뉴스 썸네일" />}
            <div className={styles.textWrapper}>
                <div className={styles.titleWrapper}>
                    <p className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
                </div>
                {date && <span className={styles.date}>{formatRelativeTime(date)}</span>}
            </div>
        </div>
    );
};

export default NewsItem;
