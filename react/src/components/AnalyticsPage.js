import '../css/AnalyticsPage.css';
import React from 'react';
import tracker from '../api/Tracker';
import {
	Button,
	Card,
	CardContent,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField
} from '@material-ui/core';

class AnalyticsPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			users: [],
			username1: '',
			username2: '',
			numDays: 30,
			results: [],
			loading: false
		};
	}


	getUsers = async () => {
		console.log("Getting users");

		try {
			let usersResponse = await tracker.getUsers();
			const users = usersResponse.data;
			console.log(users)
			this.setState({
				users: users
			});
		} catch (error) {
			if (error.response !== undefined) {
				console.log(error.response);
				this.props.setErrMsg('Something went wrong getting the list of users');
				return;
			}

			console.log('An unknown error has occurred');
			this.props.setErrMsg('Something went wrong getting the list of users');
		}
	}


	getAnalytics = async (username1, username2, numDays) => {
		console.log('Getting analytics');

		try {
			this.setState({ loading: true });
			let analyticsResponse = await tracker.getAnalytics(numDays, username1, username2);
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


	componentDidMount() {
		this.getUsers();
	}


	render() {
		const users = this.state.users.map(username => <MenuItem value={username}>{username}</MenuItem>);
		const data = this.state.loading ? "loading" : this.state.results.map((line, i) => <div key={i}>{line}</div>);

		return (
			<Card className="analytics-card" elevation={4}>
				<CardContent>
					<div className="analytics-form-div">
						<form className="analytics-form" onSubmit={this.handleSubmit}>
							<FormControl variant="outlined" margin="normal">
								<InputLabel id="analytics-username1-label">Username1</InputLabel>
								<Select className="analytics-user-select"
								        name="username1"
								        value={this.state.username1}
								        labelId="analytics-username1-label"
								        label="Username1"
								        onChange={this.handleChange}
								>
									{users}
								</Select>
							</FormControl>
							<FormControl variant="outlined" margin="normal">
								<InputLabel id="analytics-username2-label">Username2</InputLabel>
								<Select className="analytics-user-select"
								        name="username2"
								        value={this.state.username2}
								        labelId="analytics-username2-label"
								        label="Username2"
								        onChange={this.handleChange}
								>
									{users}
								</Select>
							</FormControl>
							<TextField className="analytics-input"
							           name="numDays"
							           value={this.state.numDays}
							           placeholder="Number of Days"
							           label="Number of Days"
							           variant="outlined"
							           type="number"
							           margin="normal"
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
