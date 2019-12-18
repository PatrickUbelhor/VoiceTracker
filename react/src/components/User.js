import React from 'react';

function User(props) {

	const LENGTH_OF_DAY = 1440;

	let boxes = [];
	for (let i = 0; i < props.intervals.length; i++) {
		let length = (props.intervals[i].end - props.intervals[i].start) / LENGTH_OF_DAY;
		let leftMargin = (i === 0)
			? props.intervals[0].start / LENGTH_OF_DAY
			: (props.intervals[i].start - props.intervals[i - 1].end) / LENGTH_OF_DAY;

		let box = (
			<div style={{
				marginLeft: leftMargin + '%',
				border: '4px solid pink',
				width: length + '%'
			}}>
			</div>
		);

		boxes += box;
	}

	return (
		<div>
			{boxes}
		</div>
	);
}

export default User;
