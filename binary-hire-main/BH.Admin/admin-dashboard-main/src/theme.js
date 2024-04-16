import { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

// color desing tokens

export const tokens = (mode) => ({
	...(mode === 'dark'
		? {
				grey: {
					100: '#fefefe',
					200: '#fcfcfc',
					300: '#fbfbfb',
					400: '#f9f9f9',
					500: '#f8f8f8',
					600: '#c6c6c6',
					700: '#959595',
					800: '#636363',
					900: '#323232',
				},
				primary: {
					100: '#ccd4db',
					200: '#99aab7',
					300: '#677f92',
					400: '#34556e',
					500: '#012a4a',
					600: '#01223b',
					700: '#01192c',
					800: '#00111e',
					900: '#012a60',
				},
				turquoise: {
					100: '#d9fbf6',
					200: '#b3f7ee',
					300: '#8df2e5',
					400: '#67eedd',
					500: '#41ead4',
					600: '#34bbaa',
					700: '#278c7f',
					800: '#1a5e55',
					900: '#0d2f2a',
				},
				pink: {
					100: '#ffd2e2',
					200: '#ffa6c5',
					300: '#ff79a8',
					400: '#ff4d8b',
					500: '#ff206e',
					600: '#cc1a58',
					700: '#991342',
					800: '#660d2c',
					900: '#330616',
				},
				lemon: {
					100: '#feffd0',
					200: '#fdffa0',
					300: '#fdff71',
					400: '#fcff41',
					500: '#fbff12',
					600: '#c9cc0e',
					700: '#97990b',
					800: '#646607',
					900: '#323304',
				},
		  }
		: {
				grey: {
					900: '#fefefe',
					800: '#fcfcfc',
					700: '#fbfbfb',
					600: '#f9f9f9',
					500: '#f8f8f8',
					400: '#c6c6c6',
					300: '#959595',
					200: '#636363',
					100: '#323232',
				},
				primary: {
					900: '#ccd4db',
					800: '#99aab7',
					700: '#677f92',
					600: '#34556e',
					500: '#012a4a',
					400: '#01223b',
					300: '#01192c',
					200: '#00111e',
					100: '#012a60',
				},
				turquoise: {
					900: '#d9fbf6',
					800: '#b3f7ee',
					700: '#8df2e5',
					600: '#67eedd',
					500: '#41ead4',
					400: '#34bbaa',
					300: '#278c7f',
					200: '#1a5e55',
					100: '#0d2f2a',
				},
				pink: {
					900: '#ffd2e2',
					800: '#ffa6c5',
					700: '#ff79a8',
					600: '#ff4d8b',
					500: '#ff206e',
					400: '#cc1a58',
					300: '#991342',
					200: '#660d2c',
					100: '#666fff',
				},
				lemon: {
					900: '#feffd0',
					800: '#fdffa0',
					700: '#fdff71',
					600: '#fcff41',
					500: '#fbff12',
					400: '#c9cc0e',
					300: '#97990b',
					200: '#646607',
					100: '#323304',
				},
		  }),
});

// mui theme settings
export const themeSettings = (mode) => {
	const colors = tokens(mode);

	return {
		palette: {
			mode: mode,
			...(mode === 'dark'
				? {
						primary: {
							main: colors.primary[500],
						},
						secondary: {
							main: colors.turquoise[500],
						},
						neutral: {
							dark: colors.grey[700],
							main: colors.grey[500],
							light: colors.grey[100],
						},
						background: {
							default: colors.primary[500],
						},
				  }
				: {
						primary: {
							main: colors.primary[500],
						},
						secondary: {
							main: colors.turquoise[500],
						},
						neutral: {
							dark: colors.grey[700],
							main: colors.grey[500],
							light: colors.grey[100],
						},
						background: {
							default: '#fcfcfc',
						},
				  }),
		},
		typography: {
			fontFamily: ['Nunito', 'sans-serif'].join(','),
			fontSize: 12,
			h1: {
				fontFamily: ['Nunito', 'sans-serif'].join(','),
				fontSize: 40,
			},
			h2: {
				fontFamily: ['Nunito', 'sans-serif'].join(','),
				fontSize: 32,
			},
			h3: {
				fontFamily: ['Nunito', 'sans-serif'].join(','),
				fontSize: 24,
			},
			h4: {
				fontFamily: ['Nunito', 'sans-serif'].join(','),
				fontSize: 20,
			},
			h5: {
				fontFamily: ['Nunito', 'sans-serif'].join(','),
				fontSize: 16,
			},
			h6: {
				fontFamily: ['Nunito', 'sans-serif'].join(','),
				fontSize: 14,
			},
		},
	};
};

export const ColorModeContext = createContext({
	toggleColorMode: () => {},
});

export const useMode = () => {
	const [mode, setMode] = useState('dark');

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () =>
				setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
		}),
		[],
	);

	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

	return [theme, colorMode];
};
