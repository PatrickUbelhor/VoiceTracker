import { createTheme } from '@mui/material';
import {
	indigo,
	pink
} from '@mui/material/colors';

export enum Themes {
	light = 'light',
	dark = 'dark',
	googleDark = 'google_dark'
}

export const lightTheme = createTheme({
	palette: {
		primary: {
			main: indigo['500'],
			dark: '#303F9F'
		},
		secondary: {
			main: pink['300']
		}
	}
});

export const googleDarkTheme = createTheme({
	palette: {
		mode: 'dark'
	}
});

export const discordTheme = createTheme({
	palette: {
		mode: 'dark',
		background: {
			default: '#2C2F33',
			paper: '#393D41'
		}
	}
});

const THEME_MAP = {
	[Themes.light]: lightTheme,
	[Themes.dark]: discordTheme,
	[Themes.googleDark]: googleDarkTheme
};

export function getMuiTheme(theme) {
	return THEME_MAP[theme];
}
