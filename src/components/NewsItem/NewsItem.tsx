import Link from "next/link";
import cx from "classnames";
import { INews } from "@/models/news";
import { formatRelativeTime } from "@/utils/date";
import styles from "./NewsItem.module.scss";

interface Props extends INews {
    type?: "detail" | "summary";
}
const NewsItem = ({ type = "summary", thumbnail, title, date }: Props) => {
    return (
        <Link href="/" className={cx(styles.wrapper, styles[type])}>
            {type === "detail" && (
                <img src={thumbnail} className={styles.thumbnail} alt="뉴스 썸네일" />
            )}
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
