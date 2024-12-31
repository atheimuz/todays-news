export const formatRelativeTime = (date: string): string => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime(); // 시간 차이(밀리초)

    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes === 0) {
        return "방금 전";
    }
    if (minutes < 60) {
        return `${minutes}분 전`;
    }
    if (hours < 24) {
        return `${hours}시간 전`;
    }
    if (days < 7) {
        return `${days}일 전`;
    } else {
        const year = new Date(date).getFullYear();
        const month = (new Date(date).getMonth() + 1).toString().padStart(2, "0");
        const day = new Date(date).getDate().toString().padStart(2, "0");
        return `${year}.${month}.${day}`;
    }
};

export const formatDate = (_date: string): string => {
    const date = new Date(_date);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
};
