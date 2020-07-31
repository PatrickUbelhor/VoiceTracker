import '../css/DayList.css';
import React from 'react';
import tracker from '../api/Tracker';
import Day from './Day';
import LoadingPage from './LoadingPage';

class DayList extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			days: null,
			page: 0
		}
	}


	getDays = async (newestDay = 0, oldestDay = 30) => {
		console.log("Getting days");
		let days = null;
		try {
			let daysReq = await tracker.getDays(newestDay, oldestDay);
			days = daysReq.data;
			console.log("Got days");

			this.setState({
				days: days
			});
		} catch (error) {
			if (error.response !== undefined) {
				console.log(error.response);
				this.props.setErrMsg("Something went wrong when getting the data");
				return;
			}

			console.log("An unknown error has occurred");
			this.props.setErrMsg("Something went wrong when getting the data");
		}
	};


	componentDidMount() {
		this.getDays(0, 30);
	}


	render() {
		if (this.state.days == null) {
			return <LoadingPage/>;
		}

		const entries = this.state.days.map((day) => (
			<React.Fragment key={day.date}>
				<Day date={day.date} users={day.users} />
			</React.Fragment>
		));

		return (
			<div className="days-list">
				{entries}
			</div>
		);
	}
}

export default DayList;
