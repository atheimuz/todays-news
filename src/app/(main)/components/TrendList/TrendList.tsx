"use client";

import { useState, Suspense } from "react";
import { useTrends } from "@/queries/useTrendQuery";
import TrendItem from "@/app/(main)/components/TrendItem";
import NewsList from "@/app/(main)/components/NewsList";
import NewsListSkeleton from "@/app/(main)/components/NewsList/NewsListSkeleton";
import styles from "./TrendList.module.scss";

const TrendList = () => {
    const { data } = useTrends();
    const [keyword, setKeyword] = useState<string | null>(null);

    if ("error" in data) {
        return null;
    }

    return (
        <div>
            <h2 className={styles.pageTitle}>오늘의 트렌드 요약</h2>
            <ul className={styles.trendItems}>
                {data?.map((item) => (
                    <li key={item.name}>
                        <TrendItem
                            {...item}
                            active={item.name === keyword}
                            setKeyword={setKeyword}
                        />
                    </li>
                ))}
            </ul>

            {keyword && (
                <Suspense key={keyword} fallback={<NewsListSkeleton />}>
                    <NewsList keyword={keyword} />
                </Suspense>
            )}
        </div>
    );
};

export default TrendList;
