const baseUrl = 'https://www.sofascore.com/api/v1/sport';
import axios from 'axios';
import { Events } from '../models/competition.model';
export const getMatchList = async (): Promise<Events[]> => {
    try {
        const response = await axios.get(`${baseUrl}/football/scheduled-events/2024-05-15`);
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
}
