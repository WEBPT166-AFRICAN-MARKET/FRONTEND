import { Box, GridList, GridListTile, makeStyles } from '@material-ui/core';
import React from 'react';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles(theme => ({
	gridList: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		backgroundColor: 'inherit',
		margin: '0 auto',
		width: '90vw',
		height: '70vh',
		overflow: 'scroll'
	}
}));

const Panel = ({ store }) => {
	return <>{store.length > 0 ? <Store store={store} /> : <EmptyStore />}</>;
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

const Store = ({ store }) => {
	const classes = useStyles();
	return (
		<GridList cellHeight={160} cols={3} className={classes.gridList}>
			{store.map((item, i) => (
				<ItemCard item={item} key={`storeItem-${i + 1}`} />
			))}
		</GridList>
	);
};

const ItemCard = ({ item }) => {
	return (
		<Box p={4} bgcolor="#555" m={1} width="200px">
			<GridListTile cols={1}>
				<p>{item.name}</p>
				<p>{item.location}</p>
				<p>{item.description}</p>
				<NumberFormat
					value={item.price / 100}
					displayType="text"
					thousandSeparator={true}
					prefix={'$'}
					decimalScale={2}
					fixedDecimalScale={true}
					renderText={value => <p>{value}</p>}
				/>
			</GridListTile>
		</Box>
	);
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
