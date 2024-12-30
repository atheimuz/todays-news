import Skeleton from "@/components/Skeleton";
import styles from "./NewsDetail.module.scss";

const NewsDetailSkeleton = () => {
    return (
        <div className={styles.wrapper}>
            <p>
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </p>
        </div>
    );
};

export default NewsDetailSkeleton;
