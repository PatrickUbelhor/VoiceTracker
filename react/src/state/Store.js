import {
	applyMiddleware,
	createStore
} from 'redux';
import thunk from 'redux-thunk';
import { Actions } from './Actions';

const INITIAL_STATE = {
	theme: 'dark',
	errorMessage: null,
	filters: new Set(),
	users: [],
	days: [],
	histograms: {
		items: [],
		numDays: 30,
		minActiveDays: 5
	}
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
		case Actions.SET_FILTERS_SUCCESS:
			return {
				...state,
				filters: new Set(action.payload)
			};
		case Actions.GET_USERS_SUCCESS:
			return {
				...state,
				users: action.payload
			};
		case Actions.GET_HISTOGRAMS_SUCCESS:
			return {
				...state,
				histograms: action.payload
			};
		default:
			return state;
	}
};

export const store = createStore(reducer, applyMiddleware(thunk));
