import React from 'react';
import { Container } from '@material-ui/core';
import { Route } from 'react-router';

// View Components
import Root from './views/Root';

const App = () => {
	return (
		<div className="app">
			<Container maxWidth="lg">
				<Route exact path="/" component={Root} />
			</Container>
		</div>
	);
};

export default App;
