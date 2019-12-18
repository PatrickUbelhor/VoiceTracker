import React from 'react';
import User from './User';
import Typography from '@material-ui/core/Typography';

function Day(props) {

	const entries = props.users.map((user) => {
		return (
			<div key={user.snowflake}>
				<User name={user.snowflake} intervals={user.intervals} />
			</div>
		);
	});

	return (
		<div className="Day">
			<Typography>{props.date}</Typography>
			{entries}
		</div>
	);
}

export default Day;
