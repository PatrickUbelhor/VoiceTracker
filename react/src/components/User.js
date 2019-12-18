import '../css/User.css';
import React from 'react';
import Typography from '@material-ui/core/Typography';

function User(props) {

	const LENGTH_OF_DAY = 1440;

	let boxes = [];
	for (let i = 0; i < props.intervals.length; i++) {
		let length = (props.intervals[i].end - props.intervals[i].start) / LENGTH_OF_DAY;
		let leftMargin = (i === 0)
			? props.intervals[0].start / LENGTH_OF_DAY
			: (props.intervals[i].start - props.intervals[i - 1].end) / LENGTH_OF_DAY;

		let box = (
			<div key={props.intervals[i].start} style={{
				marginLeft: 100 * leftMargin + '%',
				border: '2px solid pink',
				width: 100 * length + '%',
				height: '1em'
			}}>
			</div>
		);

		boxes.push(box);
	}

	return (
		<div className="User">
			<Typography>{props.name}</Typography>
			<div className="Intervals">
				{boxes}
			</div>
		</div>
	);
}

export default User;
