export interface Incidents {
    incidents: Incident[];
}

export interface Incident {
    text?: string;
    from: string;
    homeScore?: number;
    awayScore?: number;
    player?: Player;
    playerName?: string;
    reason?: string;
    rescinded?: boolean;
    assist1?: Player;
    id?: number;
    time?: number;
    isHome?: boolean;
    incidentClass?: string;
    reversedPeriodTime?: number;
    incidentType?: string;
    confirmed?: boolean;
    length: number;
    playerIn?: Player;
    playerOut?: Player;
}

export interface Player{
    name?: string;
    firstName?: string;
    lastName?: string;
    slug: string;
    shortName: string;
    position: string;
    jerseyNumber: string;
    userCount: number;
    id: number;
}