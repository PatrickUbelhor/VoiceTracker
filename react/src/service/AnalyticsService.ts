import { RefinedStats } from '../model/Models';
import { StatsResponse } from '../model/Responses';

export const calculateEntourage = (data: StatsResponse[]): RefinedStats[] => {
	console.log('Calculating Entourage');
	// Calculate average
	let avgGivenTarget = 0;
	let avgGivenOrigin = 0;
	for (let user of data) {
		avgGivenTarget += +user.probOriginGivenTarget;
		avgGivenOrigin += +user.probTargetGivenOrigin;
	}
	avgGivenTarget /= data.length;
	avgGivenOrigin /= data.length;

	// Calculate standard deviation
	let stdDevGivenTarget = 0;
	let stdDevGivenOrigin = 0;
	for (let user of data) {
		stdDevGivenTarget += (+user.probOriginGivenTarget - avgGivenTarget) ** 2;
		stdDevGivenOrigin += (+user.probTargetGivenOrigin - avgGivenOrigin) ** 2;
	}
	stdDevGivenTarget = Math.sqrt(stdDevGivenTarget / data.length);
	stdDevGivenOrigin = Math.sqrt(stdDevGivenOrigin / data.length);

	// Modify and return user data
	return data.map(user => ({
		...user,
		numStdDevGivenTarget: (+user.probOriginGivenTarget - avgGivenTarget) / stdDevGivenTarget,
		numStdDevGivenOrigin: (+user.probTargetGivenOrigin - avgGivenOrigin) / stdDevGivenOrigin
	}));
};
