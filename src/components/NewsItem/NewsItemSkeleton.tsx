import cx from "classnames";
import Skeleton from "@/components/Skeleton";
import styles from "./NewsItem.module.scss";

interface Props {
    type?: "detail" | "summary";
}
const NewsItemSkeleton = ({ type = "summary" }: Props) => {
    return (
        <div className={cx(styles.wrapper, styles[type])}>
            {type === "detail" && <Skeleton className={styles.thumbnail} />}
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
