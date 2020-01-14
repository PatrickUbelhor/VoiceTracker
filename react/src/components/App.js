import React from 'react';
import tracker from '../api/Tracker';
import DayList from './DayList';
import ErrorSnackbar from './ErrorSnackbar';
import Header from './Header';
import HistogramList from './HistogramList';
import LoadingPage from './LoadingPage';


class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			days: null,
			histograms: null,
			tab: 0, // 0 for days, 1 for histograms
			message: null // Used to show error messages
		};
	}

	// Callback function for header buttons
	setTab = (tabNum) => {
		this.loadTab(tabNum);

		this.setState((state, props) => {
			return {
				tab: tabNum
			};
		});
	};

	loadTab = (tabNum) => {
		if (tabNum === 0) {
			this.getDays();
		} else if (tabNum === 1) {
			this.getHistograms();
		} else {
			console.log("Invalid tab number: " + tabNum);
			this.setSnackbar("An invalid tab was selected. Looks like I have a bug to fix.");
		}
	};

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
		this.loadTab(this.state.tab);
	}

	render() {
		let content = null;

		// Decide what content to display based on which tab the user is in
		if (this.state.tab === 0) {
			content = this.state.days
				? <DayList days={this.state.days} />
				: <LoadingPage />;
		} else if (this.state.tab === 1) {
			content = this.state.histograms
				? <HistogramList histograms={this.state.histograms} />
				: <LoadingPage />;
		}

		const message = (
			<div>
				<ErrorSnackbar message={this.state.message} resetMessage={this.setSnackbar} />
			</div>
		);

		return (
			<div>
				<Header onClick={this.setTab} />
				{content}
				{message}
			</div>
		);
	}

}

export default App;
