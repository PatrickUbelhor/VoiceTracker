import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { RefinedStats } from '../../../model/Models';
import StatsGrid from '../stats-grid/StatsGrid';
import StatsTable from '../stats-table/StatsTable';

interface IProps {
	stats: RefinedStats[];
}

function StatsComponentSelector(props: IProps) {
	const isDesktop = useMediaQuery('(min-width: 720px)');

	return isDesktop ? <StatsTable stats={props.stats}/> : <StatsGrid stats={props.stats}/>;
}

export default StatsComponentSelector;
