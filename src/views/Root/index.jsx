import React from 'react';
import NavBar from '../../components/NavBar';
import { Grid, Paper, Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { motion } from 'framer-motion';

const variants = {
	header: {
		hidden: {
			opacity: 0
		},
		visable: {
			opacity: 1,
			transition: {
				delay: 0.5,
				duration: 1
			}
		}
	},
	content: {
		hidden: {
			opacity: 0
		},
		visable: {
			opacity: 1,
			transition: {
				delay: 1,
				duration: 1
			}
		}
	}
};

const Root = () => {
	const history = useHistory();

	const handleButtonNav = (e, location) => {
		e.preventDefault();
		history.push(location);
	};

	return (
		<motion.div
			layout
			className="root"
			transition={{
				when: 'beforeChildren',
				staggerChildren: 0.3
			}}
		>
			<motion.header
				initial="hidden"
				animate="visable"
				variants={variants.header}
			>
				<NavBar />
			</motion.header>
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
				<Grid item sm={6}>
					<motion.div
						initial="hidden"
						animate="visable"
						variants={variants.content}
					>
						<Paper className="paperItem">
							<h2>Shop Today</h2>
							<p>
								Sauti Africa empowers small business owners,
								particularly women, to improve their business
								and economic opportunities to grow out of
								poverty.
							</p>
							<h6>Sign up now to get started!</h6>
							<div className="buttonRack">
								<Button
									size="large"
									variant="outlined"
									color="secondary"
									onClick={e => handleButtonNav(e, '/signup')}
								>
									Login
								</Button>
								<Button
									size="large"
									variant="contained"
									color="primary"
									onClick={e => handleButtonNav(e, '/login')}
								>
									Login
								</Button>
							</div>
						</Paper>
					</motion.div>
				</Grid>
			</Grid>
		</motion.div>
	);
};

export default Root;
