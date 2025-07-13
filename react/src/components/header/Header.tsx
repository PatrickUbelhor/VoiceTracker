import './Header.css';
import React, { Fragment, useState } from 'react';
import { NavLink } from 'react-router';
import AppBar from '@mui/material/AppBar';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import FiltersModal from './FiltersModal';
import NavDrawer from './nav-drawer/NavDrawer';
import ThemeButton from './theme-button/ThemeButton';


const title = <Typography id="home" variant="h5" color="inherit">Voice Tracker</Typography>;

export default function Header() {

	const [filtersOpen, setFiltersOpen] = useState(false);
	const isDesktop = useMediaQuery('(min-width: 720px)');
	console.log(`Is large screen: ${isDesktop}`);

	const filterButton = (
		<Tooltip title="Filters">
			<IconButton className="header-filter-button" onClick={() => setFiltersOpen(true)}>
				<Icon color="inherit">filter_list</Icon>
			</IconButton>
		</Tooltip>
	);

	const getDesktopNavLinkClasses = ({ isActive }) => 'header-nav-link' + (isActive ? ' header-nav-link-active' : '');
	const desktop = (
		<Fragment>
			{title}
			<ul className="header-nav">
				<li className="header-nav-item">
					<NavLink end to="/" className={getDesktopNavLinkClasses}>
						<span className="header-nav-link-text">DAYS</span>
					</NavLink>
				</li>
				<li className="header-nav-item">
					<NavLink to="/histograms" className={getDesktopNavLinkClasses}>
						<span className="header-nav-link-text">HISTOGRAMS</span>
					</NavLink>
				</li>
				<li className="header-nav-item">
					<NavLink to="/analytics" className={getDesktopNavLinkClasses}>
						<span className="header-nav-link-text">ANALYTICS</span>
					</NavLink>
				</li>
			</ul>
			{filterButton}
			<ThemeButton />
		</Fragment>
	);

	const mobile = (
		<Fragment>
			<NavDrawer title={title} />
			{title}
			{filterButton}
			<ThemeButton />
		</Fragment>
	);


	return (
		<Fragment>
			<AppBar id="appBar" position="sticky">
				<Toolbar>
					{isDesktop ? desktop : mobile}
				</Toolbar>
			</AppBar>
			<FiltersModal open={filtersOpen} onClose={() => setFiltersOpen(false)}/>
		</Fragment>
	);
}
