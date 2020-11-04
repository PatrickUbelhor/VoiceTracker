
export const Actions = {
	SET_ERROR: '[ERROR] Set error msg',
	CLEAR_ERROR: '[ERROR] Clear error msg',
	SET_THEME_SUCCESS: '[THEME] Set theme'
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
