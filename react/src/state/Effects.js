import {
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
