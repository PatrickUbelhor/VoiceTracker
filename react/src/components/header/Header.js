import './Header.css';
import React from 'react';
import {
	NavLink
} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { setTheme } from '../../state/Effects';
import { connect } from 'react-redux';
import FiltersModal from './FiltersModal';


const select = (state) => ({
	theme: state.theme
});


const mapDispatchToProps = (dispatch) => ({
	setTheme: (theme) => dispatch(setTheme(theme))
});


const title = <Typography id="home" variant="h5" color="inherit">Voice Tracker</Typography>;

function ConnectedHeader(props) {

	const [open, setOpen] = React.useState();
	const [filtersOpen, setFiltersOpen] = React.useState(false);
	const invertTheme = () => props.setTheme(props.theme === 'light' ? 'dark' : 'light');
	const toggleDrawer = (isOpen) => () => setOpen(isOpen);


	const themeButton = (
		<Tooltip title="Toggle light/dark mode">
			<IconButton className="lightModeButton" onClick={invertTheme}>
				<Icon color="inherit">cloud</Icon>
			</IconButton>
		</Tooltip>
	);


	const filterButton = (
		<Tooltip title="Filters">
			<IconButton className="header-filter-button" onClick={() => setFiltersOpen(true)}>
				<Icon color="inherit">filter_list</Icon>
			</IconButton>
		</Tooltip>
	);


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
			{filterButton}
			{themeButton}
		</>
	);

	const mobile = (
		<>
			<IconButton className="menu-button" onClick={toggleDrawer(true)}>
				<Icon color="inherit">menu</Icon>
			</IconButton>
			{title}
			{filterButton}
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
			<FiltersModal open={filtersOpen} onClose={() => setFiltersOpen(false)}/>
			{isDesktop ? null : drawer}
		</>
	);
}

const Header = connect(select, mapDispatchToProps)(ConnectedHeader);
export default Header;
