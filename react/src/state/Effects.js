import tracker from '../api/Tracker';
import {
	getHistogramsSuccess,
	getUsersSuccess,
	setError,
	setThemeSuccess
} from './Actions';

export const initApp = () => async (dispatch) => {
	const theme = localStorage.getItem('theme');
	if (theme) {
		dispatch(setThemeSuccess(theme));
	}
}

export const setTheme = (theme) => async (dispatch, getState) => {
	const from = getState().theme;
	const to = theme;

	document.body.classList.replace(from, to);
	localStorage.setItem('theme', to);
	dispatch(setThemeSuccess(to));
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
