import '../css/HistogramList.css';
import React from 'react';
import Button from '@material-ui/core/Button';
import tracker from '../api/Tracker';
import Histogram from './Histogram';
import LoadingPage from './LoadingPage';

// TODO: put getHistograms() params in URL. Use value of params from router instead of state.
class HistogramList extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			histograms: null,
			numDays: 30,
			minActiveDays: 5
		};
	}


	getHistograms = async (numDays = 30, minActiveDays = 5) => {
		console.log('Getting histograms');
		let histograms = null;
		try {
			let histoReq = await tracker.getHistograms(numDays, minActiveDays);
			histograms = histoReq.data;
			console.log(histoReq);

			this.setState({
				histograms: histograms,
				numDays: numDays,
				minActiveDays: minActiveDays
			});
		} catch (error) {
			if (error.response !== undefined) {
				console.log(error.response);
				this.props.setErrMsg('Something went wrong when getting the data');
				return;
			}

			console.log('An unknown error has occurred');
			this.props.setErrMsg('Something went wrong when getting the data');
		}
	};


	componentDidMount() {
		this.getHistograms(this.state.numDays, this.state.minActiveDays);
	}


	render() {
		if (this.state.histograms == null) {
			return <LoadingPage/>;
		}


		this.state.histograms.sort((a, b) => a.name.localeCompare(b.name));
		const entries = this.state.histograms.map((histogram) => {

			return (
				<div key={histogram.name}>
					<Histogram name={histogram.name} numDays={this.state.numDays} data={histogram.data}/>
				</div>
			);
		});

		return (
			<div className="HistogramList">
				<Button className="filterButton" variant="contained" color="primary" onClick={() => this.getHistograms(7, 2)}>7</Button>
				<Button className="filterButton" variant="contained" color="primary" onClick={() => this.getHistograms(30, 5)}>30</Button>
				{entries}
			</div>
		);
	}
}

export default HistogramList;
