import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { login } from '../../redux/actions/actions';

import './Login.css';
import { useDispatch } from 'react-redux';

const LoginView = props => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [formState, setFormState] = useState({
		username: '',
		password: ''
	});

	const [formValid, setFormValid] = useState(true);

	const [errors, setErrors] = useState({
		username: '',
		password: ''
	});

	const validateChange = e => {
		yup.reach(formSchema, e.target.name)
			.validate(
				e.target.name === 'terms' ? e.target.checked : e.target.value
			)
			.then(valid => {
				setErrors({
					...errors,
					[e.target.name]: ''
				});
			})
			.catch(error => {
				console.log(error);

				setErrors({
					...errors,
					[e.target.name]: error.errors[0]
				});
			});
	};

	const submitForm = e => {
		e.preventDefault();
		console.log('Form has ben submitted!');
		const { username, password } = formState;
		login({ username, password }, dispatch).then(res => {
			if (res) history.replace('/');
		});
	};

	useEffect(() => {
		if (props.username) {
			history.push('/home');
		}
	}, [props.username]);

	const inputChange = e => {
		e.persist();
		console.log('Input has been changed!', e.target.value);
		const newFormData = {
			...formState,
			[e.target.name]:
				e.target.type === 'checkbox' ? e.target.checked : e.target.value
		};

		validateChange(e);
		setFormState(newFormData);
	};

	const formSchema = yup.object().shape({
		username: yup.string().required('Username must be included.'),
		password: yup.string().required('Password must be included.')
	});

	useEffect(() => {
		formSchema.isValid(formState).then(isValid => {
			setFormValid(isValid);
		});
	}, [formState, formSchema]);

	if (props.loading) {
		return <span className="loading">Loading...</span>;
	}

	return (
		<form onSubmit={submitForm} className= "registration">
			<h1>Welcome Back!</h1>
			<h2>You must log in to continue.</h2>

			<input
				id="username"
				type="text"
				name="username"
				value={formState.username}
				placeholder="Username"
				onChange={inputChange}
				data-cy="username"
			/>
			{errors.username.length > 0 ? (
				<p className="error">{errors.username}</p>
			) : null}
			<input
				id="password"
				type="password"
				name="password"
				value={formState.password}
				placeholder="Password"
				onChange={inputChange}
				data-cy="password"
			/>

			<button disabled={!formValid} type="submit">
				Sign In
			</button>
		</form>
	);
};

export default LoginView;
