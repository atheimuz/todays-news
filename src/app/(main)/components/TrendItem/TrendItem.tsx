"use client";

import cx from "classnames";
import { ITrend } from "@/models/trend";
import styles from "./TrendItem.module.scss";

interface Props extends ITrend {
    active: boolean;
    setKeyword: (value: string) => void;
}
const TrendItem = ({ name, score, active, setKeyword }: Props) => {
    return (
        <button
            type="button"
            className={cx(styles.wrapper, {
                [styles.active]: active
            })}
            onClick={() => setKeyword(name)}
        >
            {name}
            {score >= 10000 ? "🔥" : ""}
        </button>
    );
};

export default TrendItem;
