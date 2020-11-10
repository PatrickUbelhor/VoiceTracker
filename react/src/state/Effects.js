import tracker from '../api/Tracker';
import {
	getAnalyticsSuccess,
	getDaysSuccess,
	getHistogramsSuccess,
	getUsersSuccess,
	setError,
	setFiltersSuccess,
	setThemeSuccess
} from './Actions';
import { calculateEntourage } from '../service/AnalyticsService';

export const initApp = () => async (dispatch) => {
	const theme = localStorage.getItem('theme');
	if (theme) {
		dispatch(setThemeSuccess(theme));
	}

	const filters = localStorage.getItem('filters');
	if (filters) {
		dispatch(setFiltersSuccess(JSON.parse(filters)));
	}
};

export const setTheme = (theme) => async (dispatch, getState) => {
	const from = getState().theme;
	const to = theme;

	document.body.classList.replace(from, to);
	localStorage.setItem('theme', to);
	dispatch(setThemeSuccess(to));
};

export const setFilters = (filters) => async (dispatch) => {
	localStorage.setItem('filters', JSON.stringify(filters));
	dispatch(setFiltersSuccess(filters));
};


const handleError = (error, message, dispatch) => {
	if (error.response === undefined) {
		console.log('An unknown error has occurred');
		dispatch(setError(message));
		return;
	}

	console.log(error.response);
	dispatch(setError(message));
};


export const getDays = (newestDay, oldestDay) => async (dispatch) => {
	console.log('Getting days');

	try {
		let response = await tracker.getDays(newestDay, oldestDay);
		dispatch(getDaysSuccess(response.data));
	} catch (error) {
		handleError(error, 'Something went wrong getting the days/timelines');
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

export const getHistograms = (numDays, minActiveDays) => async (dispatch) => {
	console.log('Getting histograms');

	try {
		let response = await tracker.getHistograms(numDays, minActiveDays);
		const histograms = {
			items: response.data,
			numDays: numDays,
			minActiveDays: minActiveDays
		};
		dispatch(getHistogramsSuccess(histograms));
	} catch (error) {
		handleError(error, 'Something went wrong getting histograms', dispatch);
	}
};

export const getAnalytics = (numDays, username) => async (dispatch) => {
	console.log('Getting analytics');

	try {
		const response = await tracker.getAnalytics(numDays, username);
		// const modified = calculateEntourage(response.data);
		// dispatch(getAnalyticsSuccess(modified));
		dispatch(getAnalyticsSuccess(response.data))
	} catch (error) {
		handleError(error, 'Something went wrong getting the analytics', dispatch);
	}
}
