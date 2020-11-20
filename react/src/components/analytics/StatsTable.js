import '../../css/analytics/StatsTable.css';
import React from 'react';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel
} from '@material-ui/core';


export default function StatsTable(props) {

	let { stats } = props;
	let [orderDirection, setOrderDirection] = React.useState('asc'); // asc or desc
	let [orderProperty, setOrderProperty] = React.useState('target');

	if (!stats?.length) {
		return null;
	}

	const sortedStats = stats.slice().sort((a, b) => {
		const comparison = a[orderProperty].localeCompare(b[orderProperty]);
		return (orderDirection === 'asc') ? comparison : -comparison;
	});

	const handleSort = (event, property) => {
		const isAsc = (orderProperty === property) && (orderDirection === 'asc');
		setOrderDirection(isAsc ? 'desc' : 'asc');
		setOrderProperty(property);
	};

	return (
		<Paper className="stats-table-paper" elevation={4}>
			<TableContainer>
				<Table aria-label="stats table">
					<EnhancedTableHead username={stats[0].origin}
					                   orderProperty={orderProperty}
					                   orderDirection={orderDirection}
					                   handleSort={handleSort}
					/>
					<EnhancedTableBody stats={sortedStats}/>
				</Table>
			</TableContainer>
		</Paper>
	);
}


function EnhancedTableHead({ username, orderDirection, orderProperty, handleSort }) {
	const headCells = [
		{ id: 'target', label: 'Name', numeric: false },
		{ id: 'probTarget', label: 'P(X)', numeric: true },
		{ id: 'probJoint', label: `P(${username}, X)`, numeric: true},
		{ id: 'probOriginGivenTarget', label: `P(${username} | X)`, numeric: true},
		{ id: 'probTargetGivenOrigin', label: `P(X | ${username})`, numeric: true},
	];

	const createSortHandler = (property) => (event) => {
		handleSort(event, property);
	};

	const headEls = headCells.map(cell => (
		<TableCell className="state-table-cell"
		           key={cell.id}
		           align={cell.numeric ? 'right' : 'left'}
		           sortDirection={orderProperty === cell.id ? orderDirection : false}
		>
			<TableSortLabel className="stats-table-cell"
			                active={orderProperty === cell.id}
			                direction={orderProperty === cell.id ? orderDirection : 'asc'}
			                onClick={createSortHandler(cell.id)}
			>{cell.label}</TableSortLabel>
		</TableCell>
	));

	return (
		<TableHead>
			<TableRow>
				{headEls}
			</TableRow>
		</TableHead>
	);
}


function EnhancedTableBody({ stats }) {
	let rows = [];
	for (let i = 0; i < stats.length; i++) {
		let { target, probTarget, probJoint, probOriginGivenTarget, probTargetGivenOrigin, numStdDevGivenTarget, numStdDevGivenOrigin } = stats[i];

		let givenTargetClass = "stats-table-cell";
		if (numStdDevGivenTarget >= 1) {
			givenTargetClass += "-bold";
		}

		let givenOriginClass = "stats-table-cell";
		if (numStdDevGivenOrigin >= 1) {
			givenOriginClass += "-bold";
		}

		rows.push(
			<TableRow key={target}>
				<TableCell className="stats-table-cell" align="left">{target}</TableCell>
				<TableCell className="stats-table-cell" align="right">{probTarget}</TableCell>
				<TableCell className="stats-table-cell" align="right">{probJoint}</TableCell>
				<TableCell className={givenTargetClass} align="right">{probOriginGivenTarget}</TableCell>
				<TableCell className={givenOriginClass} align="right">{probTargetGivenOrigin}</TableCell>
			</TableRow>
		);
	}

	return (
		<TableBody>
			{rows}
		</TableBody>
	);
}
