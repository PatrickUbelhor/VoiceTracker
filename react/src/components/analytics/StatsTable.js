import '../../css/analytics/StatsTable.css';
import React from 'react';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@material-ui/core';

function StatsTable(props) {

	let { username, stats } = props;

	if (!stats?.length) {
		return null;
	}

	let rows = [];
	for (let i = 0; i < stats.length; i++) {
		let user = stats[i];
		let data = user.data.split('\n').map((line, j) => <div key={j}>{line}</div>);

		rows.push(
			<TableRow key={user.target}>
				<TableCell align="left">{user.target}</TableCell>
				<TableCell align="left">{data[1]}</TableCell>
				<TableCell align="left">{data[2]}</TableCell>
				<TableCell align="left">{data[3]}</TableCell>
				<TableCell align="left">{data[4]}</TableCell>
			</TableRow>
		);
	}

	return (
		<Paper className="stats-table-paper" elevation={4}>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>P(X)</TableCell>
							<TableCell>P({username}, X)</TableCell>
							<TableCell>P({username} | X)</TableCell>
							<TableCell>P(X | {username})</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
}

export default StatsTable;
