import '../css/Intervals.css';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

function Intervals(props) {

	const LENGTH_OF_DAY = 1440;

	let boxes = [];
	for (let i = 0; i < props.intervals.length; i++) {
		let duration = props.intervals[i].end - props.intervals[i].start;
		let width = 100 * duration / LENGTH_OF_DAY;
		let leftMargin = 100 * props.intervals[i].start / LENGTH_OF_DAY;

		let box = (
			// TODO: Maybe make custom tooltip that doesn't take forever to load?
			<Tooltip key={props.intervals[i].start} arrow title={Math.floor(duration / 60) + "h " + (duration % 60) + "m"}>
				<div className="bar" style={{
					left: leftMargin + '%',
					width: width + '%',
					backgroundColor: props.color
				}} />
			</Tooltip>
		);

		boxes.push(box);
	}

	return (
		<div className="intervals">
			{boxes}
		</div>
	);
}

export default Intervals;
