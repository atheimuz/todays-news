import { getTrendsAPI } from "@/remote/trend";
import NewsList from "./(main)/components/NewsList";
import TrendList from "./(main)/components/TrendList";
import styles from "./page.module.scss";

export default async function Home({ searchParams }: { searchParams: { keyword?: string } }) {
    const keyword = searchParams.keyword || null;
    const data = await getTrendsAPI();

    return (
        <div className={styles.page}>
            <div className={styles.left}>
                <TrendList data={data} keyword={keyword} />
            </div>
            <div className={styles.right}>
                <NewsList keyword={keyword} />
            </div>
        </div>
    );
}
