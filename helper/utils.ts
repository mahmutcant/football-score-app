import { Time } from "../models/competition.model";

export const getTodayDate = () => {
    const today = new Date();
    const day = today.getDate();
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

export const getMatchMinutesInfo = (currentPeriodStartTimestamp:Time, lastPeriod:string) => {
    const currentTime = Date.now() / 1000;
    const elapsedTime = currentTime - currentPeriodStartTimestamp.currentPeriodStartTimestamp;
    const elapsedTimeMinutes = Math.floor(elapsedTime / 60);
    if(lastPeriod === 'period2'){
        return elapsedTimeMinutes + 45 > 90 ? '90+' : elapsedTimeMinutes + 46;
    }
    return elapsedTimeMinutes >= 45 ? '45+' : elapsedTimeMinutes;
  };