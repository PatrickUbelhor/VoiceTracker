import './AnalyticsPage.css';
import React, { Fragment, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/Hooks';
import StatsComponentSelector from './stats-component-selector/StatsComponentSelector';
import {
	getAnalytics,
	getUsers
} from '../../state/Effects';
import { calculateEntourage } from '../../service/AnalyticsService';
import StatsRequestForm from './stats-request-form/StatsRequestForm';


export default function AnalyticsPage() {

	const [loading, setLoading] = useState<boolean>(false);

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

	return (
		<Fragment>
			<StatsRequestForm handleSubmit={handleSubmit} />
			{ loading ? <div>Loading</div> : null }
			<StatsComponentSelector stats={analytics}/>
		</Fragment>
	);
}
