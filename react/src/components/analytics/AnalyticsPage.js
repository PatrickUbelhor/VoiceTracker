import '../../css/analytics/AnalyticsPage.css';
import React from 'react';
import tracker from '../../api/Tracker';
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
import StatsComponentSelector from './StatsComponentSelector';


class AnalyticsPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			users: [],
			username: '',
			numDays: 30,
			results: [],
			loading: false
		};
	}


	getUsers = async () => {
		console.log('Getting users');

		try {
			let usersResponse = await tracker.getUsers();
			const users = usersResponse.data;
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
	};


	getAnalytics = async (numDays, username) => {
		console.log('Getting analytics');

		try {
			this.setState({ loading: true });
			let analyticsResponse = await tracker.getAnalytics(numDays, username);
			let results = analyticsResponse.data.sort((a, b) => a.target.localeCompare(b.target));
			this.setState({
				results: results,
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
		event.preventDefault();
		this.getAnalytics(this.state.numDays, this.state.username);
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
		const users = this.state.users.map(username => <MenuItem key={username} value={username}>{username}</MenuItem>);

		return (
			<React.Fragment>
				<Card className="analytics-card" elevation={4}>
					<CardContent>
						<div className="analytics-form-div">
							<form className="analytics-form" onSubmit={this.handleSubmit}>
								<FormControl variant="outlined" margin="normal">
									<InputLabel id="analytics-username-label">Username</InputLabel>
									<Select className="analytics-user-select"
									        name="username"
									        value={this.state.username}
									        labelId="analytics-username-label"
									        label="Username"
									        onChange={this.handleChange}
									>{users}
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
								<Button className="analytics-submit-button"
								        color="primary"
								        type="submit"
								        variant="contained"
								>Submit
								</Button>
							</form>
						</div>
					</CardContent>
				</Card>
				{this.state.loading ? <div>Loading</div> : null}
				<StatsComponentSelector username={this.state.username} stats={this.state.results}/>
			</React.Fragment>
		);
	}
}

export default AnalyticsPage;
