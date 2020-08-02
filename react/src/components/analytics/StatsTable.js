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

	let { username, stats } = props;
	let [orderDirection, setOrderDirection] = React.useState('asc'); // asc or desc
	let [orderProperty, setOrderProperty] = React.useState('name');

	if (!stats?.length) {
		return null;
	}

	const handleSort = (event, property) => {
		const isAsc = (orderProperty === property) && (orderDirection === 'asc');
		setOrderDirection(isAsc ? 'desc' : 'asc');
		setOrderProperty(property);
	};

	return (
		<Paper className="stats-table-paper" elevation={4}>
			<TableContainer>
				<Table aria-label="stats table">
					<EnhancedTableHead username={username}
					                   orderProperty={orderProperty}
					                   orderDirection={orderDirection}
					                   handleSort={handleSort}
					/>
					<EnhancedTableBody stats={stats}/>
				</Table>
			</TableContainer>
		</Paper>
	);
}


function EnhancedTableHead({ username, orderDirection, orderProperty, handleSort }) {
	const headCells = [
		{ id: 'name', label: 'Name', numeric: false },
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
		let user = stats[i];
		let data = user.data.split('\n').map((line, j) => <div key={j}>{line}</div>);

		rows.push(
			<TableRow key={user.target}>
				<TableCell className="stats-table-cell" align="left">{user.target}</TableCell>
				<TableCell className="stats-table-cell" align="right">{data[1]}</TableCell>
				<TableCell className="stats-table-cell" align="right">{data[2]}</TableCell>
				<TableCell className="stats-table-cell" align="right">{data[3]}</TableCell>
				<TableCell className="stats-table-cell" align="right">{data[4]}</TableCell>
			</TableRow>
		);
	}

	return (
		<TableBody>
			{rows}
		</TableBody>
	);
}
