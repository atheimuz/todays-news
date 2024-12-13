export const formatRelativeTime = (date: string): string => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime(); // 시간 차이(밀리초)

    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) {
        return `${minutes}분 전`;
    } else if (hours < 24) {
        return `${hours}시간 전`;
    } else if (days < 7) {
        return `${days}일 전`;
    } else {
        const year = new Date(date).getFullYear();
        const month = (new Date(date).getMonth() + 1).toString().padStart(2, "0");
        const day = new Date(date).getDate().toString().padStart(2, "0");
        return `${year}.${month}.${day}`;
    }
};
