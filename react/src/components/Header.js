import '../css/Header.css';
import React from 'react';
import {
	NavLink,
} from 'react-router-dom';
import {
	AppBar,
	Icon,
	IconButton,
	Toolbar,
	Tooltip,
	Typography
} from '@material-ui/core';


function invertTheme() {
	const body = document.body;

	if (body.classList.replace('light', 'dark')) {
		return;
	}

	body.classList.replace('dark', 'light');
}


function Header(props) {
	return (
		<AppBar id="appBar" position="sticky">
			<Toolbar>
				<Typography id="home" variant="h5" color="inherit">Voice Tracker</Typography>
				<ul className="header-nav">
					<li className="header-nav-item">
						<NavLink exact to="/" className="header-nav-link" activeClassName="header-nav-link-active">
							<span className="header-nav-link-text">DAYS</span>
						</NavLink>
					</li>
					<li className="header-nav-item">
						<NavLink to="/histograms" className="header-nav-link" activeClassName="header-nav-link-active">
							<span className="header-nav-link-text">HISTOGRAMS</span>
						</NavLink>
					</li>
					<li className="header-nav-item">
						<NavLink to="/analytics" className="header-nav-link" activeClassName="header-nav-link-active">
							<span className="header-nav-link-text">ANALYTICS</span>
						</NavLink>
					</li>
				</ul>

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
