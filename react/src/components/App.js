import React from 'react';
import AnalyticsPage from './AnalyticsPage';
import DayList from './DayList';
import ErrorSnackbar from './ErrorSnackbar';
import Header from './Header';
import HistogramList from './HistogramList';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			message: null // Used to show error messages
		};
	}


	// Used to set the message displayed on the snackbar
	setSnackbar = (value) => {
		this.setState({
			message: value
		});
	};


	render() {
		return (
			<Router>
				<Header />

				<Switch>
					<Route path="/analytics">
						<AnalyticsPage setErrMsg={this.setSnackbar} />
					</Route>
					<Route path="/histograms">
						<HistogramList setErrMsg={this.setSnackbar} />
					</Route>
					<Route path="/">
						<DayList setErrMsg={this.setSnackbar} />
					</Route>
				</Switch>

				<ErrorSnackbar message={this.state.message} resetMessage={this.setSnackbar} />
			</Router>
		);
	}
}

export default App;
