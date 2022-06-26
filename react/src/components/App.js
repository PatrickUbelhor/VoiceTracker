import '../css/App.css';
import React from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import AnalyticsPage from './analytics/AnalyticsPage';
import DayList from './DayList';
import ErrorSnackbar from './ErrorSnackbar';
import Header from './Header';
import HistogramList from './HistogramList';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import { getMuiTheme } from '../model/Themes';
import { initApp } from '../state/Effects';
import { setError } from '../state/Actions';


const select = (state) => ({
	theme: state.theme
});


const mapDispatchToProps = (dispatch) => ({
	initApp: () => dispatch(initApp()),
	setErrorMessage: (message) => dispatch(setError(message))
});


class ConnectedApp extends React.Component {

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
								<HistogramList setErrMsg={this.props.setErrorMessage} />
							</Route>
							<Route path="/">
								<DayList setErrMsg={this.props.setErrorMessage} />
							</Route>
						</Switch>

						<ErrorSnackbar/>
					</Router>
				</div>
				<div className="footer">
					<div className="copyright">© Patrick Ubelhor 2020</div>
					<div className="version">v{process.env.REACT_APP_VERSION}</div>
				</div>
			</ThemeProvider>
		);
	}
}

const App = connect(select, mapDispatchToProps)(ConnectedApp);
export default App;
