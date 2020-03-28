import '../css/Header.css';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {useHistory} from 'react-router-dom';

function Header(props) {

	let history = useHistory();

	function gotoDays() {
		props.getDays();
		history.push("/");
	}

	function gotoHistograms() {
		history.push("/histograms");
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
			</Toolbar>
		</AppBar>
	);
}

export default Header;
