import { DayResponse, HistogramResponse, StatsResponse } from './Responses';

export interface AppState {
	theme: string;
	errorMessage: string;
	filters: Set<string>;
	users: string[];
	days: DayResponse[];
	histograms: HistogramState;
	analytics: StatsResponse[];
}


export interface HistogramState {
	items: HistogramResponse[];
	numDays: number;
	minActiveDays: number;
}
