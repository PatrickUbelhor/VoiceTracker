import '../css/Intervals.css';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

function Intervals(props) {

	const LENGTH_OF_DAY = 1440;

	let boxes = [];
	for (let i = 0; i < props.intervals.length; i++) {
		let duration = props.intervals[i].end - props.intervals[i].start;
		let width = duration / LENGTH_OF_DAY;
		let leftMargin = (i === 0)
			? props.intervals[0].start / LENGTH_OF_DAY
			: (props.intervals[i].start - props.intervals[i - 1].end) / LENGTH_OF_DAY;

		let box = (
			// TODO: Maybe make custom tooltip that doesn't take forever to load?
			<Tooltip arrow title={Math.floor(duration / 60) + "h " + (duration % 60) + "m"}>
				<div key={props.intervals[i].start} className="Bar" style={{
					marginLeft: 100 * leftMargin + '%',
					width: 100 * width + '%',
					backgroundColor: props.color
				}} />
			</Tooltip>
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
