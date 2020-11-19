
export interface DayResponse {
	date: string;
	[key: number]: any;
}


export interface HistogramResponse {
	name: string;
	data: number[];
}


export interface StatsResponse {
	origin: string;
	target: string;
	probOrigin: string;
	probTarget: string;
	probJoint: string;
	probOriginGivenTarget: string;
	probTargetGivenOrigin: string;
}
