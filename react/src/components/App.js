import React from 'react';
import tracker from '../api/Tracker';
import DayList from './DayList';
import Header from './Header';
import LoadingPage from './LoadingPage';


class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			days: null
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

	componentDidMount() {
		this.getDays();
	}

	render() {
		const content = this.state.days
			? <DayList days={this.state.days} />
			: <LoadingPage />;

		return (
			<div>
				<Header />
				{content}
			</div>
		);
	}

}

export default App;
