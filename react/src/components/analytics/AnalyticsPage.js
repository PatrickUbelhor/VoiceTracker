import '../../css/analytics/AnalyticsPage.css';
import React from 'react';
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
import {
	getAnalytics,
	getUsers
} from '../../state/Effects';
import { connect } from 'react-redux';


const select = (state) => ({
	users: state.users.filter(username => !state.filters.has(username)),
	analytics: state.analytics
});


const mapDispatchToProps = (dispatch) => ({
	getUsers: () => dispatch(getUsers()),
	getAnalytics: (numDays, username) => dispatch(getAnalytics(numDays, username))
});


class ConnectedAnalyticsPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			username: '',
			numDays: 30,
			loading: false
		};
	}


	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		this.props.getAnalytics(this.state.numDays, this.state.username)
			.then(() => this.setState({ loading: false }));
	};


	handleChange = (event) => {
		let name = event.target.name;
		let value = event.target.value;

		this.setState({
			[name]: value
		});
	};


	componentDidMount() {
		this.props.getUsers();
	}


	render() {
		const users = this.props.users.map(username => <MenuItem key={username} value={username}>{username}</MenuItem>);

		return (
			<React.Fragment>
				<Card className="analytics-card" elevation={4}>
					<CardContent>
						<div className="analytics-form-div">
							<form className="analytics-form" onSubmit={this.handleSubmit}>
								<FormControl variant="outlined" margin="normal">
									<InputLabel id="analytics-username-label">Username</InputLabel>
									<Select name="username"
									        value={this.state.username}
									        labelId="analytics-username-label"
									        label="Username"
									        onChange={this.handleChange}
									>{users}
									</Select>
								</FormControl>
								<TextField name="numDays"
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
				<StatsComponentSelector username={this.state.username} stats={this.props.analytics}/>
			</React.Fragment>
		);
	}
}

const AnalyticsPage = connect(select, mapDispatchToProps)(ConnectedAnalyticsPage);
export default AnalyticsPage;
