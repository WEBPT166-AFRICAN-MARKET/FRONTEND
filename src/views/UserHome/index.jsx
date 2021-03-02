import React from 'react';
import { motion } from 'framer-motion';
import { Box, Grid, Tabs, Tab } from '@material-ui/core';

import { getSelectors } from '../../selectors';
import Panel from './Panel';

const UserHome = () => {
	const { username } = getSelectors().user.userData;

	return (
		<motion.div className="userHomePage">
			<Grid
				id="userHomePanel"
				container
				direction="row"
				justify="stretch"
				alignItems="stretch"
			>
				<Box mx={'auto'} borderBottom={1} p={1} width="100%">
					<Grid item>
						<Grid
							container
							alignItems="center"
							justify="space-between"
							spacing={1}
						>
							<h1>Hello {username}</h1>
							<Tabs>
								<Tab label="store" />
								<Tab label="My Store" />
								<Tab label="My Profile" />
							</Tabs>
						</Grid>
					</Grid>
				</Box>
				<Box
					className="userHomeGridItem"
					bgcolor="background.lighter"
					p={1}
				>
					<Panel />
				</Box>
			</Grid>
		</motion.div>
	);
};

export default UserHome;
