import React from 'react';
import tracker from '../api/Tracker';
import DayList from './DayList';
import Header from './Header';
import LoadingPage from './LoadingPage';


class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			days: null,
			histograms: null,
			tab: 0 // 0 for days, 1 for histograms
		};
	}

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
				return;
			}

			console.log("An unknown error has occurred");
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
				return;
			}

			console.log("An unknown error has occurred");
			return;
		}

		this.setState((state, props) => {
			return {
				histograms: histograms
			};
		});
	};

	componentDidMount() {
		this.getDays();
	}

	render() {
		let content = null;

		if (this.state.tab === 0) {
			content = this.state.days
				? <DayList days={this.state.days} />
				: <LoadingPage />;
		} else if (this.state.tab === 1) {
			content = this.state.histograms
				? <HistogramList histograms={this.state.histograms} />
				: <LoadingPage />;
		}

		return (
			<div>
				<Header />
				{content}
			</div>
		);
	}

}

export default App;
