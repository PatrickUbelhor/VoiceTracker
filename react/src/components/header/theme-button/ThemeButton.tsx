import './ThemeButton.css';
import { Menu, MenuItem } from '@mui/material';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import React, { Fragment, useCallback, useState } from 'react';
import { Themes } from '../../../model/Themes';
import { setTheme } from '../../../state/Effects';
import { useAppDispatch, useAppSelector } from '../../../state/Hooks';

export default function ThemeButton() {

	const [menuAnchor, setMenuAnchor] = useState(null);

	const dispatch = useAppDispatch();
	const theme: Themes = useAppSelector(state => state.theme);
	const updateTheme = useCallback(
		(theme: Themes) => dispatch(setTheme(theme)),
		[dispatch]
	);

	const openMenu = ({ currentTarget }) => setMenuAnchor(currentTarget);
	const closeMenu = () => setMenuAnchor(null);
	const handleThemeChange = (theme: Themes) => {
		closeMenu();
		updateTheme(theme);
	};

	return (
		<Fragment>
			<Tooltip title="Change theme">
				<IconButton
					className="theme-button"
					color="primary"
					onClick={openMenu}
					aria-label="Change theme"
					aria-controls="theme-menu"
					aria-haspopup="true"
				>
					<Icon color="inherit">cloud</Icon>
				</IconButton>
			</Tooltip>
			<Menu
				id="theme-menu"
				anchorEl={menuAnchor}
				open={Boolean(menuAnchor)}
				onClose={closeMenu}
				keepMounted
			>
				<MenuItem
					selected={theme === Themes.light}
					onClick={() => handleThemeChange(Themes.light)}
				>
					Light
				</MenuItem>
				<MenuItem
					selected={theme === Themes.dark}
					onClick={() => handleThemeChange(Themes.dark)}
				>
					Dark 1
				</MenuItem>
				<MenuItem
					selected={theme === Themes.googleDark}
					onClick={() => handleThemeChange(Themes.googleDark)}
				>
					Dark 2
				</MenuItem>
			</Menu>
		</Fragment>
	);
}
