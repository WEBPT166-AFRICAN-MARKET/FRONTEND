import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
	Box,
	Grid,
	Tabs,
	Tab,
	makeStyles,
	Fab,
	Typography,
	Backdrop,
	TextField,
	Button
} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getSelectors } from '../../selectors';
import Panel from './Panel';
import { fetchItems } from '../../redux/actions/actions';
import AddItem from './AddItem';

const useStyles = makeStyles(theme => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1
	},
	fab: {
		position: 'absolute',
		bottom: theme.spacing(8),
		right: theme.spacing(8)
	}
}));

const UserHome = () => {
	const classes = useStyles();
	const { username, id } = getSelectors().user.userData;
	const dispatch = useDispatch();
	const store = getSelectors().items.items.data;

	const [addItemModalState, setAddItemModalState] = useState(false);
	const [tabState, setTabState] = useState(0);

	const toggleModal = () => {
		setAddItemModalState(!addItemModalState);
	};

	const handleChange = (event, newValue) => {
		event.preventDefault();
		setTabState(newValue);
	};

	React.useEffect(() => {
		fetchItems(dispatch);
	}, []);

	return (
		<>
			<motion.div className="userHomePage">
				<Grid id="userHomePanel" container direction="row">
					<Box mx={'auto'} borderBottom={1} p={1} width="100%">
						<Grid item>
							<Grid
								container
								alignItems="center"
								justify="space-between"
								spacing={1}
							>
								<h1>Hello {username}</h1>
								<Tabs value={tabState} onChange={handleChange}>
									<Tab label="store" {...a11yProps(0)} />
									<Tab label="My Store" {...a11yProps(1)} />
									<Tab label="My Profile" {...a11yProps(2)} />
								</Tabs>
							</Grid>
						</Grid>
					</Box>
					<Box
						className="userHomeGridItem"
						bgcolor="background.lighter"
						p={1}
					>
						<TabPanel value={tabState} index={0}>
							<Panel store={store} />
						</TabPanel>
						<TabPanel value={tabState} index={1}>
							<Panel
								store={store.filter(
									item => item.user_id === id
								)}
							/>
						</TabPanel>
						<TabPanel value={tabState} index={2}>
							<h2>Username: {username}</h2>
						</TabPanel>
						<Fab
							aria-label="Add Item"
							className={classes.fab}
							color="primary"
							variant="extended"
							onClick={toggleModal}
						>
							Add Item
						</Fab>
					</Box>
				</Grid>
			</motion.div>
			<Backdrop
				className={classes.backdrop}
				open={addItemModalState}
				onClick={toggleModal}
			>
				<AddItem toggleModal={() => toggleModal()} />
			</Backdrop>
		</>
	);
};

export default UserHome;

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	};
}

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`action-tabpanel-${index}`}
			aria-labelledby={`action-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</Typography>
	);
}
