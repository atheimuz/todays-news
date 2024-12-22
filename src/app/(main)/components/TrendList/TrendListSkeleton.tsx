import TrendItemSkeleton from "@/app/(main)/components/TrendItem/TrendItemSkeleton";
import styles from "./TrendList.module.scss";

const TrendListSkeleton = () => {
    return (
        <div>
            <h2 className={styles.pageTitle}>오늘의 트렌드 요약</h2>
            <ul className={styles.trendItems}>
                {new Array(20).fill(0).map((_, itemIndex) => (
                    <li key={itemIndex}>
                        <TrendItemSkeleton />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrendListSkeleton;
