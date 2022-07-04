import { DayResponse, HistogramResponse, StatsResponse } from './Responses';
import { Themes } from './Themes';

export interface AppState {
	theme: Themes;
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
}
