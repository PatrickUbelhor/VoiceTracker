import '../css/Header.css';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function Header(props) {

	return (
		<AppBar id="appBar" position="static">
			<Toolbar>
				<Typography id="home" variant="h6" color="inherit">Voice Tracker</Typography>
				<Button color="secondary">Days</Button>
				<Button color="secondary">Histograms</Button>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
