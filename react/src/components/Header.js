import '../css/Header.css';
import React from 'react';
import { useHistory } from 'react-router-dom';
import {
	AppBar,
	Button,
	Icon,
	IconButton,
	Toolbar,
	Tooltip,
	Typography
} from '@material-ui/core';

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
				<Tooltip title="Toggle light/dark mode">
					<IconButton className="lightModeButton" onClick={invertTheme}>
						<Icon color="inherit" >cloud</Icon>
					</IconButton>
				</Tooltip>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
