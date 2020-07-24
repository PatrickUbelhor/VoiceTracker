import '../css/Markers.css';
import React from 'react';

function Markers(props) {

	let markers = [];
	const numMarkers = 12;
	markers.push(<span key="label0" className="label" style={{ left: '-0.9em' }}>0:00</span>);
	for (let i = 1; i < numMarkers; i++) {
		const left = (i * 100 / numMarkers);
		const negativeOffset = (i < 5) ? -0.75 : -1.25; // Used to align smaller labels to marker
		markers.push(
			// TODO The key of the label should be named after the time
			<React.Fragment key={'label' + i}>
				<span className="label" style={{ left: `calc(${negativeOffset}em + ${left}%)` }}>{i * 2}:00</span>
				<div className={i % 2 === 0 ? 'marker bold' : 'marker'} style={{ left: left + '%' }} />
			</React.Fragment>
		);
	}
	markers.push(<span key={'label' + numMarkers} className="label" style={{ left: 'calc(-1.25em + 100%)' }}>24:00</span>);

	return <>{markers}</>;
}

export default Markers;
