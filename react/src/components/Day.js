import '../css/Day.css';
import React from 'react';
import Intervals from './Intervals';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function Day(props) {

	// Sort users alphabetically
	props.users.sort((a, b) => a.id.localeCompare(b.id));

	let names = [];
	let intervals = [];
	let others = [];
	let otherIntervals = [];
	for (let i = 0; i < props.users.length; i++) {
		if (props.users[i].intervals.length > 0) {
			let intervalDiv = <Intervals key={i} color={props.users[i].color} intervals={props.users[i].intervals} />;
			let nameDiv = <div className="NameListing" key={i} style={{borderLeftColor: props.users[i].color}}>{props.users[i].id}</div>;


			// We want to put "others" at bottom of list
			if (props.users[i].id === "Other") {
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
		<Card className="Day" elevation={4}>
			<CardContent>
				<Typography className="Date" variant="h6">{props.date}</Typography>
				<div className="Content">
					<div className="Names" style={{height: (names.length * 1.75) + "em"}}>
						{names}
					</div>
					<div className="BarGraphs">
						{intervals}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default Day;
