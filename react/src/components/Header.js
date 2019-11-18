import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class Header extends React.Component {

	render() {
		return (
			<AppBar id="appBar" position="static">
				<Toolbar>
					<Typography id="home" variant="h6" color="inherit">Home</Typography>
				</Toolbar>
			</AppBar>
		)
	}

}

export default Header;
