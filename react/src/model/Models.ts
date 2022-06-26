import { StatsResponse } from './Responses';

export interface RefinedStats extends StatsResponse {
	numStdDevGivenTarget: number;
	numStdDevGivenOrigin: number;
}
