import '../css/Histogram.css';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function Histogram(props) {

	return (
		<Card className="Histogram" elevation={2}>
			<CardContent>
				<Typography className="HistogramTitle" variant="h6">{props.name}</Typography>
				<div className="HistogramContent">

				</div>
			</CardContent>
		</Card>
	);

}

export default Histogram;
