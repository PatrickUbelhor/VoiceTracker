import '../css/Markers.css';
import React from 'react';

const timeLabels = [
	{ label: '0:00', offset: -0.9 },
	{ label: '2:00', offset: -0.75 },
	{ label: '4:00', offset: -0.75 },
	{ label: '6:00', offset: -0.75 },
	{ label: '8:00', offset: -0.75 },
	{ label: '10:00', offset: -1.25 },
	{ label: '12:00', offset: -1.25 },
	{ label: '14:00', offset: -1.25 },
	{ label: '16:00', offset: -1.25 },
	{ label: '18:00', offset: -1.25 },
	{ label: '20:00', offset: -1.25 },
	{ label: '22:00', offset: -1.25 },
	{ label: '24:00', offset: -1.25 }
];

const percentLabels = [
	{ label: '0%', offset: 0 },
	{ label: '20%', offset: 0 },
	{ label: '40%', offset: 0 },
	{ label: '60%', offset: 0 },
	{ label: '80%', offset: 0 },
	{ label: '100%', offset: 0 }
];

function Markers(props) {

	let labels;
	switch (props.variant) {
		case 'time':
			labels = timeLabels;
			break;
		case 'percent':
			labels = percentLabels;
			break;
		default:
			labels = timeLabels;
	}

	let markers = [];

	// Insert left label
	markers.push(<span key="label0" className="label" style={{ left: labels[0].offset + 'em' }}>{labels[0].label}</span>);

	// Insert middle lines + labels
	for (let i = 1; i < labels.length - 1; i++) {
		const left = (i * 100 / (labels.length - 1));
		markers.push(
			<React.Fragment key={labels[i].label}>
				<span className="label" style={{ left: `calc(${labels[i].offset}em + ${left}%)` }}>{labels[i].label}</span>
				<div className={i % 2 === 0 ? 'marker bold' : 'marker'} style={{ left: left + '%' }}/>
			</React.Fragment>
		);
	}

	// Insert right label
	const lastLabel = labels[labels.length - 1];
	markers.push(<span key={lastLabel.label} className="label" style={{ left: `calc(${lastLabel.offset}em + 100%)` }}>{lastLabel.label}</span>);

	return <>{markers}</>;
}

export default Markers;
