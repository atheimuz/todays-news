import { getTrendsAPI } from "@/remote/trend";
import NewsItem from "@/components/NewsItem";
import TrendItem from "@/app/(main)/components/TrendItem";
import styles from "./TrendList.module.scss";

const TrendList = async ({ keyword }: { keyword: string | null }) => {
    const data = await getTrendsAPI();

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
                            <NewsItem type="detail" {...news} />
                        </li>
                    ));
                })}
            </ul>
        </div>
    );
};

export default TrendList;
