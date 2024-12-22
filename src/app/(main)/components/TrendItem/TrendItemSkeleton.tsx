import Skeleton from "@/components/Skeleton";
import styles from "./TrendItem.module.scss";

const TrendItemSkeleton = () => {
    return (
        <div className={`${styles.wrapper} ${styles.skeleton}`}>
            <Skeleton />
        </div>
    );
};

export default TrendItemSkeleton;
