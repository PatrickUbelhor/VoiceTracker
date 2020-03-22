import React from 'react';
import tracker from '../api/Tracker';
import DayList from './DayList';
import ErrorSnackbar from './ErrorSnackbar';
import Header from './Header';
import HistogramList from './HistogramList';
import LoadingPage from './LoadingPage';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			days: null,
			histograms: null,
			message: null // Used to show error messages
		};
	}

	// Used to set the message displayed on the snackbar
	setSnackbar = (value) => {
		this.setState((state, props) => {
			return {
				message: value
			}
		})
	};

	getDays = async () => {
		console.log("Getting days");
		let days = null;
		try {
			let daysReq = await tracker.get('/');
			days = daysReq.data;
			console.log(days);
		} catch (error) {
			if (error.response !== undefined) {
				console.log(error.response);
				this.setSnackbar("Something went wrong when getting the data :/");
				return;
			}

			console.log("An unknown error has occurred");
			this.setSnackbar("Something went wrong when getting the data :/");
			return;
		}

		this.setState((state, props) => {
			return {
				days: days
			};
		});
	};

	getHistograms = async () => {
		console.log("Getting histograms");
		let histograms = null;
		try {
			let histoReq = await tracker.get('/histogram');
			histograms = histoReq.data;
			console.log("Got histograms");
		} catch (error) {
			if (error.response !== undefined) {
				console.log(error.response);
				this.setSnackbar("Something went wrong when getting the data :/");
				return;
			}

			console.log("An unknown error has occurred");
			this.setSnackbar("Something went wrong when getting the data :/");
			return;
		}

		this.setState((state, props) => {
			return {
				histograms: histograms
			};
		});
	};

	componentDidMount() {
		// TODO: Only load the current tab; don't load anything else until it's clicked on
		this.getDays();
		this.getHistograms();
	}

	render() {
		return (
			<Router>
				<Header getDays={this.getDays} getHistograms={this.getHistograms} />

				<Switch>
					<Route path="/histograms">
						{this.state.histograms ? <HistogramList histograms={this.state.histograms} /> : <LoadingPage />}
					</Route>
					<Route path="/">
						{this.state.days ? <DayList days={this.state.days} /> : <LoadingPage />}
					</Route>
				</Switch>

				<ErrorSnackbar message={this.state.message} resetMessage={this.setSnackbar} />
			</Router>
		);
	}

}

export default App;
