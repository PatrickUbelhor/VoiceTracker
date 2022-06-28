import './DayList.css';
import React, { useEffect } from 'react';
import { DayModel } from '../../model/Models';
import { AppState } from '../../model/States';
import Day from './Day';
import LoadingPage from '../LoadingPage';
import { getDays } from '../../state/Effects';
import { useDispatch, useSelector } from 'react-redux';


function DayList() {

	const dispatch = useDispatch();
	const days: DayModel[] = useSelector<AppState, DayModel[]>(state => state.days);

	// Init - load data
	useEffect(
		() => dispatch(getDays(0, 30) as any),
		[dispatch]
	);

	if (days == null) {
		return <LoadingPage/>;
	}

	const entries = days.map((day: DayModel) => (
		<React.Fragment key={day.date}>
			<Day date={day.date} channels={day.channels}/>
		</React.Fragment>
	));

	return (
		<div className="days-list">
			{entries}
		</div>
	);
}

export default DayList;
