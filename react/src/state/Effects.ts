import tracker from '../api/Tracker';
import { HistogramState } from '../model/States';
import { Themes } from '../model/Themes';
import {
	getAnalyticsSuccess,
	getDaysSuccess,
	getHistogramsSuccess,
	getUsersSuccess,
	setError,
	setFiltersSuccess,
	setThemeSuccess
} from './Actions';


export const initApp = () => async (dispatch) => {
	const theme: Themes = localStorage.getItem('theme') as Themes;
	if (theme) {
		dispatch(setThemeSuccess(theme));
	}

	const filters = localStorage.getItem('filters');
	if (filters) {
		dispatch(setFiltersSuccess(JSON.parse(filters)));
	}
};

export const setTheme = (theme: Themes) => async (dispatch, getState) => {
	const from = getState().theme;
	const to = theme;

	document.body.classList.replace(from, to);
	localStorage.setItem('theme', to);
	dispatch(setThemeSuccess(to));
};

export const setFilters = (filters: string[]) => async (dispatch) => {
	localStorage.setItem('filters', JSON.stringify(filters));
	dispatch(setFiltersSuccess(filters));
};


const handleError = (error: any, message: string, dispatch) => {
	if (error.response === undefined) {
		console.log('An unknown error has occurred');
		dispatch(setError(message));
		return;
	}

	console.log(error.response);
	dispatch(setError(message));
};


export const getDays = (newestDay: number, oldestDay: number) => async (dispatch) => {
	console.log('Getting days');

	try {
		let response = await tracker.getDays(newestDay, oldestDay);
		dispatch(getDaysSuccess(response.data));
	} catch (error) {
		handleError(error, 'Something went wrong getting the days/timelines', dispatch);
	}
};

export const getUsers = () => async (dispatch) => {
	console.log('Getting users');

	try {
		let response = await tracker.getUsers();
		dispatch(getUsersSuccess(response.data));
	} catch (error) {
		handleError(error, 'Something went wrong getting the list of users', dispatch);
	}
};

export const getHistograms = (numDays: number, minActiveDays: number) => async (dispatch) => {
	console.log('Getting histograms');

	try {
		let response = await tracker.getHistograms(numDays, minActiveDays);
		const histograms: HistogramState = {
			items: response.data,
			numDays: numDays,
		};
		dispatch(getHistogramsSuccess(histograms));
	} catch (error) {
		handleError(error, 'Something went wrong getting histograms', dispatch);
	}
};

export const getAnalytics = (numDays: number, username: string) => async (dispatch) => {
	console.log('Getting analytics');

	try {
		const response = await tracker.getAnalytics(numDays, username);
		console.log(response.data);
		dispatch(getAnalyticsSuccess(response.data));
	} catch (error) {
		handleError(error, 'Something went wrong getting the analytics', dispatch);
	}
};
