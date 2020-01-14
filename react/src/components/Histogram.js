import '../css/Histogram.css';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function Histogram(props) {

	const NUM_DAYS_AGGREGATE = 30; // Each bar sums up last 30 days
	const BAR_DURATION = 5; // Each bar is 5 minutes
	const MAX_BAR_HEIGHT = BAR_DURATION * NUM_DAYS_AGGREGATE; // The maximum value any entry in data can have
	const BAR_WIDTH = 100 * (1 / (props.data.length));

	let bars = [];
	for (let i = 0; i < props.data.length; i++) {
		let barDiv = (
			<div key={i} className="HistogramBar" style={{
				width: BAR_WIDTH + '%',
				height: 100 * (props.data[i] / MAX_BAR_HEIGHT) + '%',
			}} />
		);

		bars.push(barDiv);
	}

	return (
		<Card className="Histogram" elevation={2}>
			<CardContent>
				<Typography className="HistogramTitle" variant="h6">{props.name}</Typography>
				<div className="HistogramContent">
					{bars}
				</div>
			</CardContent>
		</Card>
	);

}

export default Histogram;
