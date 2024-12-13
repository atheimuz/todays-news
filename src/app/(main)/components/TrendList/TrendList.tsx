"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import cx from "classnames";
import { ITrend } from "@/models/trend";
import NewsItem from "@/components/NewsItem";
import styles from "./TrendList.module.scss";

const TrendList = ({
    data,
    keyword
}: {
    data: ITrend[] | { error: string };
    keyword: string | null;
}) => {
    const router = useRouter();
    const selectedIndex = useMemo(() => {
        if (Array.isArray(data)) {
            const index = data.findIndex((item) => item.name === keyword);
            return index > -1 ? index : 0;
        }

        return 0;
    }, [data, keyword]);

    const onSelectKeyword = (value: string) => {
        router.replace(`?keyword=${value}`);
    };

    if ("error" in data) {
        return null;
    }

    return (
        <div>
            <h2 className={styles.pageTitle}>오늘의 트렌드 요약</h2>
            <ul className={styles.trendItems}>
                {data?.map((item) => (
                    <li key={item.name}>
                        <button
                            type="button"
                            className={cx(styles.trendItem, {
                                [styles.active]: keyword === item.name
                            })}
                            onClick={() => onSelectKeyword(item.name)}
                        >
                            {item.name}
                            {item.score >= 10000 ? "🔥" : ""}
                        </button>
                    </li>
                ))}
            </ul>
            <ul className={styles.newsItems}>
                {data?.[selectedIndex]?.news?.map((item, itemIndex) => (
                    <li className={styles.newsItem} key={itemIndex}>
                        <NewsItem type="detail" {...item} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrendList;
