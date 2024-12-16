import cx from "classnames";
import styles from "./Skeleton.module.scss";

interface Props {
    className?: string;
    width?: string;
}
const Skeleton = ({ className, width, ...rest }: Props) => {
    return (
        <span className={cx(styles.wrapper, className)} style={{ width }} {...rest}>
            <span className={styles.inner} />
        </span>
    );
};

export default Skeleton;
