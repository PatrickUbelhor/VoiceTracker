import {
	applyMiddleware,
	createStore
} from 'redux';
import thunk from 'redux-thunk';
import { Actions } from './Actions';

const INITIAL_STATE = {
	theme: 'dark',
	errorMessage: null,
	filters: {},
	days: [],
	histograms: []
};

const reducer = function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case Actions.SET_THEME_SUCCESS:
			return {
				...state,
				theme: action.payload
			};
		case Actions.SET_ERROR:
			return {
				...state,
				errorMessage: action.payload
			};
		case Actions.CLEAR_ERROR:
			return {
				...state,
				errorMessage: null
			};
		default:
			return state;
	}
};

export const store = createStore(reducer, applyMiddleware(thunk));
