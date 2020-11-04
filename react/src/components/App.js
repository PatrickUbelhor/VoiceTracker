import '../css/App.css';
import React from 'react';
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
import { ThemeProvider } from '@material-ui/core/styles';
import { getMuiTheme } from '../model/Themes';
import { connect } from 'react-redux';
import {
	initApp,
	setTheme
} from '../state/Effects';
import { setError } from '../state/Actions';


const select = (state) => ({
	theme: state.theme
});


const mapDispatchToProps = (dispatch) => ({
	initApp: () => dispatch(initApp()),
	setTheme: (theme) => dispatch(setTheme(theme)),
	setErrorMessage: (message) => dispatch(setError(message))
});


class ConnectedApp extends React.Component {

	invertTheme = () => {
		const to = this.props.theme === 'light' ? 'dark' : 'light';
		this.props.setTheme(to);
	}


	componentDidMount() {
		this.props.initApp();
	}


	render() {
		return (
			<ThemeProvider theme={getMuiTheme(this.props.theme)}>
				<div className="wrapper">
					<Router>
						<Header invertTheme={this.invertTheme} />

						<Switch>
							<Route path="/analytics">
								<AnalyticsPage setErrMsg={this.props.setErrorMessage} />
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
