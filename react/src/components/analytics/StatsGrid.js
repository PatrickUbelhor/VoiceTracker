import '../../css/analytics/StatsGrid.css';
import React from 'react';
import {
	Card,
	CardContent,
	Typography
} from '@material-ui/core';

function StatsGrid(props) {

	let { stats } = props;

	if (!stats?.length) {
		return null;
	}

	let userCards = [];
	for (let i = 0; i < stats.length; i++) {
		let user = stats[i];
		let data = user.data.split('\n').map((line, i) => <div key={i}>{line}</div>);

		userCards.push(
			<Card key={user.target} className="stats-card" elevation={4}>
				<CardContent>
					<Typography variant="h6">{user.target}</Typography>
					{data}
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="stats-grid">
			{userCards}
		</div>
	);
}

export default StatsGrid;
