"use client";

import { useEffect, useState } from "react";
import { getTrendsAPI } from "@/remote/trend";
import { ITrend } from "@/models/trend";
import TrendItem from "@/app/(main)/components/TrendItem";
import styles from "./TrendList.module.scss";

const TrendList = ({ keyword }: { keyword: string | null }) => {
    const [data, setData] = useState<ITrend[] | { error: string } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getTrendsAPI();
            if (!("error" in result)) {
                setData(result);
            }
        };
        fetchData();
    }, []);

    if (!data) return null;

    if ("error" in data) {
        return null;
    }

    return (
        <div>
            <h2 className={styles.pageTitle}>오늘의 트렌드 요약</h2>
            <ul className={styles.trendItems}>
                {data?.map((item, itemIndex) => (
                    <li key={item.name}>
                        <TrendItem
                            {...item}
                            active={keyword ? item.name === keyword : itemIndex === 0}
                        />
                    </li>
                ))}
            </ul>
            <ul className={styles.newsItems}>
                {data?.map((item, itemIndex) => {
                    const isSelected = keyword ? keyword === item.name : itemIndex === 0;
                    if (!isSelected) return null;

                    return item.news.map((news) => (
                        <li className={styles.newsItem} key={news.link}>
                            <NewsItem {...news} />
                        </li>
                    ));
                })}
            </ul>
        </div>
    );
};

export default TrendList;
