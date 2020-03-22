import '../css/Header.css';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

function Header(props) {

	return (
		<AppBar id="appBar" position="static">
			<Toolbar>
				<Typography id="home" variant="h6" color="inherit">Voice Tracker</Typography>
				<Button className="tabButton" variant="contained" color="default" onClick={props.getDays}>
					<Link to="/">Days</Link>
				</Button>
				<Button className="tabButton" variant="contained" color="default" onClick={props.getHistograms}>
					<Link to="/histograms">Histograms</Link>
				</Button>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
