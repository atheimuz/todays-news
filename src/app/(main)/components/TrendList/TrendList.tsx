"use client";

import TrendItem from "@/app/(main)/components/TrendItem";
import styles from "./TrendList.module.scss";
import { useTrends } from "@/queries/useTrendQuery";

const TrendList = ({ keyword }: { keyword: string | null }) => {
    const { data } = useTrends();

    if ("error" in data) {
        return null;
    }

    return (
        <div>
            <h2 className={styles.pageTitle}>오늘의 트렌드 요약</h2>
            <ul className={styles.trendItems}>
                {data?.map((item) => (
                    <li key={item.name}>
                        <TrendItem {...item} active={item.name === keyword} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrendList;
