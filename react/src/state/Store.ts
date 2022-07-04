import { configureStore } from '@reduxjs/toolkit';
// import {
// 	applyMiddleware,
// 	createStore
// } from 'redux';
// import thunk from 'redux-thunk';
import { AppState } from '../model/States';
import { Themes } from '../model/Themes';
import { Action, Actions } from './Actions';

const INITIAL_STATE: AppState = {
	theme: Themes.dark,
	errorMessage: null,
	filters: new Set(),
	users: [],
	days: null,
	histograms: {
		items: [],
		numDays: 30,
	},
	analytics: []
};

const reducer = function (state: AppState = INITIAL_STATE, action: Action) {
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
		case Actions.GET_DAYS_SUCCESS:
			return {
				...state,
				days: action.payload
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
		case Actions.GET_ANALYTICS_SUCCESS:
			return {
				...state,
				analytics: action.payload
			};
		default:
			return state;
	}
};

// export const store = createStore(reducer, applyMiddleware(thunk));

export const store = configureStore({
	reducer: reducer
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
