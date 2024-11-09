import styles from "./page.module.scss";
import { getTrendsAPI } from "@/remote/trend";
import TrendList from "./(main)/components/TrendList";

export default async function Home() {
    const data = await getTrendsAPI();

    return (
        <div className={styles.page}>
            <div className={styles.left}></div>
            <div className={styles.right}>
                <TrendList data={data} />
            </div>
        </div>
    );
}
