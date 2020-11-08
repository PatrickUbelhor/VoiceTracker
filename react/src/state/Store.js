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
		case Actions.SET_FILTERS:
			return {
				...state,
				filters: new Set(action.payload)
			};
		case Actions.GET_USERS_SUCCESS:
			return {
				...state,
				users: action.payload
			};
		default:
			return state;
	}
};

export const store = createStore(reducer, applyMiddleware(thunk));
