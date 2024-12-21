import Link from "next/link";
import { INews } from "@/models/news";
import { formatRelativeTime } from "@/utils/date";
import styles from "./NewsItem.module.scss";

const NewsItem = ({ thumbnail, title, date }: INews) => {
    return (
        <Link href="/" className={styles.wrapper}>
            {thumbnail && <img src={thumbnail} className={styles.thumbnail} alt="뉴스 썸네일" />}
            <div className={styles.textWrapper}>
                <div className={styles.titleWrapper}>
                    <p className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
                </div>
                {date && <span className={styles.date}>{formatRelativeTime(date)}</span>}
            </div>
        </Link>
    );
};

export default NewsItem;
