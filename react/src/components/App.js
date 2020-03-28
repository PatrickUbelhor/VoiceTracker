import React from 'react';
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
			days: null,
			histograms: null,
			message: null // Used to show error messages
		};
	}


	// Used to set the message displayed on the snackbar
	setSnackbar = (value) => {
		this.setState((state, props) => {
			return {
				message: value
			}
		})
	};


	render() {
		return (
			<Router>
				<Header />

				<Switch>
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
