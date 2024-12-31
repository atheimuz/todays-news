import Skeleton from "@/components/Skeleton";
import styles from "./NewsDetail.module.scss";

const NewsDetailSkeleton = () => {
    return (
        <p>
            {new Array(8).fill(0).map((_, index) => (
                <Skeleton key={index} />
            ))}
        </p>
    );
};

export default NewsDetailSkeleton;
