import './NavDrawer.css';
import { Drawer, Icon, IconButton } from '@mui/material';
import React, { ElementRef, Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface IProps {
	title: ElementRef<any>;
}

export default function NavDrawer(props: IProps) {

	const [isOpen, setIsOpen] = useState(false);
	const openDrawer = () => setIsOpen(true);
	const closeDrawer = () => setIsOpen(false);

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
						<div>v{process.env.REACT_APP_VERSION}</div>
					</div>
					<div className="drawer-divider" />
					<ul className="drawer-nav">
						<NavLink
							exact
							to="/"
							className="drawer-nav-link"
							activeClassName="drawer-nav-link-active"
							onClick={closeDrawer}
						>
							<div className="drawer-nav-link-text">Days</div>
						</NavLink>
						<NavLink
							to="/histograms"
							className="drawer-nav-link"
							activeClassName="drawer-nav-link-active"
							onClick={closeDrawer}
						>
							<div className="drawer-nav-link-text">Histograms</div>
						</NavLink>
						<NavLink
							to="/analytics"
							className="drawer-nav-link"
							activeClassName="drawer-nav-link-active"
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
