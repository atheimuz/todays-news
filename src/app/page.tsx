import { Suspense } from "react";
import NewsList from "@/app/(main)/components/NewsList";
import NewsListSkeleton from "@/app/(main)/components/NewsList/NewsListSkeleton";
import TrendList from "@/app/(main)/components/TrendList";
import TrendListSkeleton from "@/app/(main)/components/TrendList/TrendListSkeleton";
import styles from "./page.module.scss";

export default async function Home({ searchParams }: { searchParams: { keyword?: string } }) {
    const keyword = searchParams.keyword || null;

    return (
        <div className={styles.page}>
            <div className={styles.left}>
                <Suspense fallback={<TrendListSkeleton />}>
                <TrendList keyword={keyword} />
                </Suspense>
                <Suspense key={keyword} fallback={<NewsListSkeleton />}>
                <NewsList keyword={keyword} />
                </Suspense>
            </div>
            <div className={styles.right}>
            </div>
        </div>
    );
}
