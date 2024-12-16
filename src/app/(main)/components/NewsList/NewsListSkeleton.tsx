import NewsItemSkeleton from "@/components/NewsItem/NewsItemSkeleton";
import styles from "./NewsList.module.scss";

const NewsListSkeleton = () => {
    return (
        <ul className={styles.newsItems}>
            {new Array(6).fill(0).map((_, itemIndex) => (
                <li className={styles.newsItem} key={itemIndex}>
                    <NewsItemSkeleton />
                </li>
            ))}
        </ul>
    );
};

export default NewsListSkeleton;
