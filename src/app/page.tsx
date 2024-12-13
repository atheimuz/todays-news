import NewsList from "@/app/(main)/components/NewsList";
import TrendList from "@/app/(main)/components/TrendList";
import styles from "./page.module.scss";

export default async function Home({ searchParams }: { searchParams: { keyword?: string } }) {
    const keyword = searchParams.keyword || null;

    return (
        <div className={styles.page}>
            <div className={styles.left}>
                <TrendList keyword={keyword} />
            </div>
            <div className={styles.right}>
                <NewsList keyword={keyword} />
            </div>
        </div>
    );
}
