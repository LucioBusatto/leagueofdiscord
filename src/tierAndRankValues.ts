import {Division} from "./types";

const tiersValues: any = {
    [Division.IRON]: 0,
    [Division.BRONZE]: 400,
    [Division.SILVER]: 800,
    [Division.GOLD]: 1200,
    [Division.PLATINUM]: 1600,
    [Division.DIAMOND]: 2000,
    [Division.MASTER]: 2400,
    [Division.GRANDMASTER]: 2400,
    [Division.CHALLENGER]: 2400,
}
const ranksValues: any = {"I": 300, "II": 200, "III": 100, "IV": 0}


export function tierValue(tier:Division) {
    return tiersValues[tier];
}

export function rankValue (rank:any) {
    return ranksValues[rank];
}
