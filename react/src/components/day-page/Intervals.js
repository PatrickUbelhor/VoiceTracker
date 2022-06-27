import './Intervals.css';
import React from 'react';
import Tooltip from '@mui/material/Tooltip';

function Intervals(props) {

	const LENGTH_OF_DAY = 1440;
	const [isSightHelperVisible, setSightHelperVisibility] = React.useState(false);

	let boxes = props.intervals?.map(interval => {
		const duration = interval.end - interval.start;
		const width = 100 * duration / LENGTH_OF_DAY;
		const leftMargin = 100 * interval.start / LENGTH_OF_DAY;

		const tooltipText = (
			<div>
				<div>{props.owner}</div>
				<div>{Math.floor(duration / 60) + 'h ' + (duration % 60) + 'm'}</div>
			</div>
		);

		return (
			// TODO: Maybe make custom tooltip that doesn't take forever to load?
			<Tooltip key={interval.start} arrow title={tooltipText}>
				<div
					className="bar"
					onMouseEnter={() => setSightHelperVisibility(true)}
					onMouseLeave={() => setSightHelperVisibility(false)}
					style={{
						left: leftMargin + '%',
						width: width + '%',
						backgroundColor: props.color
					}}
				/>
			</Tooltip>
		);
	});

	const sightHelper = isSightHelperVisible
		? <div className="sight-helper" style={{ borderColor: props.color }}/>
		: null;

	return (
		<div className="intervals">
			{boxes}
			{sightHelper}
		</div>
	);
}

export default Intervals;
