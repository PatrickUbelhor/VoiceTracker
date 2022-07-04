import './App.css';
import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../state/Hooks';
import AnalyticsPage from './analytics-page/AnalyticsPage';
import DayList from './day-page/DayList';
import ErrorSnackbar from './ErrorSnackbar';
import Header from './header/Header';
import HistogramList from './histogram-page/HistogramList';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import { getMuiTheme, Themes } from '../model/Themes';
import { initApp } from '../state/Effects';


export default function App() {
	const dispatch = useAppDispatch();
	const theme: Themes = useAppSelector(state => state.theme);

	useEffect(() => {
		dispatch(initApp());
	});


	return (
		<ThemeProvider theme={getMuiTheme(theme)}>
			<div className="wrapper">
				<Router>
					<Header/>

					<Switch>
						<Route path="/analytics">
							<AnalyticsPage/>
						</Route>
						<Route path="/histograms">
							<HistogramList />
						</Route>
						<Route path="/">
							<DayList />
						</Route>
					</Switch>

					<ErrorSnackbar/>
				</Router>
			</div>
			<div className="footer">
				<div className="copyright">© Patrick Ubelhor 2022</div>
				<div className="version">v{process.env.REACT_APP_VERSION}</div>
			</div>
		</ThemeProvider>
	);
}
