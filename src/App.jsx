import React from 'react';
import { Container } from '@material-ui/core';
import { Route } from 'react-router';

// Selectors
import { getSelectors } from './selectors';

// View Components
import Root from './views/Root';
import UserHome from './views/UserHome';
import Register from './views/Register';

const App = () => {
	const { isAuthenticated } = getSelectors().user;

	return (
		<div className="app">
			<Container maxWidth="lg">
				<Route exact path="/signup" component={Register} />
				<Route exact path="/">
					{isAuthenticated ? <UserHome /> : <Root />}
				</Route>
			</Container>
		</div>
	);
};

export default App;
