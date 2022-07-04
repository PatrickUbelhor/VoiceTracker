import './Header.css';
import React, { useCallback, useState } from 'react';
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
import { Themes } from '../../model/Themes';
import { setTheme } from '../../state/Effects';
import { useAppDispatch, useAppSelector } from '../../state/Hooks';
import FiltersModal from './FiltersModal';


const title = <Typography id="home" variant="h5" color="inherit">Voice Tracker</Typography>;

function Header() {

	const theme: string = useAppSelector<string>(state => state.theme);
	const dispatch = useAppDispatch();
	const updateTheme = useCallback(
		(theme: Themes) => dispatch(setTheme(theme)),
		[dispatch]
	);

	const [open, setOpen] = useState(false);
	const [filtersOpen, setFiltersOpen] = useState(false);
	const invertTheme = () => updateTheme(theme === Themes.light ? Themes.dark : Themes.light);
	const toggleDrawer = (isOpen: boolean) => () => setOpen(isOpen);


	const themeButton = (
		<Tooltip title="Toggle light/dark mode">
			<IconButton className="light-mode-button" onClick={invertTheme}>
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

export default Header;
