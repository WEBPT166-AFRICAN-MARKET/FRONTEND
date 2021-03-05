import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

import { register } from '../../redux/actions/actions';

const RegisterView = props => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [formState, setFormState] = useState({
		username: '',
		password: '',
		passwordConfirm: '',
		terms: ''
	});
	const [formValid, setFormValid] = useState(false);

	const [errors, setErrors] = useState({
		username: '',
		password: '',
		passwordConfirm: '',
		terms: ''
	});

	const inputChange = e => {
		e.persist();
		const newFormData = {
			...formState,
			[e.target.name]:
				e.target.type === 'checkbox' ? e.target.checked : e.target.value
		};
		validateChange(e);
		setFormState(newFormData);
	};

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
				console.log(error, 'Something is wrong');

				setErrors({
					...errors,
					[e.target.name]: error.errors[0]
				});
			});
	};

	const submitForm = async e => {
		e.preventDefault();
		if (formValid) {
			console.log('hit');
			const { username, password } = formState;
			await register({ username, password }, dispatch).then(res => {
				if (res) {
					history.replace('/');
				}
			});
			console.log('Form has been Submitted!');
		}
	};

	const formSchema = yup.object().shape({
		username: yup.string().required('Please pick a username'),
		password: yup.string().min(8).max(20),
		passwordConfirm: yup.string().when('password', {
			is: val => val && val.length > 0,
			then: yup
				.string()
				.oneOf([yup.ref('password')], 'Password must be the same')
				.required()
		}),
		terms: yup
			.boolean()
			.oneOf([true], 'Please agree to Terms and Conditions to continue')
	});

	useEffect(() => {
		formSchema.isValid(formState).then(isValid => {
			setFormValid(isValid);
		});
	}, [formState, formSchema]);

	if (props.loading) {
		console.log('loading');
		return <span className="loading">Please Standby...</span>;
	}

	return (
		<form onSubmit={submitForm} className="registration">
			<h1>New Seller Registration!</h1>
			<h2>
				Welcome! Please fill out the following information to continue.
			</h2>

			<input
				id="username"
				type="text"
				name="username"
				value={formState.userName}
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

			{errors.password.length > 0 ? (
				<p className="error">{errors.password}</p>
			) : null}

			<input
				id="passwordConfirm"
				type="password"
				name="passwordConfirm"
				value={formState.passwordConfirm}
				placeholder="Please Confirm Password"
				onChange={inputChange}
				data-cy="passwordConfirm"
			/>

			{errors.passwordConfirm.length > 0 ? (
				<p className="error">{errors.passwordConfirm}</p>
			) : null}

			<label htmlFor="terms" className="terms">
				<input
					id="terms"
					type="checkbox"
					name="terms"
					checked={formState.terms}
					onChange={inputChange}
					data-cy="terms"
				/>
				Terms and Conditions
				{errors.terms.length > 0 ? (
					<p className="error">{errors.terms}</p>
				) : null}
			</label>

			<button disabled={!formValid} type="submit">
				Submit
			</button>
		</form>
	);
};

export default RegisterView;
