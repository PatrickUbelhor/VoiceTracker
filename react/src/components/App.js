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

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			message: null, // Used to show error messages
			theme: 'dark'
		};
	}


	// Used to set the message displayed on the snackbar
	setSnackbar = (value) => {
		this.setState({
			message: value
		});
	};


	invertTheme = () => {
		const from = this.state.theme;
		const to = this.state.theme === 'light' ? 'dark' : 'light';

		this.setState({
			theme: to
		});
		document.body.classList.replace(from, to);
		localStorage.setItem('theme', to);
	}


	componentDidMount() {
		const theme = localStorage.getItem('theme');

		if (theme) {
			this.setState({
				theme: theme
			});
		}
	}


	render() {
		return (
			<>
				<div className="wrapper">
					<Router>
						<Header invertTheme={this.invertTheme} />

						<Switch>
							<Route path="/analytics">
								<AnalyticsPage setErrMsg={this.setSnackbar} />
							</Route>
							<Route path="/histograms">
								<HistogramList setErrMsg={this.setSnackbar} />
							</Route>
							<Route path="/">
								<DayList setErrMsg={this.setSnackbar} />
							</Route>
						</Switch>

						<ErrorSnackbar message={this.state.message} resetMessage={this.setSnackbar} />
					</Router>
				</div>
				<div className="footer">
					<div className="copyright">© Patrick Ubelhor 2020</div>
					<div className="version">v{process.env.REACT_APP_VERSION}</div>
				</div>
			</>
		);
	}
}

export default App;
