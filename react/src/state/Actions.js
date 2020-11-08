
export const Actions = {
	SET_ERROR: '[ERROR] Set error msg',
	CLEAR_ERROR: '[ERROR] Clear error msg',
	SET_THEME_SUCCESS: '[THEME] Set theme',

	SET_FILTERS_SUCCESS: '[FILTER] Successfully set filters',

	GET_USERS_SUCCESS: '[USERS] Successfully got users',
	GET_HISTOGRAMS_SUCCESS: '[HISTOGRAM] Successfully got histograms'
};


export const setError = (message) => ({
	type: Actions.SET_ERROR,
	payload: message
});

export const clearError = () => ({
	type: Actions.CLEAR_ERROR
});

export const setThemeSuccess = (theme) => ({
	type: Actions.SET_THEME_SUCCESS,
	payload: theme
});

export const setFiltersSuccess = (excluded) => ({
	type: Actions.SET_FILTERS_SUCCESS,
	payload: excluded
});

export const getUsersSuccess = (users) => ({
	type: Actions.GET_USERS_SUCCESS,
	payload: users
});

export const getHistogramsSuccess = (histograms) => ({
	type: Actions.GET_HISTOGRAMS_SUCCESS,
	payload: histograms
});
