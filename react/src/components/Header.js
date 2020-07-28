import '../css/Header.css';
import React from 'react';
import {
	NavLink
} from 'react-router-dom';
import {
	AppBar,
	Drawer,
	Icon,
	IconButton,
	Toolbar,
	Tooltip,
	Typography,
	useMediaQuery
} from '@material-ui/core';


function invertTheme() {
	const body = document.body;

	if (body.classList.replace('light', 'dark')) {
		return;
	}

	body.classList.replace('dark', 'light');
}


const title = <Typography id="home" variant="h5" color="inherit">Voice Tracker</Typography>;
const themeButton = (
	<Tooltip title="Toggle light/dark mode">
		<IconButton className="lightModeButton" onClick={invertTheme}>
			<Icon color="inherit">cloud</Icon>
		</IconButton>
	</Tooltip>
);


function Header(props) {

	const [open, setOpen] = React.useState();
	const toggleDrawer = (isOpen) => () => {
		setOpen(isOpen);
	}

	const desktop = (
		<>
			{title}
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
			{themeButton}
		</>
	);

	const mobile = (
		<>
			<IconButton className="menu-button" onClick={toggleDrawer(true)}>
				<Icon color="inherit">menu</Icon>
			</IconButton>
			{title}
			{themeButton}
		</>
	);

	const drawer = (
		<Drawer className="drawer" anchor="left" open={open} onClose={toggleDrawer(false)}>
			<div className="drawer-content">
				<div className="drawer-header">
					{title}
					<div>v{process.env.REACT_APP_VERSION}</div>
				</div>
				<div className="drawer-divider" />
				<ul className="drawer-nav">
					<NavLink exact to="/" className="drawer-nav-link" activeClassName="drawer-nav-link-active" onClick={toggleDrawer(false)}>
						<div className="drawer-nav-link-text">Days</div>
					</NavLink>
					<NavLink to="/histograms" className="drawer-nav-link" activeClassName="drawer-nav-link-active" onClick={toggleDrawer(false)}>
						<div className="drawer-nav-link-text">Histograms</div>
					</NavLink>
					<NavLink to="/analytics" className="drawer-nav-link" activeClassName="drawer-nav-link-active" onClick={toggleDrawer(false)}>
						<div className="drawer-nav-link-text">Analytics</div>
					</NavLink>
				</ul>
			</div>
		</Drawer>
	);

	const isDesktop = useMediaQuery('(min-width: 720px)');
	console.log(`Is large screen: ${isDesktop}`);

	return (
		<>
			<AppBar id="appBar" position="sticky">
				<Toolbar>
					{isDesktop ? desktop : mobile}
				</Toolbar>
			</AppBar>
			{isDesktop ? null : drawer}
		</>
	);
}

export default Header;
