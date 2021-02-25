import React from 'react';
import { ThemeProvider } from '@material-ui/core';

const theme = {
	background: '#000000'
};

const Theme = ({ children }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
