"use client";

import { INews } from "@/models/news";
import { formatRelativeTime } from "@/utils/date";
import { useNewsStore } from "@/store/news";
import styles from "./NewsItem.module.scss";

const NewsItem = ({ thumbnail, title, date, link }: INews) => {
    const setNewsLink = useNewsStore((state) => state.setNewsLink);

    return (
        <div className={styles.wrapper} tabIndex={0} onClick={() => setNewsLink(link)}>
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
