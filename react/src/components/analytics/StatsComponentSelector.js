import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import StatsGrid from './StatsGrid';
import StatsTable from './StatsTable';

function StatsComponentSelector(props) {
	const isDesktop = useMediaQuery('(min-width: 720px)');
	const { stats } = props;

	return isDesktop ? <StatsTable stats={stats}/> : <StatsGrid stats={stats}/>;
}

export default StatsComponentSelector;
