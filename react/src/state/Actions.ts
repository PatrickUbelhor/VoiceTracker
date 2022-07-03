import { DayResponse, StatsResponse } from '../model/Responses';
import { HistogramState } from '../model/States';
import { Themes } from '../model/Themes';

export interface Action {
	type: Actions;
	payload?: any
}

export enum Actions {
	SET_ERROR = '[ERROR] Set error msg',
	CLEAR_ERROR = '[ERROR] Clear error msg',
	SET_THEME_SUCCESS = '[THEME] Set theme',

	SET_FILTERS_SUCCESS = '[FILTER] Successfully set filters',

	GET_DAYS_SUCCESS = '[DAYS] Successfully got days',
	GET_USERS_SUCCESS = '[USERS] Successfully got users',
	GET_HISTOGRAMS_SUCCESS = '[HISTOGRAM] Successfully got histograms',
	GET_ANALYTICS_SUCCESS = '[ANALYTICS] Successfully got analytics'
}


export const setError = (message: string): Action => ({
	type: Actions.SET_ERROR,
	payload: message
});

export const clearError = () => ({
	type: Actions.CLEAR_ERROR
});

export const setThemeSuccess = (theme: Themes): Action => ({
	type: Actions.SET_THEME_SUCCESS,
	payload: theme
});

export const setFiltersSuccess = (excluded: string[]): Action => ({
	type: Actions.SET_FILTERS_SUCCESS,
	payload: excluded
});

export const getDaysSuccess = (days: DayResponse[]): Action => ({
	type: Actions.GET_DAYS_SUCCESS,
	payload: days
})

export const getUsersSuccess = (users: string[]): Action => ({
	type: Actions.GET_USERS_SUCCESS,
	payload: users
});

export const getHistogramsSuccess = (histograms: HistogramState): Action => ({
	type: Actions.GET_HISTOGRAMS_SUCCESS,
	payload: histograms
});

export const getAnalyticsSuccess = (analytics: StatsResponse[]): Action => ({
	type: Actions.GET_ANALYTICS_SUCCESS,
	payload: analytics
});
