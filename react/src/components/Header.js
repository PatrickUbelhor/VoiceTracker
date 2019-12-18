import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function Header(props) {

	return (
		<AppBar id="appBar" position="static">
			<Toolbar>
				<Typography id="home" variant="h6" color="inherit">Voice Tracker</Typography>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
