"use client";

import { INews } from "@/models/news";
import { useNewsList } from "@/queries/useNewsQuery";
import NewsItem from "@/components/NewsItem";
import styles from "./NewsList.module.scss";

const NewsList = ({ keyword }: { keyword: string }) => {
    const { data } = useNewsList(keyword);

    return (
        <div className={styles.wrapper}>
            <ul className={styles.newsItems}>
                {data?.map((item: INews) => (
                    <li className={styles.newsItem} key={item.link}>
                        <NewsItem {...item} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsList;
