import '../css/DayList.css';
import React from 'react';
import Day from './Day';
import LoadingPage from './LoadingPage';
import { getDays } from '../state/Effects';
import { connect } from 'react-redux';


const select = (state) => ({
	days: state.days,
});


const mapDispatchToProps = (dispatch) => ({
	getDays: (newestDay, oldestDay) => dispatch(getDays(newestDay, oldestDay))
});


class ConnectedDayList extends React.Component {

	componentDidMount() {
		this.props.getDays(0, 30);
	}


	render() {
		if (this.props.days == null) {
			return <LoadingPage/>;
		}

		const entries = this.props.days.map((day) => (
			<React.Fragment key={day.date}>
				<Day date={day.date} users={day.users}/>
			</React.Fragment>
		));

		return (
			<div className="days-list">
				{entries}
			</div>
		);
	}
}

const DayList = connect(select, mapDispatchToProps)(ConnectedDayList);
export default DayList;
