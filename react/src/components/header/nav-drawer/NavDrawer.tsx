import './NavDrawer.css';
import { Drawer, Icon, IconButton } from '@mui/material';
import React, { Fragment, ReactNode, useState } from 'react';
import { NavLink } from 'react-router';

interface IProps {
	title: ReactNode;
}

export default function NavDrawer(props: IProps) {

	const [isOpen, setIsOpen] = useState(false);
	const openDrawer = () => setIsOpen(true);
	const closeDrawer = () => setIsOpen(false);
	const getDrawerNavLinkClasses = ({ isActive }) => 'drawer-nav-link' + (isActive ? 'drawer-nav-link-active' : '');

	return (
		<Fragment>
			<IconButton
				className="menu-button"
				onClick={openDrawer}
			>
				<Icon color="inherit">menu</Icon>
			</IconButton>
			<Drawer
				className="drawer"
				anchor="left"
				open={isOpen}
				onClose={closeDrawer}
			>
				<div className="drawer-content">
					<div className="drawer-header">
						{props.title}
						<div>v{ import.meta.env.VITE_APP_VERSION }</div>
					</div>
					<div className="drawer-divider" />
					<ul className="drawer-nav">
						<NavLink
							end
							to="/"
							className={getDrawerNavLinkClasses}
							onClick={closeDrawer}
						>
							<div className="drawer-nav-link-text">Days</div>
						</NavLink>
						<NavLink
							to="/histograms"
							className={getDrawerNavLinkClasses}
							onClick={closeDrawer}
						>
							<div className="drawer-nav-link-text">Histograms</div>
						</NavLink>
						<NavLink
							to="/analytics"
							className={getDrawerNavLinkClasses}
							onClick={closeDrawer}
						>
							<div className="drawer-nav-link-text">Analytics</div>
						</NavLink>
					</ul>
				</div>
			</Drawer>
		</Fragment>
	);
}
