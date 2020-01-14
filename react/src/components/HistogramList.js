import '../css/HistogramList.css';
import React from 'react';
import Histogram from './Histogram';

function HistogramList(props) {

	props.histograms.sort((a, b) => a.name.localeCompare(b.name));
	const entries = props.histograms.map((histogram) => {

		return (
			<div key={histogram.name}>
				<Histogram name={histogram.name} data={histogram.data} />
			</div>
		);
	});

	return (
		<div className="HistogramList">
			{entries}
		</div>
	);
}

export default HistogramList;
