import '../css/AnalyticsPage.css';
import React from 'react';
import tracker from '../api/Tracker';
import {
	Card,
	CardContent,
	TextField,
	Button
} from '@material-ui/core';

class AnalyticsPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			username1: '',
			username2: '',
			numDays: 30,
			results: [],
			loading: false
		};
	}


	getAnalytics = async (username1, username2, numDays) => {
		console.log('Getting analytics');

		try {
			this.setState({ loading: true });
			let analyticsResponse = await tracker.get(`analytics?numDays=${numDays}&username1=${username1}&username2=${username2}`);
			this.setState({
				results: analyticsResponse.data.split('\n'),
				loading: false
			});
		} catch (error) {
			this.setState({ loading: false });
			if (error.response !== undefined) {
				console.log(error.response);
				this.props.setErrMsg('Something went wrong getting the data');
				return;
			}

			console.log('An unknown error has occurred');
			this.props.setErrMsg('Something went wrong getting the data');
		}
	};


	handleSubmit = (event) => {
		event.preventDefault()
		this.getAnalytics(this.state.username1, this.state.username2, this.state.numDays);
	};


	handleChange = (event) => {
		let name = event.target.name;
		let value = event.target.value;

		this.setState({
			[name]: value
		});
	};


	render() {
		const data = this.state.loading ? "loading" : this.state.results.map((line, i) => <div key={i}>{line}</div>);

		return (
			<Card className="analytics-card" elevation={4}>
				<CardContent>
					<div className="analytics-form-div">
						<form className="analytics-form" onSubmit={this.handleSubmit}>
							<TextField className="analytics-input"
							           name="username1"
							           placeholder="Username1"
							           label="Username1"
							           variant="outlined"
							           margin="dense"
							           onChange={this.handleChange}
							/>
							<TextField className="analytics-input"
							           name="username2"
							           placeholder="Username2"
							           label="Username2"
							           variant="outlined"
							           margin="dense"
							           onChange={this.handleChange}
							/>
							<TextField className="analytics-input"
							           name="numDays"
							           placeholder="Number of Days"
							           label="Number of Days"
							           variant="outlined"
							           margin="dense"
							           onChange={this.handleChange}
							/>
							<Button className="analytics-submit-button" color="primary" type="submit" variant="contained">Submit</Button>
						</form>
					</div>
					<div className="analytics-data">{data}</div>
				</CardContent>
			</Card>
		);
	}
}

export default AnalyticsPage;
