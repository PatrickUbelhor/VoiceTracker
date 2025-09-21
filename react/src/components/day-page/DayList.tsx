import './DayList.css';
import React, { Fragment, useEffect } from 'react';
import { DayModel } from '../../model/Models';
import { useAppDispatch, useAppSelector } from '../../state/Hooks';
import Day from './Day';
import LoadingPage from '../LoadingPage';
import { getDays } from '../../state/Effects';


function DayList() {

	const dispatch = useAppDispatch();
	const days: DayModel[] = useAppSelector<DayModel[]>(state => state.days);

	// Init - load data
	useEffect(() => {
			dispatch(getDays(0, 30));
		},
		[dispatch]
	);

	if (days == null) {
		return <LoadingPage />;
	}

	const entries = days.map((day: DayModel) => (
		<Fragment key={ day.date }>
			<Day date={ day.date } channels={ day.channels } />
		</Fragment>
	));

	return (
		<div className="days-list">
			{ entries }
		</div>
	);
}

export default DayList;
