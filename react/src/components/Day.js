import React from 'react';
import User from './User';

function Day(props) {

	const entries = props.users.map((user) => {
		return (
			<div key={user.snowflake}>
				<User name={user.snowflake} intervals={user.intervals} />
			</div>
		);
	});

	return (
		<div className="day">
			{entries}
		</div>
	);
}

export default Day;
