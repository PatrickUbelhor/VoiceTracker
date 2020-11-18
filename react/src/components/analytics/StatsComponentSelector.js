import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import StatsGrid from './StatsGrid';
import StatsTable from './StatsTable';

function StatsComponentSelector(props) {
	const isDesktop = useMediaQuery('(min-width: 720px)');
	const { stats } = props;

	return isDesktop ? <StatsTable stats={stats}/> : <StatsGrid stats={stats}/>;
}

export default StatsComponentSelector;
