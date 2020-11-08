
export const Actions = {
	SET_ERROR: '[ERROR] Set error msg',
	CLEAR_ERROR: '[ERROR] Clear error msg',
	SET_THEME_SUCCESS: '[THEME] Set theme',

	SET_FILTERS: '[FILTER] Set filters',

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

export const setFilters = (excluded) => ({
	type: Actions.SET_FILTERS,
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
