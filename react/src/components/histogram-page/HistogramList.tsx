import './HistogramList.css';
import React, { Fragment, useCallback, useEffect } from 'react';
import Button from '@mui/material/Button';
import { HistogramResponse } from '../../model/Responses';
import { useAppDispatch, useAppSelector } from '../../state/Hooks';
import Histogram from './Histogram';
import LoadingPage from '../LoadingPage';
import { getHistograms } from '../../state/Effects';


// TODO: put getHistograms() params in URL. Use value of params from router instead of state.
export default function HistogramList() {

	const dispatch = useAppDispatch();
	const numDays: number = useAppSelector(state => state.histograms.numDays);
	const histograms: HistogramResponse[] = useAppSelector(state => (
		state.histograms.items
			.filter(histogram => !state.filters.has(histogram.name))
			.sort((a, b) => a.name.localeCompare(b.name))
	));

	const _getHistograms = useCallback(
		(numDays: number, minActiveDays: number) => dispatch(getHistograms(numDays, minActiveDays)),
		[dispatch]
	);

	useEffect(() => {
		_getHistograms(30, 5);
	}, [_getHistograms]);


	if (histograms == null) {
		return <LoadingPage />;
	}

	const entries = histograms.map(histogram => (
		<Fragment key={ histogram.name }>
			<Histogram numDays={ numDays } name={ histogram.name } data={ histogram.data } />
		</Fragment>
	));

	return (
		<div className="HistogramList">
			<Button
				className="filterButton"
				variant="contained"
				color="primary"
				onClick={ () => _getHistograms(7, 2) }
			>7</Button>
			<Button
				className="filterButton"
				variant="contained"
				color="primary"
				onClick={ () => _getHistograms(30, 5) }
			>30</Button>
			{ entries }
		</div>
	);
}
