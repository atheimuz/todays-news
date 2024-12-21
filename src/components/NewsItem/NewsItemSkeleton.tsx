import Skeleton from "@/components/Skeleton";
import styles from "./NewsItem.module.scss";

const NewsItemSkeleton = () => {
    return (
        <div className={styles.wrapper}>
            <Skeleton className={styles.thumbnail} />
            <div className={styles.textWrapper}>
                <div className={styles.titleWrapper}>
                    <Skeleton />
                </div>
                <span className={styles.date}>
                    <Skeleton width="20%" />
                </span>
            </div>
        </div>
    );
};

export default NewsItemSkeleton;
