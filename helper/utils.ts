export const getTodayDate = () => {
    const today = new Date();
    const day = today.getDate() + 1;
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return {day,month,year};
};

export const convertEpochToDate = (unix_timestamp: number) => {
    const date = new Date((unix_timestamp + 10800) * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    const formattedMinutes = minutes.slice(-2);

    return {
        day: day,
        month: month,
        year: year,
        hours: hours,
        minutes: formattedMinutes,
    };
};
