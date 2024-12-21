import { INews } from "@/models/news";
import { getNewsAPI } from "@/remote/news";
import NewsItem from "@/components/NewsItem";
import styles from "./NewsList.module.scss";

const NewsList = async ({ keyword }: { keyword: string | null }) => {
    const data = keyword ? await getNewsAPI(keyword) : null;

    if (!keyword) {
        return null;
    }

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
