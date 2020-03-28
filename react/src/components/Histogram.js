import '../css/Histogram.css';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function Histogram(props) {

	const NUM_DAYS_AGGREGATE = 30; // Each bar sums up last 30 days
	const BAR_DURATION = 1440 / props.data.length; // The time interval each bar represents
	const MAX_BAR_HEIGHT = NUM_DAYS_AGGREGATE * BAR_DURATION; // The maximum value any entry in data can have

	let bars = [];
	for (let i = 0; i < props.data.length; i++) {
		let barDiv = (
			<div key={i} className="HistogramBar" style={{
				height: 100 * props.data[i] / MAX_BAR_HEIGHT + '%'
			}} />
		);

		bars.push(barDiv);
	}

	return (
		<Card className="Histogram" elevation={4}>
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
