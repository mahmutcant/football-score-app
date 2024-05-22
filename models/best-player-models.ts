export interface BestPlayersSummary{
    bestHomeTeamPlayers: BestPlayer[];
    bestAwayTeamPlayers: BestPlayer[];
}

export interface BestPlayer{
    value: string;
    label: string;
    player: Player;
}

export interface Player{
    name: string,
    slug: string,
    shortName: string,
    position: string,
    jerseyNumber: string,
    userCount: number,
    id: number,
    marketValueCurrency: string,
    dateOfBirthTimestamp: number,
    fieldTranslations: {
        nameTranslation: {
        ar: string
        },
        shortNameTranslation: {
        ar: string;
        }
    }
}