import {
	Box,
	Button,
	InputAdornment,
	makeStyles,
	TextField
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addItem } from '../../redux/actions/actions';
import { getSelectors } from '../../selectors';

const useStyle = makeStyles(theme => ({
	container: {
		backgroundColor: theme.palette.background.main,
		color: '#e8e8e8',
		boxShadow: theme.shadows[8],
		minWidth: '50%',
		borderRadius: '1em',
		padding: '1em',
		textAlign: 'center'
	},
	header: {
		margin: '1em auto'
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'stretch',
		justifyContent: 'center',
		zIndex: theme.zIndex.drawer + 2,
		'& .MuiTextField-root': {
			margin: theme.spacing(1)
		}
	},
	input: {
		'& .MuiFormLabel-root': {
			color: theme.palette.getContrastText(theme.palette.background.main),
			fontSize: '1.25em'
		},
		'& .MuiFormLabel-root.Mui-focused': {
			color: theme.palette.primary.main
		},
		'& .MuiInputBase-input': {
			fontSize: '1.5em',
			color: theme.palette.getContrastText(theme.palette.background.main)
		}
	},
	inputAdornment: {
		fontSize: '1.5em',
		color: theme.palette.getContrastText(theme.palette.background.main),
		'& .MuiTypography-colorTextSecondary': {
			color: '#ffffff'
		}
	},
	submitBtn: {
		margin: '1em auto',
		fontSize: '1.25em',
		backgroundColor: theme.palette.primary.main
	}
}));

const AddItem = ({ toggleModal }) => {
	const dispatch = useDispatch();
	const user_id = getSelectors().user.userData.id;
	const [newItem, setNewItem] = useState({
		name: '',
		location: '',
		price: 0,
		description: '',
		user_id
	});

	const handleChange = e => {
		setNewItem({ ...newItem, [e.target.name]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		addItem({ ...newItem, price: newItem.price * 100 }, dispatch).then(
			res => {
				toggleModal();
				setNewItem({
					name: '',
					location: '',
					price: 0,
					description: '',
					user_id
				});
			}
		);
	};

	const classes = useStyle();
	return (
		<Box
			className={classes.container}
			onClick={e => {
				e.stopPropagation();
			}}
		>
			<h2 className={classes.header}>Add Item</h2>
			<form className={classes.form} onSubmit={handleSubmit}>
				<TextField
					className={classes.input}
					label="Name"
					name="name"
					value={newItem.name}
					onChange={handleChange}
				/>
				<TextField
					className={classes.input}
					label="Location"
					name="location"
					value={newItem.location}
					onChange={handleChange}
				/>
				<TextField
					className={classes.input}
					label="Price"
					name="price"
					type="number"
					value={newItem.price}
					onChange={handleChange}
					InputProps={{
						startAdornment: (
							<InputAdornment
								className={classes.inputAdornment}
								position="start"
							>
								$
							</InputAdornment>
						)
					}}
				/>
				<TextField
					className={classes.input}
					label="Description"
					name="description"
					value={newItem.description}
					onChange={handleChange}
				/>
				<Button
					type="submit"
					className={classes.submitBtn}
					variant="contained"
				>
					Submit
				</Button>
			</form>
		</Box>
	);
};

export default AddItem;
