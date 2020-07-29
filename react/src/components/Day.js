import '../css/Day.css';
import React from 'react';
import Intervals from './Intervals';
import Markers from './Markers';
import {
	Card,
	CardContent,
	Typography
} from '@material-ui/core';

function Day(props) {

	// Sort users alphabetically
	let users = props.users.slice().sort((a, b) => a.id.localeCompare(b.id));

	let names = [];
	let intervals = [];
	let others = [];
	let otherIntervals = [];
	for (let i = 0; i < users.length; i++) {
		if (users[i].intervals.length > 0) {
			let intervalDiv = <Intervals key={i} color={users[i].color} intervals={users[i].intervals}/>;
			let nameDiv = <div className="name-listing" key={i} style={{ borderLeftColor: users[i].color }}>{users[i].id}</div>;

			// We want to put "others" at bottom of list
			if (users[i].id === 'Other') {
				others.push(nameDiv);
				otherIntervals.push(intervalDiv);
				continue;
			}

			names.push(nameDiv);
			intervals.push(intervalDiv);
		}
	}

	names.push(...others);
	intervals.push(...otherIntervals);

	return (
		<Card className="day" elevation={4}>
			<CardContent>
				<Typography className="date" variant="h6">{props.date}</Typography>
				<div className="content">
					<div className="names" style={{ height: (names.length * 1.75) + 'em' }}>
						{names}
					</div>
					<div className="bar-graphs">
						{intervals}
						<Markers variant="percent" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default Day;
