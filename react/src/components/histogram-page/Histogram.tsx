import './Histogram.css';
import React from 'react';
import Markers from '../Markers';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface IProps {
	numDays: number;
	name: string;
	data: number[];
}

function Histogram(props: IProps) {

	const NUM_DAYS_AGGREGATE = props.numDays; // Each bar sums up last N days
	const BAR_DURATION = 1440 / props.data.length; // The time interval each bar represents
	const MAX_BAR_HEIGHT = NUM_DAYS_AGGREGATE * BAR_DURATION; // The maximum value any entry in data can have

	let bars = [];
	for (let i = 0; i < props.data.length; i++) {
		let barDiv = (
			<div key={i} className="histogram-bar" style={{
				height: 100 * props.data[i] / MAX_BAR_HEIGHT + '%'
			}} />
		);

		bars.push(barDiv);
	}

	return (
		<Card className="histogram" elevation={4}>
			<CardContent className="histogram-content-wrapper">
				<Typography className="histogram-title" variant="h6">{props.name}</Typography>
				<div className="histogram-content">
					{bars}
					<Markers variant="time" direction="vertical" />
					<Markers variant="percent" direction="horizontal" />
				</div>
			</CardContent>
		</Card>
	);

}

export default Histogram;
