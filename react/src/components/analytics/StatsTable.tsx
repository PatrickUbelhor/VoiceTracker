import '../../css/analytics/StatsTable.css';
import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { RefinedStats } from '../../model/Models';


interface IStatsTableProps {
	stats: RefinedStats[]
}

export default function StatsTable(props: IStatsTableProps) {

	let { stats } = props;
	let [orderDirection, setOrderDirection] = React.useState<'asc' | 'desc'>('asc'); // asc or desc
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


interface IEnhancedTableHeadProps {
	username: string;
	orderDirection: 'asc' | 'desc';
	orderProperty: string;
	handleSort: (event, property) => void;
}

function EnhancedTableHead({ username, orderDirection, orderProperty, handleSort }: IEnhancedTableHeadProps) {
	const headCells = [
		{
			id: 'target',
			label: 'Name',
			numeric: false,
			tooltip: null
		},
		{
			id: 'targetTime',
			label: 'Time Online',
			numeric: true,
			tooltip: 'The total time that X is online.'
		},
		{
			id: 'jointTime',
			label: `Time Together`,
			numeric: true,
			tooltip: `The total time that X and ${username} are in the call together.`
		},
		{
			id: 'probOriginGivenTarget',
			label: `P(${username} | X)`,
			numeric: true,
			tooltip: `The proportion of X's time spent with ${username}. It tends to be descriptive of X's behavior, but not ${username}'s.`
		},
		{
			id: 'probTargetGivenOrigin',
			label: `P(X | ${username})`,
			numeric: true,
			tooltip: `The proportion of ${username}'s time spent with X. It tends to be descriptive of ${username}'s behavior, but not X's.`
		},
	];

	const createSortHandler = (property) => (event) => {
		handleSort(event, property);
	};

	const headEls = headCells.map(cell => {
		const label = (
			<TableSortLabel className="stats-table-cell"
			                active={orderProperty === cell.id}
			                direction={orderProperty === cell.id ? orderDirection : 'asc'}
			                onClick={createSortHandler(cell.id)}
			>{cell.label}</TableSortLabel>
		);

		const tooltip = (
			<Tooltip title={cell.tooltip} placement="top">
				{label}
			</Tooltip>
		);

		return (
			<TableCell className="state-table-cell"
			           key={cell.id}
			           align={cell.numeric ? 'right' : 'left'}
			           sortDirection={orderProperty === cell.id ? orderDirection : false}
			>
				{ cell.tooltip ? tooltip : label }
			</TableCell>
		);
	});

	return (
		<TableHead>
			<TableRow>
				{headEls}
			</TableRow>
		</TableHead>
	);
}


interface IEnhancedTableBodyProps {
	stats: RefinedStats[];
}

function EnhancedTableBody({ stats }: IEnhancedTableBodyProps) {
	let rows = [];
	for (let i = 0; i < stats.length; i++) {
		let {
			target,
			targetTime,
			jointTime,
			probOriginGivenTarget,
			probTargetGivenOrigin,
			numStdDevGivenTarget,
			numStdDevGivenOrigin
		} = stats[i];

		let givenTargetClass = "stats-table-cell";
		if (numStdDevGivenTarget >= 1) {
			givenTargetClass += "-bold";
		}

		let givenOriginClass = "stats-table-cell";
		if (numStdDevGivenOrigin >= 1) {
			givenOriginClass += "-bold";
		}

		const targetTimeDisplay = `${targetTime / 60}h ${targetTime % 60}m`;
		const jointTimeDisplay = `${jointTime / 60}h ${jointTime % 60}m`;

		rows.push(
			<TableRow key={target}>
				<TableCell className="stats-table-cell" align="left">{ target }</TableCell>
				<TableCell className="stats-table-cell" align="right">{ targetTimeDisplay }</TableCell>
				<TableCell className="stats-table-cell" align="right">{ jointTimeDisplay }</TableCell>
				<TableCell className={givenTargetClass} align="right">{ probOriginGivenTarget }</TableCell>
				<TableCell className={givenOriginClass} align="right">{ probTargetGivenOrigin }</TableCell>
			</TableRow>
		);
	}

	return (
		<TableBody>
			{rows}
		</TableBody>
	);
}
