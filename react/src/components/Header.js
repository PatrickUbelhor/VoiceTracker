import '../css/Header.css';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function Header(props) {

	function onDaysButtonClick(event) {
		props.onClick(0);
	}

	function onHistogramButtonClick(event) {
		props.onClick(1);
	}

	return (
		<AppBar id="appBar" position="static">
			<Toolbar>
				<Typography id="home" variant="h6" color="inherit">Voice Tracker</Typography>
				<Button className="tabButton" variant="contained" color="default" onClick={onDaysButtonClick}>Days</Button>
				<Button className="tabButton" variant="contained" color="default" onClick={onHistogramButtonClick}>Histograms</Button>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
