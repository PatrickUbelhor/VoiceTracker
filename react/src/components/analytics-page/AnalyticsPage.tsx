import './AnalyticsPage.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { Fragment, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/Hooks';
import {
	getAnalytics,
	getUsers
} from '../../state/Effects';
import { calculateEntourage } from '../../service/AnalyticsService';
import StatsGrid from './stats-grid/StatsGrid';
import StatsRequestForm from './stats-request-form/StatsRequestForm';
import StatsTable from './stats-table/StatsTable';


export default function AnalyticsPage() {

	const [loading, setLoading] = useState<boolean>(false);

	const isDesktop = useMediaQuery('(min-width: 720px)');
	const analytics = useAppSelector(state => calculateEntourage(state.analytics.filter(data => !state.filters.has(data.target))));
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	const handleSubmit = (numDays: number, username: string) => async (event) => {
		event.preventDefault();
		setLoading(true);
		await dispatch(getAnalytics(numDays, username));
		setLoading(false);
	};

	const statsComponent = isDesktop
		? <StatsTable stats={analytics}/>
		: <StatsGrid stats={analytics}/>;

	return (
		<Fragment>
			<StatsRequestForm handleSubmit={handleSubmit} />
			{ loading ? <div>Loading</div> : null }
			{ statsComponent }
		</Fragment>
	);
}
