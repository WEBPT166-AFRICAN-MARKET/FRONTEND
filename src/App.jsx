import React from 'react';
import { Container } from '@material-ui/core';
import { Route } from 'react-router';
import { getSelectors } from './selectors';

// View Components
import Root from './views/Root';
import UserHome from './views/UserHome';
import LoginView from './views/Login';

const App = () => {
	const { isAuthenticated } = getSelectors().user;
	return (
		<div className="app">
			<Container maxWidth="lg">
				<Route exact path="/">
					{isAuthenticated ? <UserHome /> : <Root /> }
					<LoginView />
				</Route>
			</Container>
		</div>
	);
};

export default App;
