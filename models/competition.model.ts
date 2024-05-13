export interface CompetitionList{
    events: Events;
}
export interface Events{
    tournament: Tournament;
    homeScore : Score;
    awayScore: Score;
    time: {
        injuryTime1: number,
        injuryTime2: number,
        currentPeriodStartTimestamp: number
    };
    changes: {
        changes: string[];
        changeTimestamp: number
    },
    hasGlobalHighlights: boolean,
    hasEventPlayerStatistics: boolean,
    hasEventPlayerHeatMap: boolean,
    detailId: number,
    crowdsourcingDataDisplayEnabled: boolean,
    id: number,
    crowdsourcingEnabled: boolean,
    startTimestamp: number,
    slug: string,
    finalResultOnly: boolean,
    feedLocked: boolean,
    isEditor: boolean,
    homeTeam: Team;
    awayTeam: Team;
}
export interface Tournament{
    name: string;
    slug: string;
    category: Category;
    uniqueTournament: UniqueTournament;
    priority: number;
    id: number;
    season: Season;
    roundInfo: {
        round: number;
    };
    customId: string;
    status: Status;
    winnerCode: number;
}

export interface Sport{
    name: string;
    slug: string;
    id: number;
}

export interface Category{
    name: string;
    slug: string;
    sport: Sport;
    id: number;
    country: Country;
    flag: string;
    alpha2: string;
}
export interface Country{
    alpha2: string;
    alpha3: string;
    name: string;
}

export interface UniqueTournament{
    name: string;
    slug: string;
    category: Category;
}

export interface Season{
    name: string;
    year: string;
    editor: boolean;
    id: number;
}

export interface Status{
    code: number;
    description: string;
    type: string;
}

export interface Team{
    name: string;
    slug: string;
    shortName: string;
    sport: Sport;
    userCount: number;
    nameCode: string;
    disabled: boolean;
    national: boolean;
    type: 0;
    id: number;
    country: Country;
    subTeams: Object[];
    teamColors: {
        primary: string,
        secondary: string,
        text: string
    }
    fieldTranslations: {
        nameTranslation: {
            ar: string,
            ru: string
        },
        shortNameTranslation: {}
    }
}

export interface Score{
    current: number,
    display: number,
    period1: number,
    period2: number,
    normaltime: number;
}
