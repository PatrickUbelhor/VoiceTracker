import '../css/Intervals.css';
import React from 'react';

function Intervals(props) {

	const LENGTH_OF_DAY = 1440;

	let boxes = [];
	for (let i = 0; i < props.intervals.length; i++) {
		let length = (props.intervals[i].end - props.intervals[i].start) / LENGTH_OF_DAY;
		let leftMargin = (i === 0)
			? props.intervals[0].start / LENGTH_OF_DAY
			: (props.intervals[i].start - props.intervals[i - 1].end) / LENGTH_OF_DAY;

		let box = (
			<div key={props.intervals[i].start} className="Bar" style={{
				marginLeft: 100 * leftMargin + '%',
				width: 100 * length + '%',
				backgroundColor: props.color
			}} />
		);

		boxes.push(box);
	}

	return (
		<div className="Intervals">
			{boxes}
		</div>
	);
}

export default Intervals;
