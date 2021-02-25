import React from 'react';
import { Container } from '@material-ui/core';
import { Route } from 'react-router';
import { selectors } from './selectors';

// View Components
import Root from './views/Root';
import UserHome from './views/UserHome';

const App = () => {
	return (
		<div className="app">
			<Container maxWidth="lg">
				<Route exact path="/" component={Root}>
					{selectors.user.isAuthenticated ? <Root /> : <UserHome />}
				</Route>
			</Container>
		</div>
	);
};

export default App;
