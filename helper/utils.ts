import { Events, Time } from "../models/competition.model";
export interface DateInformation{
    day:number;
    month:number;
    year:number;
}
export interface StartTimeModel{
    day:number;
    month:number;
    year:number;
    hours: number,
    minutes: string,
}
export const getTodayDate = (): DateInformation => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return {day,month,year};
};

export const convertEpochToDate = (unix_timestamp: number):StartTimeModel => {
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

const leagueOrderByCountry = [46,1,32,31,30,7];
export const compareByLeagueOrder = (events: Events[]) => {
    return events.sort((a, b) => {
        const indexA = leagueOrderByCountry.indexOf(a.tournament.category.id);
        const indexB = leagueOrderByCountry.indexOf(b.tournament.category.id);
        if (indexA && indexA === -1) return 1;
        if (indexB && indexB === -1) return -1;
        return indexA - indexB;
    });
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
    if(statusCode === 100 || statusCode === 60 || statusCode === 0){
        return false;
    }
    return true;
};

export const playerColorByRatio = (value:number | any):string => {
    if(value < 5){
        return 'red'
    }else if(value < 6.9){
        return '#ED7E07'
    }
    else if(value < 8){
        return '#00C424'
    }
    else if(value < 9){
        return '#00ADC4'
    }
    else{
        return 'blue'
    }
}
