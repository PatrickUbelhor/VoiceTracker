import '../css/DayList.css';
import React from 'react';
import Day from './Day';
import tracker from '../api/Tracker';
import LoadingPage from './LoadingPage';

class DayList extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			setErrMsg: props.setErrMsg,
			days: null,
			page: 0
		}
	}


	getDays = async (newestDay = 0, oldestDay = 30) => {
		console.log("Getting days");
		let days = null;
		try {
			let daysReq = await tracker.get(`?newestDay=${newestDay}&oldestDay=${oldestDay}`);
			days = daysReq.data;
			console.log(days);
		} catch (error) {
			if (error.response !== undefined) {
				console.log(error.response);
				this.state.setErrMsg("Something went wrong when getting the data");
				return;
			}

			console.log("An unknown error has occurred");
			this.state.setErrMsg("Something went wrong when getting the data");
			return;
		}

		this.setState((state, props) => {
			return {
				days: days
			};
		});
	};


	componentDidMount() {
		this.getDays(0, 30);
	}


	render() {
		if (this.state.days == null) {
			return <LoadingPage/>;
		}


		const entries = this.state.days.map((day) => {
			return (
				<div key={day.date}>
					<Day date={day.date} users={day.users} />
				</div>
			);
		});

		return (
			<div className="DayList">
				{entries}
			</div>
		);
	}
}

export default DayList;
