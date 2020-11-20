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

		userCards.push(
			<Card key={user.target} className="stats-card" elevation={4}>
				<CardContent>
					<Typography variant="h6">{user.target}</Typography>
					<div>P({user.origin}) = {user.probOrigin}</div>
					<div>P({user.target}) = {user.probTarget}</div>
					<div>P({user.origin}, {user.target}) = {user.probJoint}</div>
					<div>P({user.origin} | {user.target}) = {user.probOriginGivenTarget}</div>
					<div>P({user.target} | {user.origin}) = {user.probTargetGivenOrigin}</div>
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
