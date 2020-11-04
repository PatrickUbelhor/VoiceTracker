import { createMuiTheme } from '@material-ui/core';
import {
	indigo,
	pink
} from '@material-ui/core/colors';


const THEME_MAP = {
	light: lightTheme,
	dark: discordTheme,
	google_dark: googleDarkTheme
};


export function getMuiTheme(theme) {
	return THEME_MAP[theme];
}


export const lightTheme = createMuiTheme({
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


export const googleDarkTheme = createMuiTheme({
	palette: {
		type: 'dark'
	}
});


export const discordTheme = createMuiTheme({
	palette: {
		type: 'dark',
		background: {
			default: '#2C2F33',
			paper: '#393D41'
		}
	},
	overrides: {
		MuiToolbar: {
			root: {
				backgroundColor: '#23272A'
			}
		}
	}
});
