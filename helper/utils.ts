import { Events, Time } from "../models/competition.model";

export const getTodayDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return {day,month,year};
};

export const convertEpochToDate = (unix_timestamp: number) => {
    const date = new Date((unix_timestamp) * 1000);
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

const leagueOrder = ['trendyol-super-lig','premier-league', 'laliga','serie-a', 'bundesliga','ligue-1'];

export const compareByLeagueOrder = (a:Events, b:Events) => {
    const indexA = leagueOrder.indexOf(a.tournament.slug);
    const indexB = leagueOrder.indexOf(b.tournament.slug);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
};

export const getStatusByCode = (event:Events) => {
    switch(event.status.code){
        case 100:
            return 'MS';
        case 31:
            return 'IY';
        case 6:
            return getMatchMinutesInfo(event.time, event.lastPeriod);
        case 7:
            return getMatchMinutesInfo(event.time, event.lastPeriod);
        case 60:
            return 'ERT';
    }
};

export const isCompetitionLive = (statusCode:number) => {
    if(statusCode === 100 || statusCode === 60){
        return false;
    }
    return true;
};
