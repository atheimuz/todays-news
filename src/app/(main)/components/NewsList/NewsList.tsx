import NewsItem from "@/components/NewsItem";
import { INews } from "@/models/news";
import { getNewsAPI } from "@/remote/news";
import styles from "./NewsList.module.scss";

const NewsList = async ({ keyword }: { keyword: string | null }) => {
    const data = keyword ? await getNewsAPI(keyword) : null;

    if (!keyword) {
        return null;
    }

    return (
        <ul className={styles.newsItems}>
            {data?.map((item: INews) => (
                <li className={styles.newsItem} key={item.title}>
                    <NewsItem {...item} />
                </li>
            ))}
        </ul>
    );
};

export default NewsList;
