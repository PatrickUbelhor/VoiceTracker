import '../css/Day.css';
import React from 'react';
import Intervals from './Intervals';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function Day(props) {

	let names = [];
	let intervals = [];
	for (let i = 0; i < props.users.length; i++) {
		if (props.users[i].intervals.length > 0) {
			names.push(<div key={i}>{props.users[i].id}</div>);
			intervals.push(<Intervals key={i} intervals={props.users[i].intervals} />);
		}
	}

	return (
		<Card className="Day" elevation={2}>
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
