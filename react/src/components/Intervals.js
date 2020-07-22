import '../css/Intervals.css';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

function Intervals(props) {

	const LENGTH_OF_DAY = 1440;

	let boxes = props.intervals?.map(interval => {
		const duration = interval.end - interval.start;
		const width = 100 * duration / LENGTH_OF_DAY;
		const leftMargin = 100 * interval.start / LENGTH_OF_DAY;

		return (
			// TODO: Maybe make custom tooltip that doesn't take forever to load?
			<Tooltip key={interval.start} arrow title={Math.floor(duration / 60) + 'h ' + (duration % 60) + 'm'}>
				<div className="bar" style={{
					left: leftMargin + '%',
					width: width + '%',
					backgroundColor: props.color
				}} />
			</Tooltip>
		);
	});

	return (
		<div className="intervals">
			{boxes}
		</div>
	);
}

export default Intervals;
