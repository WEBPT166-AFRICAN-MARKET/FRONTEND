import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './scss/style.scss';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

let customTheme = createMuiTheme({
	palette: {
		background: '#2f2f30',
		primary: {
			main: '#d69e59'
		},
		secondary: {
			main: '#99905f'
		},
		contrastThreshold: 3,
		tonalOffset: 0.2
	},
	typography: {
		fontFamily: [
			'Roboto',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(','),
		fontSize: 10
	}
});

customTheme = responsiveFontSizes(customTheme);

ReactDOM.render(
	<ThemeProvider theme={customTheme}>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</ThemeProvider>,
	document.getElementById('root')
);
