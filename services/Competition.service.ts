const baseUrl = 'https://www.sofascore.com/api/v1/sport';
import axios from 'axios';
import { Events } from '../models/competition.model';
import { DateInformation } from '../helper/utils';
export const getMatchList = async (todayDate:DateInformation): Promise<Events[]> => {
    try {
        const response = await axios.
        get(`${baseUrl}/football/scheduled-events/${todayDate.year + "-" + (todayDate.month < 10 ? "0" + todayDate.month : todayDate.month) + "-" + todayDate.day}`);
        return response.data.events;
    } catch (error) {
        throw error;
    }
};

export const getLiveMatchList = async(): Promise<Events[]> => {

    try {
        const response = await axios.get('https://www.sofascore.com/api/v1/sport/football/events/live');
        return response.data.events;
    } catch (error) {
        throw error;
    }
};

export const getTeamIcon = (teamId:number): string => {
    return `https://api.sofascore.app/api/v1/team/${teamId}/image/small`;
};
