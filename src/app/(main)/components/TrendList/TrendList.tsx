"use client";

import { useState } from "react";
import cx from "classnames";
import { ITrend } from "@/models/trend";
import NewsItem from "@/components/NewsItem";
import styles from "./TrendList.module.scss";

const TrendList = ({ data }: { data: ITrend[] | { error: string } }) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    if ("error" in data) {
        return null;
    }

    return (
        <div>
            <h2 className={styles.pageTitle}>오늘의 트렌드 요약</h2>
            <ul className={styles.trendItems}>
                {data?.map((item: ITrend, itemIndex: number) => (
                    <li key={item.name}>
                        <button
                            type="button"
                            className={cx(styles.trendItem, {
                                [styles.active]: itemIndex === selectedIndex
                            })}
                            onClick={() => setSelectedIndex(itemIndex)}
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
