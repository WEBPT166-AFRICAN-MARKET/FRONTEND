import React from 'react';
import { Route } from 'react-router';

// View Components
import Root from './views/Root';

const App = () => {
	return (
		<div>
			<Route exact path="/" component={Root} />
		</div>
	);
};

export default App;
