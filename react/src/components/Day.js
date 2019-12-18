import '../css/Day.css';
import React from 'react';
import User from './User';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function Day(props) {

	const entries = props.users.map((user) => {
		return <User name={user.snowflake} intervals={user.intervals} />;
	});

	return (
		<Card className="Day" elevation={2}>
			<CardContent>
				<Typography className="Date" variant="h6">{props.date}</Typography>
				{entries}
			</CardContent>
		</Card>
	);
}

export default Day;
