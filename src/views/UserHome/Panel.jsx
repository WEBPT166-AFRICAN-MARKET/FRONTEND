import { Box } from '@material-ui/core';
import React from 'react';

const Panel = ({ store }) => {
	return <>{store.length > 0 ? <h1>Panel</h1> : <EmptyStore />}</>;
};

const EmptyStore = () => (
	<Box
		display="flex"
		justifyContent="center"
		alignItems="center"
		flexDirection="column"
	>
		<img src="./empty.svg" alt="Empty Store" />
		<p>No Items Here</p>
	</Box>
);

export default Panel;
