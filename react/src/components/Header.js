import '../css/Header.css';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';

function Header(props) {

	let history = useHistory();

	function gotoDays() {
		history.push('/');
	}

	function gotoHistograms() {
		history.push('/histograms');
	}

	function gotoAnalytics() {
		history.push('/analytics');
	}

	function invertTheme() {
		const body = document.body;

		if (body.classList.replace('light', 'dark')) {
			return;
		}

		body.classList.replace('dark', 'light');
	}

	return (
		<AppBar id="appBar" position="sticky">
			<Toolbar>
				<Typography id="home" variant="h5" color="inherit">Voice Tracker</Typography>
				<Button className="tabButton" variant="contained" color="default" onClick={gotoDays}>
					Days
				</Button>
				<Button className="tabButton" variant="contained" color="default" onClick={gotoHistograms}>
					Histograms
				</Button>
				<Button className="tabButton" variant="contained" color="default" onClick={gotoAnalytics}>
					Analytics
				</Button>
				<Icon id="lightModeIcon" color="inherit" onClick={invertTheme}>cloud</Icon>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
