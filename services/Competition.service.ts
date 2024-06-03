const baseUrl = 'https://www.sofascore.com/api/v1/sport';
import axios from 'axios';
import { Events } from '../models/competition.model';
import { DateInformation } from '../helper/utils';
import { BestPlayer, BestPlayersSummary } from '../models/best-player-models';
import { Incidents } from '../models/incidents-model';
export const getMatchList = async (todayDate:DateInformation): Promise<Events[]> => {
    try {
        const response = await axios.
        get(`${baseUrl}/football/scheduled-events/${todayDate.year + "-" + (todayDate.month < 10 ? "0" + todayDate.month : todayDate.month) + "-" + (todayDate.day < 10 ? "0" + todayDate.day : todayDate.day)}`);
        return response.data.events;
    } catch (error) {
        throw error;
    }
};

export const getLiveMatchList = async(): Promise<Events[]> => {

    try {
        const response = await axios.get(`https://www.sofascore.com/api/v1/sport/football/events/live`);
        return response.data.events;
    } catch (error) {
        throw error;
    }
};

export const getTeamIcon = (teamId:number | undefined): string|undefined => {
    if(teamId){
        return `https://api.sofascore.app/api/v1/team/${teamId}/image`;
    }
};

export const getSelectedCompetitionDetail = async(competitionId:number) : Promise<Events> => {
    try{
        const response = await axios.get(`https://www.sofascore.com/api/v1/event/${competitionId}`)
        return response.data.event;
    }catch (error){
        throw error;
    }
}

export const getBestPlayers = async(eventId:number) : Promise<BestPlayersSummary> => {
    try{
        const response = await axios.get(`https://www.sofascore.com/api/v1/event/${eventId}/best-players/summary`)
        return response.data;
    }catch (error){
        throw error;
    }
}

export const getIncidents = async(eventId: number) : Promise<Incidents> => {
    try{
        const response = await axios.get(`https://www.sofascore.com/api/v1/event/${eventId}/incidents`)
        return response.data;
    }catch(error){
        throw error;
    }
}