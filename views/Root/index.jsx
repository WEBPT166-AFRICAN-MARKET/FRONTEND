import React from 'react';
import NavBar from '../../components/NavBar';
import { Grid, Paper } from '@material-ui/core';

const Root = () => {
	return (
		<div className="root">
			<NavBar />
			<Grid
				className="root_container"
				container
				spacing={6}
				alignItems="center"
				justify="center"
			>
				<div className="root_imageWrapper">
					<img
						src="./polygonal-1302191.svg"
						alt="african desert"
						id="desertImage"
					/>
				</div>
				<Grid item xs={7}>
					<Paper className="paperItem">
						Sauti Africa empowers small business owners,
						particularly women, to improve their business and
						economic opportunities to grow out of poverty.
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default Root;
