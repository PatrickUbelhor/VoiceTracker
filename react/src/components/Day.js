import '../css/Day.css';
import React from 'react';
import Intervals from './Intervals';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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

	let markers = [];
	const numMarkers = 12;
	markers.push(<span className="label" style={{ left: '-0.9em' }}>0:00</span>);
	for (let i = 1; i < numMarkers; i++) {
		const left = (i * 100 / numMarkers);
		const negativeOffset = (i < 5) ? -0.75 : -1.25;
		markers.push(
			<>
				<span className="label" style={{ left: `calc(${negativeOffset}em + ${left}%)` }}>{i * 2}:00</span>
				<div className={i % 2 === 0 ? 'marker bold' : 'marker'} style={{ left: left + '%' }} />
			</>
		);
	}
	markers.push(<span className="label" style={{ left: 'calc(-1.25em + 100%)' }}>24:00</span>);


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
						{markers}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default Day;
