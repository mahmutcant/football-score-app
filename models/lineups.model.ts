export interface LineupsModel{
    confirmed: boolean;
    home: TeamDetail;
    away: TeamDetail;
}
export interface TeamDetail{
    players: Player[]
    formation: string;
    playerColor: {
        primary: string;
        number: string;
        outline: string;
        fancyNumber: string;
    };
    goalkeeperColor:{
        primary: string;
        number:string;
        outline:string;
        fancyNumber:string;
    }
}
export interface Player {
    name: string;
    firstName: string;
    slug: string;
    shortName: string;
    position: string;
    jerseyNumber: string;
    userCount: number,
    id: number,
    country: {
        alpha2:string;
        alpha3:string;
        name:string;
    },
    marketValueCurrency:string;
    dateOfBirthTimestamp: number;
    shirtNumber: number;
    substitute: true;
    statistics: {
          totalPass:number;
          accuratePass:number;
          totalLongBalls:number;
          accurateLongBalls:number;
          goalAssist:number;
          totalClearance:number;
          savedShotsFromInsideTheBox:number;
          saves:number;
          punches:number;
          minutesPlayed:number;
          touches:number;
          rating:number;
          possessionLostCtrl:number,
          ratingVersions: {
            original: number;
        };
    }
}