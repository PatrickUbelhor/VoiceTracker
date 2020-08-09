import '../css/App.css';
import React from 'react';
import AnalyticsPage from './analytics/AnalyticsPage';
import DayList from './DayList';
import ErrorSnackbar from './ErrorSnackbar';
import Header from './Header';
import HistogramList from './HistogramList';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core';
import { indigo, pink } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/core/styles';


const lightTheme = createMuiTheme({
	palette: {
		primary: {
			main: indigo['500'],
			dark: '#303F9F'
		},
		secondary: {
			main: pink['300']
		}
	}
});

const googleDarkTheme = createMuiTheme({
	palette: {
		type: 'dark'
	}
});

const discordTheme = createMuiTheme({
	palette: {
		type: 'dark',
		background: {
			default: '#2C2F33',
			paper: '#393D41'
		}
	},
	overrides: {
		MuiToolbar: {
			root: {
				backgroundColor: '#23272A'
			}
		}
	}
});


class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			message: null, // Used to show error messages
			theme: 'dark',
			muiTheme: discordTheme
		};
	}


	// Used to set the message displayed on the snackbar
	setSnackbar = (value) => {
		this.setState({
			message: value
		});
	};


	invertTheme = () => {
		const from = this.state.theme;
		const to = this.state.theme === 'light' ? 'dark' : 'light';
		const toTheme = (this.state.theme === 'light') ? discordTheme : lightTheme;

		this.setState({
			theme: to,
			muiTheme: toTheme
		});
		document.body.classList.replace(from, to);
		localStorage.setItem('theme', to);
	}


	componentDidMount() {
		const theme = localStorage.getItem('theme');

		if (theme) {
			this.setState({
				theme: theme,
				muiTheme: (theme === 'light') ? lightTheme : discordTheme
			});
		}
	}


	render() {
		console.log("Rerender");
		return (
			<ThemeProvider theme={this.state.muiTheme}>
				<div className="wrapper">
					<Router>
						<Header invertTheme={this.invertTheme} />

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
				</div>
				<div className="footer">
					<div className="copyright">© Patrick Ubelhor 2020</div>
					<div className="version">v{process.env.REACT_APP_VERSION}</div>
				</div>
			</ThemeProvider>
		);
	}
}

export default App;
