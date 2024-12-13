"use client";

import { useRouter } from "next/navigation";
import cx from "classnames";
import { ITrend } from "@/models/trend";
import styles from "./TrendItem.module.scss";

interface Props extends ITrend {
    active: boolean;
}
const TrendItem = ({ name, score, active }: Props) => {
    const router = useRouter();

    const onSelectKeyword = (value: string) => {
        router.replace(`?keyword=${value}`);
    };

    return (
        <button
            type="button"
            className={cx(styles.wrapper, {
                [styles.active]: active
            })}
            onClick={() => onSelectKeyword(name)}
        >
            {name}
            {score >= 10000 ? "🔥" : ""}
        </button>
    );
};

export default TrendItem;
