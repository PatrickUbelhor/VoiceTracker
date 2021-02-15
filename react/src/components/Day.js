import '../css/Day.css';
import React from 'react';
import Intervals from './Intervals';
import Markers from './Markers';
import { Card, CardContent, Typography } from '@material-ui/core';

function Day(props) {

	// Sort channels for consistent ordering
	let channels = props.channels
		.slice()
		.sort((a, b) => a.id.localeCompare(b.id));

	let channelNames = [];
	let channelIntervals = [];
	let totalNameCount = 0;
	for (let i = 0; i < channels.length; i++) {
		const users = channels[i].users
			.slice()
			.sort((a, b) => a.id.localeCompare(b.id));

		let names = [];
		let intervals = [];
		let others = [];
		let otherIntervals = [];
		for (let i = 0; i < users.length; i++) {
			if (users[i].intervals.length > 0) {
				totalNameCount++;
				let intervalDiv = <Intervals key={i} color={users[i].color} intervals={users[i].intervals} owner={users[i].id}/>;
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

		const subChannelNames = (
			<div key={channels[i].id} className="channel" style={{ height: `${names.length * 1.75}em` }}>
				{names}
			</div>
		);

		const subChannelIntervals = (
			<div key={channels[i].id} className="channel" style={{ height: `${names.length * 1.75}em` }}>
				{intervals}
			</div>
		);

		channelNames.push(subChannelNames);
		channelIntervals.push(subChannelIntervals);
	}

	return (
		<Card className="day" elevation={4}>
			<CardContent>
				<Typography className="date" variant="h6">{props.date}</Typography>
				<div className="content">
					<div className="names">
						{channelNames}
					</div>
					<div className="bar-graphs">
						<Markers variant="time" direction="vertical" />
						{channelIntervals}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default Day;
