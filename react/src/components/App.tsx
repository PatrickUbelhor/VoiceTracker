import './App.css';
import React from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { AppState } from '../model/States';
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
import { getMuiTheme } from '../model/Themes';
import { initApp } from '../state/Effects';
import { setError } from '../state/Actions';

interface IProps {
	theme: string;
	initApp: () => void;
	setErrorMessage: (message: string) => void;
}

const select = (state: AppState) => ({
	theme: state.theme
});


const mapDispatchToProps = (dispatch) => ({
	initApp: () => dispatch(initApp()),
	setErrorMessage: (message: string) => dispatch(setError(message))
});


class ConnectedApp extends React.Component<IProps, any> {

	componentDidMount() {
		this.props.initApp();
	}

	render() {
		return (
			<ThemeProvider theme={getMuiTheme(this.props.theme)}>
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
}

const App = connect(select, mapDispatchToProps)(ConnectedApp);
export default App;
