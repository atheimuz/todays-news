import { useMemo } from "react";
import { ITrend } from "@/models/trend";
import NewsItem from "@/components/NewsItem";
import TrendItem from "@/app/(main)/components/TrendItem";
import styles from "./TrendList.module.scss";

const TrendList = ({
    data,
    keyword
}: {
    data: ITrend[] | { error: string };
    keyword: string | null;
}) => {
    const selectedIndex = useMemo(() => {
        if (Array.isArray(data)) {
            const index = data.findIndex((item) => item.name === keyword);
            return index > -1 ? index : 0;
        }

        return 0;
    }, [data, keyword]);

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
