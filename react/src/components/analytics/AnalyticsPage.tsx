import '../../css/analytics/AnalyticsPage.css';
import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import StatsComponentSelector from './StatsComponentSelector';
import {
	getAnalytics,
	getUsers
} from '../../state/Effects';
import { connect } from 'react-redux';
import { calculateEntourage } from '../../service/AnalyticsService';


const select = (state) => ({
	users: state.users.filter(username => !state.filters.has(username)),
	analytics: calculateEntourage(state.analytics.filter(data => !state.filters.has(data.target)))
});


const mapDispatchToProps = (dispatch) => ({
	getUsers: () => dispatch(getUsers()),
	getAnalytics: (numDays, username) => dispatch(getAnalytics(numDays, username))
});


class ConnectedAnalyticsPage extends React.Component<any, any> {

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
				<StatsComponentSelector stats={this.props.analytics}/>
			</React.Fragment>
		);
	}
}

const AnalyticsPage = connect(select, mapDispatchToProps)(ConnectedAnalyticsPage);
export default AnalyticsPage;
