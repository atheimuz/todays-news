import { Suspense } from "react";
import TrendList from "@/app/(main)/components/TrendList";
import TrendListSkeleton from "@/app/(main)/components/TrendList/TrendListSkeleton";
import NewsDetail from "@/app/(main)/components/NewsDetail";
import styles from "./page.module.scss";

export default function Home() {
    return (
        <div className={styles.page}>
            <div className={styles.left}>
                <Suspense fallback={<TrendListSkeleton />}>
                    <TrendList />
                </Suspense>
            </div>
            <div className={styles.right}>
                <NewsDetail />
            </div>
        </div>
    );
}
