import './HistogramList.css';
import React from 'react';
import Button from '@mui/material/Button';
import { HistogramResponse } from '../../model/Responses';
import { AppState } from '../../model/States';
import Histogram from './Histogram';
import LoadingPage from '../LoadingPage';
import { getHistograms } from '../../state/Effects';
import { connect } from 'react-redux';


const select = (state: AppState) => ({
	histograms: state.histograms.items
		.filter(histogram => !state.filters.has(histogram.name))
		.sort((a, b) => a.name.localeCompare(b.name)),
	numDays: state.histograms.numDays,
	minActiveDays: state.histograms.minActiveDays
});


const mapDispatchToProps = (dispatch) => ({
	getHistograms: (numDays, minActiveDays) => dispatch(getHistograms(numDays, minActiveDays))
});


// TODO: put getHistograms() params in URL. Use value of params from router instead of state.
class ConnectedHistogramList extends React.Component<any, any> {

	componentDidMount() {
		this.props.getHistograms(this.props.numDays, this.props.minActiveDays);
	}


	render() {
		if (this.props.histograms == null) {
			return <LoadingPage/>;
		}

		const entries = this.props.histograms.map((histogram: HistogramResponse) => (
			<React.Fragment key={histogram.name}>
				<Histogram name={histogram.name} numDays={this.props.numDays} data={histogram.data}/>
			</React.Fragment>
		));

		return (
			<div className="HistogramList">
				<Button
					className="filterButton"
					variant="contained"
					color="primary"
					onClick={() => this.props.getHistograms(7, 2)}
				>7</Button>
				<Button
					className="filterButton"
					variant="contained"
					color="primary"
					onClick={() => this.props.getHistograms(30, 5)}
				>30</Button>
				{entries}
			</div>
		);
	}
}

const HistogramList = connect(select, mapDispatchToProps)(ConnectedHistogramList);
export default HistogramList;
